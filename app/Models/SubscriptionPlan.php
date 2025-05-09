<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SubscriptionPlan extends Model
{
    protected $fillable = [

        "name",
        "price",
        "request_limit_per_day",
        "premium_customer_support",
        "description",
        "is_active",

    ];
}
