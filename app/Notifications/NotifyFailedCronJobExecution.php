<?php

namespace App\Notifications;

use App\Models\CronJob;
use App\Models\CronJobHistory;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyFailedCronJobExecution extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public CronJob $cronjob)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Cron Job Failed")
            ->markdown('mail.notify-failed-cron-job-execution', ["cronjob" => $this->cronjob]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            "cronjob" => $this->cronjob,
            "message" => "Unexpected Error While Executing Cron Job"
        ];
    }
}
