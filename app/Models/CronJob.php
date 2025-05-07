<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class CronJob extends Model
{
    protected $fillable = [
        "title",
        "url",
        "method",
        "is_require_auth",
        "auth_email",
        "auth_password",
        "auth_api_login_endpoint",
        "api_token",
        "schedule_execution",
        "user_id",
        "is_enabled",
        "disabled_at",
        "is_schedule_expired",
        "schedule_expiry_date",
        "last_execution",
        "notify_when"
    ];



    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "user_id", "id");
    }



    public function ScopeprefferedJobs($query)
    {
        return $query->where("user_id", Auth::id());
    }



    public function cronJobsHistory(): HasMany
    {
        return $this->hasMany(CronJobHistory::class, "cron_job_id", "id");
    }
}
