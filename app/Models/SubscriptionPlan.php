<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SubscriptionPlan extends Model
{
    protected $fillable = [

        "name",
        "price",
        "request_limit_per_day",
        "max_cron_jobs",
        "max_job_failed_before_disable",
        "premium_customer_support",
        "description",
        "is_active",

    ];


    public function subscriptions(): HasMany
    {
        return $this->hasMany(Subscription::class, "subscription_plan_id", "id");
    }
}
