<?php

namespace App\Http\Controllers;

use App\Models\CronJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CronJobController extends Controller
{

    public function index()
    {
        $cronJobs = CronJob::latest()->paginate(10);
        return Inertia::render("CronJobs/index", compact("cronJobs"));
    }

    public function create()
    {
        $user_id = Auth::id();
        return Inertia::render("CronJobs/create", compact("user_id"));
    }

    public function store(Request $request)
    {
        $validated_req = $request->validate(
            [
                'title' => 'nullable|string|max:200',
                'url' => 'required|url',
                'method' => 'required|string|in:GET,POST,PUT,DELETE',
                'execution_schedule' => 'required|array',
                'custom_schedule' => 'nullable|array',
                'user_id' => 'required|exists:users,id',
                'is_enabled' => 'nullable|boolean',
                'schedule_expiry_date' => 'nullable|date_format:d-M-Y H:i',
                'notify_when' => 'nullable|array',
            ],
            [
                'title.string' => 'Title Must be String',
                'title.max' => 'Title Must be less than 200 characters',


                'url.required' => 'URL is Required',
                'url.url' => 'URL Must be a Valid URL Ex: https://example.com',

                'method.required' => 'Method is Required',
                'method.in' => 'Method Must be GET,POST,PUT,DELETE',

                'execution_schedule.required' => 'Execution Schedule is Required',
                'execution_schedule.array' => 'Execution Schedule Must be Array',

                'custom_schedule.array' => 'Custom Schedule Should Be a Valid Custom Schedule Pattren That is Given',

                'user_id.required' => 'User ID is Required',
                'user_id.exists' => 'User ID Does Not Exist',

                'is_enabled.boolean' => 'Is Enabled Must be Boolean',

                'schedule_expiry_date.date_format' => 'Schedule Expiry Date Must be in d-M-Y H:i Format',

                'notify_when.array' => 'Notify When Values Should Be Correct As Given In Form',
            ]

        );

        if (CronJob::create($validated_req)) {
            return redirect()->route("cron-jobs.index")->with("success", "Cron Job Created Successfully");
        } else {
            return back()->with("error", "Error Occured While Creating Cron Job Please Try Again Later Or Contact, Our Support Team");
        }
    }

    public function show(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }
    }


    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }

        $cronJob = CronJob::find($id);

        if (empty($cronJob)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }


        return Inertia::render("CronJobs/Edit", compact("cronJob"));
    }


    public function update(Request $request, string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }


        $validated_req = $request->validate(
            [
                'title' => 'nullable|string|max:200',
                'url' => 'required|url',
                'method' => 'required|string|in:GET,POST,PUT,DELETE',
                'execution_schedule' => 'required|array',
                'custom_schedule' => 'nullable|array',
                'user_id' => 'required|exists:users,id',
                'is_enabled' => 'nullable|boolean',
                'schedule_expiry_date' => 'nullable|date_format:d-M-Y H:i',
                'notify_when' => 'nullable|array',
            ],
            [
                'title.string' => 'Title Must be String',
                'title.max' => 'Title Must be less than 200 characters',


                'url.required' => 'URL is Required',
                'url.url' => 'URL Must be a Valid URL Ex: https://example.com',

                'method.required' => 'Method is Required',
                'method.in' => 'Method Must be GET,POST,PUT,DELETE',

                'execution_schedule.required' => 'Execution Schedule is Required',
                'execution_schedule.array' => 'Execution Schedule Must be Array',

                'custom_schedule.array' => 'Custom Schedule Should Be a Valid Custom Schedule Pattren That is Given',

                'user_id.required' => 'User ID is Required',
                'user_id.exists' => 'User ID Does Not Exist',

                'is_enabled.boolean' => 'Is Enabled Must be Boolean',

                'schedule_expiry_date.date_format' => 'Schedule Expiry Date Must be in d-M-Y H:i Format',

                'notify_when.array' => 'Notify When Values Should Be Correct As Given In Form',
            ]

        );

        $cronJob = CronJob::find($id);

        if (empty($cronJob)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }



        if ($cronJob->update($validated_req)) {
            return redirect()->route("cron-jobs.index")->with("success", "Cron Job Updated Successfully");
        } else {
            return back()->with("error", "Error Occured While Updating Cron Job Please Try Again Later Or Contact, Our Support Team");
        }
    }

    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }


        $cronJob = CronJob::find($id);

        if (empty($cronJob)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }

        if ($cronJob->delete()) {
            return redirect()->route("cron-jobs.index")->with("success", "Cron Job Deleted Successfully");
        } else {
            return back()->with("error", "Error Occured While Deleting Cron Job Please Try Again Later Or Contact, Our Support Team");
        }
    }


    public function deletebyselection(Request $request)
    {
        if (is_array($request->array("cron_job_ids")) && count($request->array("cron_job_ids")) > 0) {
            if (
                CronJob::whereIn("id", $request->array("ids"))->delete()
            ) {
                return redirect()->route("cron-jobs.index")->with("success", "Selected Cron Jobs Deleted Successfully");
            } else {
                return back()->with("error", "Error Occured While Deleting Selected Cron Jobs Please Try Again Later Or Contact, Our Support Team");
            }
        }
    }
}
