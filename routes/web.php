<?php

use App\Http\Controllers\CronJobController;
use App\Http\Controllers\CronJobHistoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SubscriptionPlanController;
use App\Http\Controllers\UserController;
use App\Models\SubscriptionPlan;
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



    // User Routes

    Route::resource("/users", UserController::class)->except(["show"]);
    Route::delete("/users-deletebyselection", [UserController::class, "deleteBySelection"])->name("users.deletebyselection");
    Route::put("/users-disable", [UserController::class, "disable"])->name("users.disable");
    Route::put("/users-enable", [UserController::class, "enable"])->name("users.enable");
    Route::get("/user-change-password/{id}", [UserController::class, "changePassword"])->name("users.change-password");
    Route::put("/user-change-password/{id}", [UserController::class, "updatePassword"])->name("users.update-password");




    // Subscription Plans Routes
    Route::resource("/subscription-plans", SubscriptionPlanController::class)->except(["show"]);
    Route::delete("/subscription-plans-deletebyselection", [SubscriptionPlanController::class, "deleteBySelection"])->name("subscription-plans.deletebyselection");
    Route::put("/subscription-plans-disablebyselection", [SubscriptionPlanController::class, "disableBySelection"])->name("subscription-plans.disablebyselection");
    Route::put("/subscription-plans-enablebyselection", [SubscriptionPlanController::class, "enableBySelection"])->name("subscription-plans.enablebyselection");


    // Settings Routes

    Route::prefix("/settings")->controller(SettingController::class)->group(function () {
        Route::get("/", "index")->name("settings.index");


        // SMTP Routes
        Route::get("/smtp", "smtpIndex")->name("settings.smtp.index");
        Route::post("/smtp", "smtpSave")->name("settings.smtp.save");


        // Role Permissions Routes
        Route::get("/role", "roleIndex")->name("settings.role.index");
        Route::get("/role/create", "roleCreate")->name("settings.role.create");
        Route::post("/role/create", "roleStore")->name("settings.role.store");
        Route::get("/role/{id}", "roleEdit")->name("settings.role.edit");
        Route::put("/role/{id}", "roleUpdate")->name("settings.role.update");
        Route::delete("/role/{id}", "roleDestroy")->name("settings.role.destroy");
        Route::delete("/role-deletebyselection", "roleDeleteBySelection")->name("settings.role.deletebyselection");


        Route::get("/permissions/{id}", "permissionIndex")->name("settings.permission.index");
        Route::get("/permissions-create", "permissionCreate")->name("settings.permission.create");
        Route::post("/permissions/create", "permissionStore")->name("settings.permission.store");
        Route::put("/permissions-assign/{id}", "permissionAssign")->name("settings.permission.assign");



        // Subscription Plans
        Route::get("/subscription-plans", "subscriptionPlans")->name("settings.subscription-plans");
    });
});


require __DIR__ . '/auth.php';
