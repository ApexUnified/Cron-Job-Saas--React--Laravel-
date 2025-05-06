<?php

namespace App\Providers;

use App\Console\Commands\AutoCheckJobScheduleExpiry;
use App\Console\Commands\CronJobScheduleRunner;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(Schedule $schedule): void
    {
        Vite::prefetch(concurrency: 3);
        Model::automaticallyEagerLoadRelationships();

        Inertia::share([
            "flash" => function () {
                return [
                    "success" => session("success"),
                    "error" => session("error")
                ];
            }
        ]);


        $schedule->command(AutoCheckJobScheduleExpiry::class)->everyMinute();
        $schedule->command(CronJobScheduleRunner::class)->everyMinute();
    }
}
