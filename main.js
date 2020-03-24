const loiloAPIserver = "https://n.loilo.tv" //Change this if the server is on premise
let port = 3000
let isDebug = false;

const http = require("http");
const url = require("url");
for (i = 2; process.argv.length > i; i++) {
  switch (process.argv[i]) {
    case "--port":
    case "-p":
      i++
      if (!isNaN(process.argv[i])) {
        port = Number(process.argv[i])
      } else {
        console.error("The given port number is not valid");
      }
      break;
    case "--debug":
      isDebug = true;
      console.log("Debug mode enabled")
      break;
    default:
      console.error("Unkown parameter: %s", process.argv[i])
  }
}

http.createServer(function (req, res) {
  const requestURL = loiloAPIserver + url.parse(req.url).path.substring(url.parse(req.url).pathname.indexOf("/api"));
  req.on('end', function () {
    if (isDebug) console.log("%s %s", req.method, requestURL)
    switch (url.parse(requestURL).pathname) {
      case "/":
        res.writeHead(302, {
          "Location": "https://kasmide.gitlab.io/loiloantifiltering/",
          "Cache-Control": "max-age=31536000",
          "Strict-Transport-Security": "max-age=31536000"
        });
        res.end();
        break;
      case "/api/web_filtering":
        res.end('{"type":"none"}')
        break;
      case "/api/web_card/browsing_status":
        res.end("{}");
        break;
      default:
        res.writeHead(308, {
          "Location": requestURL,
          "Cache-Control": "max-age=31536000",
          "Strict-Transport-Security": "max-age=31536000"
        })
        res.end();
        break;
    }
  })
}).listen(port);
console.log("Listen on 0.0.0.0:" + port);
