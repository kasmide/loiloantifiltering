const loiloAPIserver = "https://n.loilo.tv" //Change this if the server is on premise
let port = 3000

const http = require("http");
const url = require("url");
if (process.argv[2]) {
  if (!isNaN(process.argv[2])) {
    port = Number(process.argv[2])
  } else {
    console.error("The given port number is not valid");
  }
}

http.createServer(function (req, res) {
  const requestURL = loiloAPIserver + url.parse(req.url).path.substring(url.parse(req.url).pathname.indexOf("/api"));
  req.on("data", function () {
  })
  req.on('end', function () {
    console.log("%s %s", req.method, requestURL)
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
