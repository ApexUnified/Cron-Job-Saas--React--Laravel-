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
        $cronJobs = CronJob::prefferedJobs()->latest()->paginate(5);
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
                'method' => 'required|string|in:GET',
                'is_require_auth' => 'nullable|boolean',
                'auth_email' => 'nullable|email',
                'auth_password' => 'nullable|string',
                'schedule_execution' => 'required|array',
                'user_id' => 'required|exists:users,id',
                'is_enabled' => 'nullable|boolean',
                'schedule_expiry_date' => 'nullable|date',
                'notify_when' => 'nullable|array',
            ],
            [
                'title.string' => 'Title Must be String',
                'title.max' => 'Title Must be less than 200 characters',


                'url.required' => 'URL is Required',
                'url.url' => 'URL Must be a Valid URL Ex: https://example.com',

                'method.required' => 'Method is Required',
                'method.in' => 'Method Must be GET',


                'is_require_auth.boolean' => '(Is Authentication Required) Must be Boolean',
                'auth_email.email' => 'Email Must be Valid Email',
                'auth_password.string' => 'Password Must be String',


                'execution_schedule.required' => 'Execution Schedule is Required',
                'execution_schedule.array' => 'Execution Schedule Must be Array',

                'user_id.required' => 'User ID is Required',
                'user_id.exists' => 'User ID Does Not Exist',

                'is_enabled.boolean' => 'Is Enabled Must be Boolean',

                'schedule_expiry_date.date_format' => 'Schedule Expiry Date Must be a Valid Format',
            ]

        );


        if (!empty($request->schedule_expiry_date)) {
            $validated_req["schedule_expiry_date"] = date("Y-m-d H:i:s", strtotime($request->schedule_expiry_date));
        }


        if ($request->input("schedule_execution.type") == "minutes") {
            $validated_req["schedule_execution"]["value"] = $validated_req["schedule_execution"]["value"]["minutes"];
            $validated_req["schedule_execution"] = json_encode($validated_req["schedule_execution"]);
        }



        if ($request->input("schedule_execution.type") == "hours") {
            $validated_req["schedule_execution"]["value"] = $validated_req["schedule_execution"]["value"]["hours"];

            $validated_req["schedule_execution"] = json_encode($validated_req["schedule_execution"]);
        }

        if ($request->input("schedule_execution.type") == "months") {

            $validated_req["schedule_execution"]["value"] = [
                "months" => $validated_req["schedule_execution"]["value"]["months"]["months"],
                "date" => $validated_req["schedule_execution"]["value"]["months"]["date"],
                "hours" => $validated_req["schedule_execution"]["value"]["months"]["hours"],
                "minutes" => $validated_req["schedule_execution"]["value"]["months"]["minutes"],
            ];

            $validated_req["schedule_execution"] = json_encode($validated_req["schedule_execution"]);
        }



        if (!empty($request->notify_when)) {
            $validated_req["notify_when"] = json_encode($request->notify_when);
        }


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

        $cronJob = CronJob::prefferedJobs()->find($id);
        $user_id = Auth::id();

        if (empty($cronJob)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }


        return Inertia::render("CronJobs/edit", compact("cronJob", "user_id"));
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
                'method' => 'required|string|in:GET',
                'is_require_auth' => 'nullable|boolean',
                'auth_email' => 'nullable|email',
                'auth_password' => 'nullable|string',
                'schedule_execution' => 'required|array',
                'user_id' => 'required|exists:users,id',
                'is_enabled' => 'nullable|boolean',
                'schedule_expiry_date' => 'nullable|date',
                'notify_when' => 'nullable|array',
            ],
            [
                'title.string' => 'Title Must be String',
                'title.max' => 'Title Must be less than 200 characters',


                'url.required' => 'URL is Required',
                'url.url' => 'URL Must be a Valid URL Ex: https://example.com',

                'method.required' => 'Method is Required',
                'method.in' => 'Method Must be GET',


                'is_require_auth.boolean' => '(Is Authentication Required) Must be Boolean',
                'auth_email.email' => 'Email Must be Valid Email',
                'auth_password.string' => 'Password Must be String',


                'execution_schedule.required' => 'Execution Schedule is Required',
                'execution_schedule.array' => 'Execution Schedule Must be Array',

                'user_id.required' => 'User ID is Required',
                'user_id.exists' => 'User ID Does Not Exist',

                'is_enabled.boolean' => 'Is Enabled Must be Boolean',

                'schedule_expiry_date.date_format' => 'Schedule Expiry Date Must be a Valid Format',
            ]

        );


        if (!empty($request->schedule_expiry_date)) {
            $validated_req["schedule_expiry_date"] = date("Y-m-d H:i:s", strtotime($request->schedule_expiry_date));
        }


        if ($request->input("schedule_execution.type") == "minutes") {
            $validated_req["schedule_execution"]["value"] = $validated_req["schedule_execution"]["value"]["minutes"];
            $validated_req["schedule_execution"] = json_encode($validated_req["schedule_execution"]);
        }



        if ($request->input("schedule_execution.type") == "hours") {
            $validated_req["schedule_execution"]["value"] = $validated_req["schedule_execution"]["value"]["hours"];

            $validated_req["schedule_execution"] = json_encode($validated_req["schedule_execution"]);
        }

        if ($request->input("schedule_execution.type") == "months") {

            $validated_req["schedule_execution"]["value"] = [
                "months" => $validated_req["schedule_execution"]["value"]["months"]["months"],
                "date" => $validated_req["schedule_execution"]["value"]["months"]["date"],
                "hours" => $validated_req["schedule_execution"]["value"]["months"]["hours"],
                "minutes" => $validated_req["schedule_execution"]["value"]["months"]["minutes"],
            ];

            $validated_req["schedule_execution"] = json_encode($validated_req["schedule_execution"]);
        }



        if (!empty($request->notify_when)) {
            $validated_req["notify_when"] = json_encode($request->notify_when);
        }


        $cronJob = CronJob::prefferedJobs()->find($id);

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


        $cronJob = CronJob::prefferedJobs()->find($id);

        if (empty($cronJob)) {
            return back()->with("error", "Error Occured While Fetching Cron Job Please Try Again Later Or Contact, Our Support Team");
        }

        if ($cronJob->delete()) {
            return redirect()->route("cron-jobs.index")->with("success", "Cron Job Deleted Successfully");
        } else {
            return back()->with("error", "Error Occured While Deleting Cron Job Please Try Again Later Or Contact, Our Support Team");
        }
    }


    public function deleteBySelection(Request $request)
    {

        if (is_array($request->array("cron_job_ids")) && count($request->array("cron_job_ids")) > 0) {

            if (
                CronJob::prefferedJobs()->whereIn("id", $request->array("cron_job_ids"))->delete()
            ) {
                return redirect()->route("cron-jobs.index")->with("success", "Selected Cron Jobs Deleted Successfully");
            } else {
                return back()->with("error", "Error Occured While Deleting Selected Cron Jobs Please Try Again Later Or Contact, Our Support Team");
            }
        }
    }


    public function disableBySelection(Request $request)
    {
        $cron_job_ids = $request?->data["cron_job_ids"] ?? null;

        if (!empty($cron_job_ids)) {
            foreach ($cron_job_ids as $key => $value) {
                CronJob::prefferedJobs()->where("id", $value)->update(["is_enabled" => false]);
            }
            return redirect()->route("cron-jobs.index")->with("success", "Selected Cron Jobs Disabled Successfully");
        } else {
            return back()->with("error", "Error Occured While Disabling Selected Cron Jobs Please Try Again Later Or Contact, Our Support Team");
        }
    }

    public function enableBySelection(Request $request)
    {
        $cron_job_ids = $request?->data["cron_job_ids"] ?? null;

        if (!empty($cron_job_ids)) {
            foreach ($cron_job_ids as $key => $value) {
                $cronjobs = CronJob::prefferedJobs()->where("id", $value)->get();
                foreach ($cronjobs as $cronjob) {
                    $cronjob->is_enabled = true;

                    if ($cronjob->is_schedule_expired == true) {
                        $cronjob->is_schedule_expired = false;
                        $cronjob->schedule_expiry_date = null;
                    }

                    $cronjob->save();
                }
            }
            return redirect()->route("cron-jobs.index")->with("success", "Selected Cron Jobs Enabled Successfully");
        } else {
            return back()->with("error", "Error Occured While Enabling Selected Cron Jobs Please Try Again Later Or Contact, Our Support Team");
        }
    }
}
