<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>


       @if(!auth()->user())

       <link href="https://fonts.googleapis.com/css?family=Inter:300,400,500,600,700,800" rel="stylesheet" />
       <link href="https://demos.creative-tim.com/soft-ui-dashboard/assets/css/nucleo-icons.css" rel="stylesheet" />
       <link href="https://demos.creative-tim.com/soft-ui-dashboard/assets/css/nucleo-svg.css" rel="stylesheet" />
       <link id="pagestyle" href="{{ asset("assets/css/soft-ui-dashboard.css") }}" rel="stylesheet" />
       <script src="{{ asset("assets/js/core/popper.min.js") }}"></script>
       <script src="{{ asset("assets/js/core/bootstrap.min.js") }}"></script>
       <script src="{{ asset("assets/js/plugins/perfect-scrollbar.min.js") }}"></script>
       <script src="{{ asset("assets/js/plugins/smooth-scrollbar.min.js") }}"></script>
       <script>
            var win = navigator.platform.indexOf('Win') > -1;
            if (win && document.querySelector('#sidenav-scrollbar')) {
                var options = {
                    damping: '0.5'
                }
                Scrollbar.init(document.querySelector('#sidenav-scrollbar'), options);
            }
       </script>
       <script src="{{ asset("assets/js/soft-ui-dashboard.min.js") }}"></script>


       @else
       @endif
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
