<?php

use App\Http\Controllers\CronJobController;
use App\Http\Controllers\CronJobHistoryController;
use App\Http\Controllers\DashboardController;

use Illuminate\Support\Facades\Route;

Route::redirect("/", "/dashboard");



// Main Routes


Route::middleware(["auth", "verified"])->group(function () {
    Route::get("/dashboard", DashboardController::class)->name("dashboard");
    // Cron Job Routes
    Route::resource("/cron-jobs", CronJobController::class)->except(["show"]);
    Route::post("/cron-jobs-copy/{id}", [CronJobController::class, "copy"])->name("cron-jobs.copy");
    Route::post("/cron-jobs-copybyselection", [CronJobController::class, "copyBySelection"])->name("cron-jobs.bulk.copy");
    Route::delete("/cron-job/deletebyselection", [CronJobController::class, "deleteBySelection"])->name("cron-jobs.deletebyselection");
    Route::patch("/cron-job/disablebyselection", [CronJobController::class, "disableBySelection"])->name("cron-jobs.disablebyselection");
    Route::patch("/cron-job/enablebyselection", [CronJobController::class, "enableBySelection"])->name("cron-jobs.enablebyselection");



    // Cron Job History Routes
    Route::get("/cron-jobs-history/{id}", CronJobHistoryController::class)->name("cron-job-history.index");
});


require __DIR__ . '/auth.php';
