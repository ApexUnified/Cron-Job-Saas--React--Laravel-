<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class CronJobHistory extends Model
{
    protected $fillable = ["execution_duration", "response_body", "status", "status_code", "cron_job_id", "error_message", "is_successful"];



    public function cronJob(): BelongsTo
    {
        return $this->belongsTo(CronJob::class, "cron_job_id", "id");
    }

    public function ScopeprefferedJobsHistory($query)
    {
        return $query->whereHas("cronJob", function ($query) {
            $query->where("user_id", Auth::id());
        });
    }
}
