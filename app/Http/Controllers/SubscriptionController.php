<?php

namespace App\Http\Controllers;

use App\Models\Subscription;
use App\Models\SubscriptionPlan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

use Inertia\Inertia;

class SubscriptionController extends Controller
{

    public function index()
    {
        $subscriptions = Subscription::latest()->with(["user", "subscriptionPlan"])->paginate(5);

        $subscriptions->getCollection()->transform(function ($subscription) {
            $subscription->start_date = Carbon::parse($subscription->start_date)->format("Y-m-d");
            $subscription->end_date =  Carbon::parse($subscription->end_date)->diffForHumans();
            return $subscription;
        });


        return Inertia::render("Subscriptions/index", compact("subscriptions"));
    }

    public function create()
    {
        $users = User::all();
        $subscriptionPlans = SubscriptionPlan::all()->filter(function ($plan) {
            return !str_contains($plan->name, 'Free');
        })->values();

        return Inertia::render("Subscriptions/create", compact("users", "subscriptionPlans"));
    }

    public function store(Request $request)
    {
        $validated_req = $request->validate(
            [
                'user_id' => 'required|exists:users,id',
                'subscription_plan_id' => 'required|exists:subscription_plans,id',
                'status' => 'required|string|in:Active,Expired',
                "auto_renew" => "required|boolean",
                "is_active" => "required|boolean",
            ],
            [
                'user_id.required' => 'User is Required',
                'user_id.exists' => 'User Should be Valid',
                'subscription_plan_id.required' => 'Subscription Plan is Required',
                'subscription_plan_id.exists' => 'Subscription Plan Should be Valid',
                'is_active.required' => 'Subscription Active Status is Required',

            ]
        );

        $start_date =  Carbon::now();
        $end_date = Carbon::now()->addMonth(1);

        $validated_req["start_date"] = $start_date;
        $validated_req["end_date"] = $end_date;

        $subscription = Subscription::updateOrCreate([
            "user_id" => $validated_req["user_id"]
        ], $validated_req);

        if (!empty($subscription)) {
            return redirect()->route("subscriptions.index")->with("success", "Subscription Created Successfully");
        } else {
            return back()->with("error", "Something went wrong While Creating Subscription");
        }
    }




    public function edit(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding Subscription");
        }


        $subscription = Subscription::with(["user", "subscriptionPlan"])->find($id);
        if (empty($subscription)) {
            return back()->with("error", "Something went wrong While Finding Subscription");
        }

        $users = User::all();
        $subscriptionPlans = SubscriptionPlan::all();

        $subscription->start_date = Carbon::parse($subscription->start_date)->format("Y-m-d");
        $subscription->end_date = Carbon::parse($subscription->end_date)->format("Y-m-d");

        return Inertia::render("Subscriptions/edit", compact("subscription", "users", "subscriptionPlans"));
    }


    public function update(Request $request, string $id)
    {

        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding Subscription");
        }

        $validated_req = $request->validate([
            'user_id' => 'required|exists:users,id',
            'subscription_plan_id' => 'required|exists:subscription_plans,id',
            'status' => 'required|string|in:Active,Expired',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            "auto_renew" => "required|boolean",
            "is_active" => "required|boolean",
        ], [
            'user_id.required' => 'User is Required',
            'user_id.exists' => 'User Should be Valid',
            'subscription_plan_id.required' => 'Subscription Plan is Required',
            'subscription_plan_id.exists' => 'Subscription Plan Should be Valid',
            'is_active.required' => 'Subscription Active Status is Required',
        ]);


        $subscription = Subscription::find($id);
        if (empty($subscription)) {
            return back()->with("error", "Something went wrong While Finding Subscription");
        }


        if ($subscription->update($validated_req)) {
            $subscription->user->update(["today_quota_complete" => null]);
            return redirect()->route("subscriptions.index")->with("success", "Subscription Updated Successfully");
        } else {
            return back()->with("error", "Something went wrong While Updating Subscription");
        }
    }


    public function destroy(string $id)
    {
        if (empty($id)) {
            return back()->with("error", "Something went wrong While Finding Subscription");
        }


        $subscription = Subscription::find($id);
        if (empty($subscription)) {
            return back()->with("error", "Something went wrong While Finding Subscription");
        }


        if ($subscription->delete()) {
            return back()->with("success", "Subscription Deleted Successfully");
        } else {
            return back()->with("error", "Something went wrong While Deleting Subscription");
        }
    }


    public function deleteBySelection(Request $request)
    {
        $subscription_ids = $request->array("subscription_ids");

        if (count($subscription_ids) > 0 && !empty($subscription_ids)) {
            if (Subscription::destroy($subscription_ids)) {
                return back()->with("success", "Selected Subscriptions Deleted Successfully");
            } else {
                return back()->with("error", "Something went wrong While Deleting Subscriptions");
            }
        } else {
            return back()->with("error", "Please select at least one subscription");
        }
    }

    public function disableBySelection(Request $request)
    {
        $data = $request->array("data");
        $subscription_ids = $data["subscription_ids"];

        if (count($subscription_ids) > 0 && !empty($subscription_ids)) {
            if (Subscription::whereIn("id", $subscription_ids)->update(["is_active" => false])) {
                return back()->with("success", "Selected Subscriptions Disabled Successfully");
            } else {
                return back()->with("error", "Something went wrong While Disabling Subscriptions");
            }
        } else {
            return back()->with("error", "Please select at least one subscription");
        }
    }


    public function enableBySelection(Request $request)
    {
        $data = $request->array("data");
        $subscription_ids = $data["subscription_ids"];

        if (count($subscription_ids) > 0 && !empty($subscription_ids)) {
            if (Subscription::whereIn("id", $subscription_ids)->update(["is_active" => true])) {
                return back()->with("success", "Selected Subscriptions Enabled Successfully");
            } else {
                return back()->with("error", "Something went wrong While Enabling Subscriptions");
            }
        } else {
            return back()->with("error", "Please select at least one subscription");
        }
    }
}
