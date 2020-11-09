Specifying hostnames other than n.loilo.tv to LoiloNote School's Server URL is no longer possible since LoiLoNote School v3.9.1, making this service not working anymore. (Specifying internal IP address works normally, so if you really want to bypass the filtering. You can build your own server)
# LoiloAntiFiltering
This app allows you to bypass the web filtering of LoiloNote School for iOS, offering the internet without limitation.

I'm running public server here: <https://loilo.herokuapp.com/>

## Server Setup
Use public server above or:
1. Download [Deno](https://deno.land/) from your distribution's package manager
1.     $ git clone https://gitlab.com/kasmide/loiloantifiltering && cd loiloantifiltering
1.     $ ./main.ts
### Options
- `--port,-p [port number]` changes the port number to listen to
- `--debug` enables debug mode
## iOS App Setup
**Warning**: You will be logged out in the steps, make sure to remember your user ID and password.
1. Open "Settings" and go to LoiloNote School > Server URL
1. Change the setting from `https://n.loilo.tv/` to `https://loilo.herokuapp.com/` or your local server address