<?php

namespace App\Console\Commands;

use App\Models\CronJob;
use App\Models\CronJobHistory;
use App\Notifications\InvalidDomainForCronJob;
use App\Notifications\NotifyFailedCronJobExecution;
use App\Notifications\RequestsQuotaCompleted;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;


class CronJobScheduleRunner extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:cron-job-schedule-runner';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This Command Will Execute CronJobs And Hit Requests To The Given Endpoint On Cronjob';

    /**
     * Execute the console command.
     */
    public function handle()
    {



        $cronJobsHistory = [];
        CronJob::where("is_enabled", 1)
            ->where("is_schedule_expired", 0)
            ->chunk(100, function ($jobs) {

                foreach ($jobs as $index => $job) {

                    if ($job->user->is_enabled == 0) {
                        continue;
                    }

                    if (!empty($job->user?->today_quota_complete)) {
                        $today_quota = Carbon::parse($job->user->today_quota_complete);


                        if ($today_quota->isSameDay(Carbon::today())) {
                            continue;
                        }


                        $job->user->update(['today_quota_complete' => null]);
                    }

                    $start = microtime(true);

                    $user_subscription = $job->user->subscription()->where("is_active", 1)->where("status", "Active")->first();

                    if (empty($user_subscription)) {
                        continue;
                    }


                    $user_subscription_plan = $user_subscription->subscriptionPlan;


                    $todays_total_requests = CronJobHistory::where("cron_job_id", $job->id)->whereDate("created_at", Carbon::today())->count();


                    if ($todays_total_requests >= $user_subscription_plan->request_limit_per_day) {
                        $job->user->update(["today_quota_complete" => now()]);
                        $job->user->notify(new RequestsQuotaCompleted($job));
                        continue;
                    }



                    $response =  $this->checkCronJobSchedule($job);

                    if ($response) {
                        $end = microtime(true);

                        $execution_duration = round($end - $start, 2);

                        $cronJobsHistory[] = [
                            "cron_job_id" => $job->id,
                            "status" => $response->successful() ? "success" : "failed",
                            "status_code" => $response->status(),
                            "response_body" => json_encode($response->json()),
                            "error_message" => $response->failed() ? "Unexpected response or error" : null,
                            "is_successful" => $response->successful(),
                            "execution_duration" => $execution_duration,
                            "created_at" => Carbon::now(),
                            "updated_at" => Carbon::now()
                        ];


                        if ($response->failed()) {
                            $notify_when = json_decode($job->notify_when, true);

                            if ($notify_when["execution_failed"] == true) {
                                $job->user->notify(new NotifyFailedCronJobExecution($job));
                            }
                        }

                        $job->update(["last_execution" => Carbon::now()]);
                    }
                }


                if (!empty($cronJobsHistory) && count($cronJobsHistory) > 0) {
                    CronJobHistory::insert($cronJobsHistory);
                } else {
                    // info("No Cron Jobs To Run");
                }
            });
    }


    private function checkCronJobSchedule($job)
    {


        $schedule_execution = json_decode($job->schedule_execution, true);
        $now = Carbon::now();

        if ($schedule_execution["type"] === "minutes") {

            $schedule_span_minutes = (int) $schedule_execution["value"];
            $parsed_schedule = null;

            if (empty($job->last_execution)) {
                $parsed_schedule = Carbon::parse($job->created_at)->addMinutes($schedule_span_minutes, true);
            } else {
                $parsed_schedule = Carbon::parse($job->last_execution)->addMinutes($schedule_span_minutes, true);
            }


            if (!empty($parsed_schedule) && $parsed_schedule->lte($now)) {
                $response = $this->makeRequestToEndPoint($job);
                return $response;
            }
        }


        if ($schedule_execution["type"] === "hours") {
            $schedule_span_hours = (int) $schedule_execution["value"];
            $parsed_schedule = null;

            if (!empty($job->last_execution)) {
                $parsed_schedule = Carbon::parse($job->last_execution)->addHours($schedule_span_hours, true);
            } else {
                $parsed_schedule = Carbon::parse($job->created_at)->addHours($schedule_span_hours, true);
            }

            if (!empty($parsed_schedule) && $parsed_schedule->lte($now)) {
                $response = $this->makeRequestToEndPoint($job);
                return $response;
            }
        }


        if ($schedule_execution["type"] === "months") {
            $parsed_values = $schedule_execution["value"];
            $new_parsed_span = null;

            $months = (int) $parsed_values["months"];
            $date = (int) $parsed_values["date"];
            $hours = (int) $parsed_values["hours"];
            $minutes =  (int) $parsed_values["minutes"];


            $baseDate = !empty($job->last_execution)
                ? Carbon::parse($job->last_execution)
                : Carbon::parse($job->created_at);

            $nextDate = $baseDate->copy()->addMonths($months);
            $nextDate->day = min($date, $nextDate->daysInMonth);
            $nextDate->hour = $hours;
            $nextDate->minute = $minutes;
            $nextDate->second = 0;

            if ($nextDate->lte($now)) {
                $response = $this->makeRequestToEndPoint($job);
                return $response;
            }
        }


        return;
    }


    private function makeRequestToEndPoint($job)
    {

        $domain = parse_url($job->url, PHP_URL_HOST);
        if (!checkdnsrr($domain, 'A') && !checkdnsrr($domain, 'AAAA') && !checkdnsrr($domain, 'CNAME')) {
            $job->user->notify(new InvalidDomainForCronJob($job));
            $job->update(["is_enabled" => false]);
            return;
        }


        if (!$job->is_require_auth) {
            $response = Http::get($job->url);
            return $response;
        }

        $loginResponse = Http::post($job->auth_api_login_endpoint, [
            'email' => $job->auth_email,
            'password' => $job->auth_password,
        ]);


        if ($loginResponse->successful()) {
            $token = $loginResponse->json()["token"];
            $job->update(["api_token" => $token]);
            $response = Http::withToken($token)->get($job->url);
            return $response;
        }


        return $loginResponse;
    }
}
