<?php

namespace App\Http\Controllers;

use App\Models\CronJob;
use App\Models\CronJobHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {

        $total_jobs = CronJob::prefferedJobs()->count();

        $success_jobs = CronJobHistory::prefferedJobsHistory()->where("status", "success")->count();
        $failed_jobs = CronJobHistory::prefferedJobsHistory()->where("status", "failed")->count();

        return Inertia::render("Dashboard/Dashboard", compact("success_jobs", "failed_jobs", "total_jobs"));
    }
}
