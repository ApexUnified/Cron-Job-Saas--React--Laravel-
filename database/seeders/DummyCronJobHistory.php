<?php

namespace Database\Seeders;

use App\Models\CronJobHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DummyCronJobHistory extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table("cron_job_histories")->truncate();
        for ($i = 1; $i <= 100; $i++) {
            CronJobHistory::create([
                "cron_job_id" => 115,
                "status" => "success",
                "status_code" => 200,
                "is_successful" => 1,
                "execution_duration" => 1,
            ]);
        }
    }
}
