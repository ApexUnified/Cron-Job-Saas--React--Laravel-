<?php

namespace App\Console\Commands;

use App\Models\CronJob;
use App\Notifications\CronJobDisabledNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DisableCronJobAfterTooManyFails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:disable-cron-job-after-too-many-fails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This Command Will Check Continuous Fails And Disable The Cron Job';

    /**
     * Execute the console command.
     */
    public function handle()
    {

        CronJob::where("is_enabled", 1)
            ->where("is_schedule_expired", 0)
            ->whereJsonContains("notify_when", ["disable_after_too_many_failures" => true])
            ->whereHas("cronJobsHistory", function ($query) {
                $query->where("status", "failed");
            })
            ->chunk(100, function ($cronJobs) {
                $now = Carbon::now();
                foreach ($cronJobs as $cronJob) {

                    if ($cronJob->user->is_enabled == 0) {
                        continue;
                    }


                    $disabled_at = Carbon::parse($cronJob->disabled_at);

                    $user_subscription = $cronJob->user->subscription()->where("is_active", 1)->where("status", "Active")->first();

                    if (empty($user_subscription)) {
                        continue;
                    }


                    $user_subscription_plan = $user_subscription->subscriptionPlan;

                    if (
                        empty($cronJob->disabled_at) && $cronJob->cronJobsHistory
                        ->where("status", "failed")
                        ->count() >= $user_subscription_plan->max_job_failed_before_disable
                    ) {
                        $cronJob->user->notify(new CronJobDisabledNotification($cronJob));
                        $cronJob->is_enabled = false;
                        $cronJob->disabled_at = now();
                        $cronJob->save();
                    }



                    if ($disabled_at->diffInDays($now) >= 2) {

                        $failed_jobs_count = $cronJob->cronJobsHistory
                            ->where("status", "failed")
                            ->where("created_at", ">", $disabled_at)
                            ->count();



                        if ($failed_jobs_count >= 10) {
                            $cronJob->user->notify(new CronJobDisabledNotification($cronJob));
                            $cronJob->is_enabled = false;
                            $cronJob->disabled_at = now();
                            $cronJob->save();
                        }
                    }
                }
            });
    }
}
