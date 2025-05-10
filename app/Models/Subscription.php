<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    protected $fillable = [
        "user_id",
        "subscription_plan_id",
        "start_date",
        "end_date",
        "status",
        "auto_renew",
        "is_active",
    ];




    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }


    public function subscriptionPlan(): BelongsTo
    {
        return $this->belongsTo(SubscriptionPlan::class, "subscription_plan_id", "id");
    }
}
