<?php

namespace App\Http\Controllers;

use App\Models\CronJobHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CronJobHistoryController extends Controller
{
    public function __invoke(string $id)
    {

        if (empty($id)) {
            return back()->with("error", "Error Occured While Fetching Cron Job History Please Try Again Later Or Contact, Our Support Team");
        }

        $cronJobHistory = CronJobHistory::where("cron_job_id", $id)->latest()->paginate(5);

        // return $cronJobHistory;

        return Inertia::render("CronJobsHistory/index", compact("cronJobHistory"));
    }
}
