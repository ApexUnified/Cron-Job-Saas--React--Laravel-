<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CronJob extends Model
{
    protected $fillable = [
        "title",
        "url",
        "method",
        "execution_schedule",
        "custom_schedule",
        "user_id",
        "is_enabled",
        "is_schedule_expired",
        "schedule_expiry_date",
        "last_execution",
        "notify_when"
    ];



    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }
}
