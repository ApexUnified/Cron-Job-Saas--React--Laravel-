<?php

namespace Database\Seeders;

use App\Models\CronJob;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CronJobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i <= 10; $i++) {
            CronJob::create([
                "title" => "Test Cron Job {$i}",
                "url" => "https:example.com",
                "method" => "GET",
                "is_require_auth" => false,
                "schedule_execution" => json_encode([
                    "type" => "minutes",
                    "value" => 1
                ]),
                "user_id" => 1,
                "is_enabled" => true,
                "schedule_expiry_date" => null,


            ]);
        }
    }
}
