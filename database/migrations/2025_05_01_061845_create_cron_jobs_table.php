<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cron_jobs', function (Blueprint $table) {
            $table->id();
            $table->string("title")->nullable();
            $table->string("url");
            $table->enum("method", ["GET", "POST", "PUT", "DELETE"])->default("GET");
            $table->json("execution_schedule");
            $table->json("custom_schedule")->nullable();
            $table->foreignId("user_id")->constrained("users")->cascadeOnDelete()->cascadeOnUpdate();
            $table->boolean("is_enabled")->default(true);
            $table->boolean("is_schedule_expired")->default(false);
            $table->timestamp("schedule_expiry_date")->nullable();
            $table->timestamp("last_execution")->nullable();
            $table->json("notify_when")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cron_jobs');
    }
};
