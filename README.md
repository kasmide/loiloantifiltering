# LoiloAntiFiltering
日本語の情報は [Wiki](https://gitlab.com/kasmide/loiloantifiltering/-/wikis/home) にあります。  
This app allows you to bypass the web filtering of LoiloNote School for iOS, offering the internet without limitation.

I'm running public server here: <https://loilo.herokuapp.com/>

## Server Setup
Use public server above or:
1. Download Node.js and npm from your distribution's package manager
1.     $ git clone https://gitlab.com/kasmide/loiloantifiltering && cd loiloantifiltering
1.     $ npm i
1.     $ npm start -- [options]
### Options
- `--port,-p [port number]` changes the port number to listen to
- `--debug` enables debug mode
## iOS App Setup
**Warning**: You will be logged out during the steps, make sure to remember your user ID and password.
1. Open "Settings" and go to LoiloNote School > Server URL
1. Change the setting from `https://n.loilo.tv/` to `https://loilo.herokuapp.com/` or your local server address