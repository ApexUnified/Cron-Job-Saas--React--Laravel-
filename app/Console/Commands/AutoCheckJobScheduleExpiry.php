<?php

namespace App\Console\Commands;

use App\Models\CronJob;
use App\Notifications\ScheduleExpiryNotification;
use Carbon\Carbon;
use Illuminate\Console\Command;


class AutoCheckJobScheduleExpiry extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:auto-check-job-schedule-expiry';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'It Will Check Job Schedule Expiry';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        CronJob::where("is_enabled", 1)
            ->where("is_schedule_expired", 0)
            ->whereNotNull("schedule_expiry_date")
            ->chunk(100, function ($jobs) {
                foreach ($jobs as $job) {
                    $tranformed_date = Carbon::parse($job->schedule_expiry_date);

                    if ($tranformed_date->lt(Carbon::now())) {
                        // info("Its In Expiry Timespan");
                        $job->update(["is_enabled" => false, "is_schedule_expired" => true]);
                        $job->user->notify(new ScheduleExpiryNotification($job));
                    } else {
                        // info("Its Not In Expiry Timespan");
                    }
                }
            });
    }
}
