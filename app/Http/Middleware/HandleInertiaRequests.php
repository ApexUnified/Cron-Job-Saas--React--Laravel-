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
                'user' => $request->user()  ? $request->user()->append(["user_avatar", "subscription_plan"]) : null,
                'notifications' => $request->user() ? $request->user()->notifications()->orderBy("created_at", "DESC")->limit(5)->get()->map(function ($notification) {
                    $notification->human_created_at = $notification->created_at->diffForHumans();
                    return $notification;
                }) : []
            ],
        ];
    }
}
