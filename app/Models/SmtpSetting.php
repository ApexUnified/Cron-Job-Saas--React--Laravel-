<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SmtpSetting extends Model
{
    protected $fillable = [
        "mailer",
        "scheme",
        'host',
        'port',
        'username',
        'password',
        'from_address',
        'from_name',
    ];
}
