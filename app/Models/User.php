<?php

namespace App\Models;


use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'is_enabled'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getUserAvatarAttribute()
    {
        $nameParts = explode(" ", $this->name);
        return collect($nameParts[0])->map(fn($part) => strtoupper(substr($part, 0, 1)))->implode('');
    }



    // Will Modify Accouring To SubscriptionPlan When Plans Will Be Added And Subscriptions Will BE Assigned To User
    public function getSubscriptionPlanAttribute()
    {
        return "Free";
    }


    public function cronJobs(): HasMany
    {
        return $this->hasMany(CronJob::class, "user_id", "id");
    }
}
