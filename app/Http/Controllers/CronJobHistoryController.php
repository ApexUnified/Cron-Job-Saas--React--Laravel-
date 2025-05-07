<?php

namespace App\Http\Controllers;

use App\Models\CronJob;
use App\Models\CronJobHistory;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CronJobHistoryController extends Controller
{
    public function __invoke(string $id)
    {

        if (empty($id)) {
            return back()->with("error", "Error Occured While Fetching Cron Job History Please Try Again Later Or Contact, Our Support Team");
        }

        $cronJobHistory = CronJobHistory::where("cron_job_id", $id)
            ->prefferedJobsHistory()
            ->with('cronJob')
            ->latest()
            ->paginate(5);

        if ($cronJobHistory->isEmpty()) {
            return redirect()->route("cron-jobs.index")->with("error", "No Cron Job History Found");
        }

        $cronJobHistory->getCollection()->transform(function ($history) {
            $history->executed_at = Carbon::parse($history->created_at)->diffForHumans();
            return $history;
        });



        $cron_success_cron_jobs_count = CronJobHistory::where("cron_job_id", $id)->prefferedJobsHistory()
            ->where("status", "success")
            ->count();

        $cron_failed_cron_jobs_count = CronJobHistory::where("cron_job_id", $id)->prefferedJobsHistory()
            ->where("status", "failed")
            ->count();


        return Inertia::render("CronJobsHistory/index", compact("cronJobHistory", "cron_success_cron_jobs_count", "cron_failed_cron_jobs_count"));
    }
}
