<?php

namespace App\Http\Controllers;

use App\Models\SubscriptionPlan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionPlanController extends Controller
{

    public function index()
    {
        $subscriptionPlans = SubscriptionPlan::latest()->paginate(5);

        $subscriptionPlans->getCollection()->transform(function ($subscription) {
            $subscription->added_at = $subscription->created_at->diffForHumans();
            return $subscription;
        });



        return Inertia::render("SubscriptionPlans/index", compact("subscriptionPlans"));
    }



    public function create()
    {
        return Inertia::render("SubscriptionPlans/create");
    }

    public function store(Request $request)
    {

        $validated_req = $request->validate(
            [
                'name' => 'required|string',
                'price' => 'required|numeric',
                'request_limit_per_day' => 'required|numeric',
                'premium_customer_support' => 'nullable|boolean',
                'description.*' => 'required',
                'is_active' => 'nullable|boolean',
            ],
            [
                'description.questions' => "Questions Are Required Atleast Add One Question For Subscription Plan",
                'description.answers' => "Answers Are Required Atleast Add One Answer For Subscription Plan",
            ]
        );

        if (isset($validated_req["description"]["questions"]) && isset($validated_req["description"]["answers"])) {
            foreach ($validated_req["description"]["questions"] as $key => $question) {
                $answer = $validated_req["description"]["answers"][$key] ?? null;

                if (empty($question) || empty($answer)) {
                    return back()->with("error", "Both question and answer are required in entry  Check Any Of Them You Left Empty");
                }
            }
        }



        $encoded_description = json_encode($validated_req["description"]);
        $validated_req["description"] = $encoded_description;






        if (SubscriptionPlan::create($validated_req)) {
            return redirect()->route("subscription-plans.index")->with("success", "Subscription Plan Created Successfully");
        } else {
            return back()->with("error", "Something went wrong While Creating Subscription Plan");
        }
    }


    public function edit(string $id)
    {
        if (empty($id)) {
            return redirect()->route("subscription-plans.index")->with("error", "Something went wrong While Finding Subscription Plan");
        }


        $subscriptionPlan = SubscriptionPlan::find($id);
        if (empty($subscriptionPlan)) {
            return redirect()->route("subscription-plans.index")->with("error", "Something went wrong While Finding Subscription Plan");
        }
        return Inertia::render("SubscriptionPlans/edit", compact("subscriptionPlan"));
    }


    public function update(Request $request, string $id)
    {
        $validated_req = $request->validate(
            [
                'name' => 'required|string',
                'price' => 'required|numeric',
                'request_limit_per_day' => 'required|numeric',
                'premium_customer_support' => 'nullable|boolean',
                'description.*' => 'required',
                'is_active' => 'nullable|boolean',
            ],
            [
                'description.questions' => "Questions Are Required Atleast Add One Question For Subscription Plan",
                'description.answers' => "Answers Are Required Atleast Add One Answer For Subscription Plan",
            ]
        );

        if (isset($validated_req["description"]["questions"]) && isset($validated_req["description"]["answers"])) {
            foreach ($validated_req["description"]["questions"] as $key => $question) {
                $answer = $validated_req["description"]["answers"][$key] ?? null;

                if (empty($question) || empty($answer)) {
                    return back()->with("error", "Both question and answer are required in entry  Check Any Of Them You Left Empty");
                }
            }
        }



        $encoded_description = json_encode($validated_req["description"]);
        $validated_req["description"] = $encoded_description;

        if (SubscriptionPlan::find($id)->update($validated_req)) {
            return back()->with("success", "Subscription Plan Updated Successfully");
        } else {
            return back()->with("error", "Something went wrong While Updating Subscription Plan");
        }
    }


    public function destroy(string $id)
    {
        if (empty($id)) {
            return redirect()->route("subscription-plans.index")->with("error", "Something went wrong While Finding Subscription Plan");
        }


        $subscriptionPlan = SubscriptionPlan::find($id);
        if (empty($subscriptionPlan)) {
            return redirect()->route("subscription-plans.index")->with("error", "Something went wrong While Finding Subscription Plan");
        }

        if ($subscriptionPlan->delete()) {
            return back()->with("success", "Subscription Plan Deleted Successfully");
        } else {
            return back()->with("error", "Something went wrong While Deleting Subscription Plan");
        }
    }

    public function deleteBySelection(Request $request)
    {
        $subscription_plan_ids = $request->array("subscription_plan_ids");

        if (count($subscription_plan_ids) > 0 && !empty($subscription_plan_ids)) {
            SubscriptionPlan::whereIn("id", $subscription_plan_ids)->delete();
            return redirect()->route("subscription-plans.index")->with("success", "Selected Subscription Plans Deleted Successfully");
        } else {
            return redirect()->route("subscription-plans.index")->with("error", "Something went wrong While Deleting Subscription Plans");
        }
    }

    public function disableBySelection(Request $request)
    {
        $data = $request->array("data");
        $subscription_plan_ids = $data["subscription_plan_ids"];


        if (count($subscription_plan_ids) > 0 && !empty($subscription_plan_ids)) {
            SubscriptionPlan::whereIn("id", $subscription_plan_ids)->update(["is_active" => false]);
            return redirect()->route("subscription-plans.index")->with("success", "Selected Subscription Plans Disabled Successfully");
        } else {
            return back()->with("error", "Something went wrong While Disabling Subscription Plans");
        }
    }

    public function enableBySelection(Request $request)
    {
        $data = $request->array("data");
        $subscription_plan_ids = $data["subscription_plan_ids"];


        if (count($subscription_plan_ids) > 0 && !empty($subscription_plan_ids)) {
            SubscriptionPlan::whereIn("id", $subscription_plan_ids)->update(["is_active" => true]);
            return redirect()->route("subscription-plans.index")->with("success", "Selected Subscription Plans Enabled Successfully");
        } else {
            return back()->with("error", "Something went wrong While Enableing Subscription Plans");
        }
    }
}
