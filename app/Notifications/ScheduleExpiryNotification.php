<?php

namespace App\Notifications;

use App\Models\CronJob;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ScheduleExpiryNotification extends Notification implements ShouldQueue
{
    use Queueable;


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
        return ['mail', "database"];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Cron Job Expired')
            ->markdown('mail.schedule_expiry_notification', ["cronjob" => $this->cronjob]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'cronjob' => $this->cronjob,
            'message' => "Your Cron Job Has Been Expired It Means It Wont Be Executed Again."
        ];
    }
}
