<x-mail::message>
# Hey {{ $cronJob->user->name }} 👋

Important Note:

Your {{ $cronJob->title ?? $cronJob->url }} Cron Job Has Been Disabled Because It Has Failed Many Times.
Please Check Your Cron Job And Enable Manually And If It Still Fails Then It Will Be Disabled Again.


Thanks,<br>

# Best Regards  <br>
{{ config('app.name') }}
</x-mail::message>
