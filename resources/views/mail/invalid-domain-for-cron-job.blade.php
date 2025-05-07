<x-mail::message>
# Hey {{ $cronJob->user->name }} 👋

Your {{ $cronJob->title ?? $cronJob->url }} Cron Job Has Invalid Domain Please Check Your Cron Job For More Information And For Now Its Disabled



Thanks,<br>

# Best Regards  <br>
{{ config('app.name') }}
</x-mail::message>

