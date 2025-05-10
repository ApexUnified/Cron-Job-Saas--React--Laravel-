<x-mail::message>
# Hey {{ $cronJob->user->name }} 👋


# Important Update 

Your Cron Jobs has reached its daily request quota based on your current subscription plan. All your Cron Jobs will resume running tomorrow.
 
Thanks,<br>

# Best Regards  <br>
{{ config('app.name') }}
</x-mail::message>
