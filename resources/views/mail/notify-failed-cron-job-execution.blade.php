<x-mail::message>
# Hey {{ $cronjob->user->name }}  👋


# Important Note
Your  {{ $cronjob->title ?? $cronjob->url }} Cron Job Has Failed  Please Check Your Cron Job
For More Information And It Will Be Disabled If It Still Fails.


Thanks,<br>

# Best Regards  <br>
{{ config('app.name') }}
</x-mail::message>
