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
        Schema::create('cron_job_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId("cron_job_id")->constrained("cron_jobs")->cascadeOnDelete()->cascadeOnUpdate();
            $table->string("status");
            $table->integer("status_code");
            $table->json("response_body")->nullable();
            $table->boolean("is_successful");
            $table->decimal("execution_duration", 20, 2);
            $table->text("error_message")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cron_job_histories');
    }
};
