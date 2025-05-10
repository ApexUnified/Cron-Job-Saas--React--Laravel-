<?php

namespace App\Http\Controllers;

use App\Models\CronJob;
use App\Models\CronJobHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {

        $total_jobs = CronJob::prefferedJobs()
            ->count();

        $success_jobs = CronJobHistory::prefferedJobsHistory()->where("status", "success")
            ->count();
        $failed_jobs = CronJobHistory::prefferedJobsHistory()->where("status", "failed")
            ->count();
        $todays_total_requests = CronJobHistory::whereDate("created_at", Carbon::today())
            ->count();
        $todays_total_failed_requests = CronJobHistory::whereDate("created_at", Carbon::today())
            ->where("status",  "failed")
            ->count();

        $todays_total_success_requests = CronJobHistory::whereDate("created_at", Carbon::today())
            ->where("status",  "success")
            ->count();

        return Inertia::render("Dashboard/Dashboard", compact("success_jobs", "failed_jobs", "total_jobs", "todays_total_requests", "todays_total_failed_requests", "todays_total_success_requests"));
    }
}
