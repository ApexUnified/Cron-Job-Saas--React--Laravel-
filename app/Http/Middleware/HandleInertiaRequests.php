<?php

namespace App\Http\Middleware;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()  ? $request->user()->append(["user_avatar", "subscription_plan_name"]) : null,
                'notifications' => $request->user() ? $request->user()->notifications()->orderBy("created_at", "DESC")->limit(5)->get()->map(function ($notification) {
                    $notification->human_created_at = $notification->created_at->diffForHumans();
                    return $notification;
                }) : [],
                'hasRole' => $request->user()->roles()->pluck("name")->toArray(),
                'can' => $request->user()->getAllPermissions()->pluck("name")->toArray(),
            ],

            "is_quota_completed" =>  $request->user()->today_quota_complete ?
                Carbon::parse($request->user()->today_quota_complete)->isSameDay(Carbon::today()) : false
        ];
    }
}
