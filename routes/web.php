<?php

use App\Http\Controllers\CronJobController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect("/", "/dashboard");
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


// Main Routes


Route::middleware(["auth", "verified"])->group(function () {

    // Cron Job Routes
    Route::resource("/cron-jobs", CronJobController::class);
    Route::delete("cron-job/deletebyselection", [CronJobController::class, "deleteBySelection"])->name("cron-jobs.deletebyselection");
    Route::patch("cron-job/disablebyselection", [CronJobController::class, "disableBySelection"])->name("cron-jobs.disablebyselection");
    Route::patch("cron-job/enablebyselection", [CronJobController::class, "enableBySelection"])->name("cron-jobs.enablebyselection");
});


require __DIR__ . '/auth.php';
