const loiloAPIserver = "https://n.loilo.tv" //Change this if the server is on premise
let port = 3000

const http = require("http");
const url = require("url");
const request = require("request");
if (!isNaN(process.argv[2])) {
  port = Number(process.argv[2])
} else {
  console.error("The given port number is not valid");
}
http.createServer(function (req, res) {
  realHost = req.headers.host
  req.headers.host = url.parse(loiloAPIserver).host
  const requestURL = loiloAPIserver + url.parse(req.url).path.substring(url.parse(req.url).pathname.indexOf("/api"));
  if (req.method === "POST") {
    const data = [];
    req.on('data', function (chunk) {
      data.push(chunk);
    })
    if (req.url != "/api/web_card/browsing_status") {
      req.on('end', function () {
        request({ url: requestURL, method: "POST", body: Buffer.concat(data), headers: req.headers }).pipe(res);
      }
      )
    } else {
      res.end("{}")
    }
  } else {
    if (url.parse(req.url).pathname.indexOf("/api") != -1) {
      switch (url.parse(req.url).pathname.substring(url.parse(req.url).pathname.indexOf("/api"))) {
        case "/api/web_filtering":
          var sender = setInterval(function () { res.write("hello world ") }, 10000)
          setTimeout(function () {
            clearInterval(sender);
          }, 3600000)
          res.on("close", function () {
            clearInterval(sender);
          });
          return;
        default:
          request({ url: requestURL, method: req.method, headers: req.headers }).pipe(res);
          return;
      }
    } else {
      res.end(require('fs').readFileSync('howToUse.html'));
    }
  }
  console.log(req.method + " " + requestURL)
}).listen(port);
console.log("Listen on 0.0.0.0:" + port);