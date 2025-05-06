<x-mail::message>
# Hey {{ $cronjob->user->name }} 👋


# Important Update 
 
Your {{ $cronjob->title }} Cron Job Has Been Expired It Means It Wont Be Executed Again.
If You Want It to Execute Again Than Please Visit Our Website To 
Enable This Again


Thanks,<br>

# Best Regards  <br>
{{ config('app.name') }}
</x-mail::message>
