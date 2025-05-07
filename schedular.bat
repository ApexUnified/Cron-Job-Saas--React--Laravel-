@echo off
cd /d "D:\ABDULLAH_WORK\Laravel Portfolio Projects\cron-saas"
:loop
echo Running your scheduled task...
php artisan schedule:run
timeout /t 60 >nul
goto loop
