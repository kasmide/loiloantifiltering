const loiloAPIserver = "https://n.loilo.tv" //Change this if the server is on premise

const http = require("http");
const url = require("url");
const request = require("request");
http.createServer(function (req, res) {
  realHost = req.headers.host
  req.headers.host = url.parse(loiloAPIserver).host
  const requestURL = loiloAPIserver + url.parse(req.url).path.substring(url.parse(req.url).pathname.indexOf("/api"));
  if (req.method === 'GET') {
    if (url.parse(req.url).pathname.indexOf("/api") != -1) {
      switch (url.parse(req.url).pathname.substring(url.parse(req.url).pathname.indexOf("/api"))) {
        case "/api/web_filtering":
          var sender = setInterval(function () { res.write("hello world ")}, 10000)
          setTimeout(function () {
            clearInterval(sender);
          }, 3600000)
          res.on("close", function () {
            clearInterval(sender);
          });
          return;
        default:
          console.log("GET: " + requestURL)
          request({ url: requestURL, method: "GET", headers: req.headers }).pipe(res);
          return;
      }
    } else {
      res.end(require('fs').readFileSync('howToUse.html'));
    }
  } else if (req.method === "POST") {
    const data = [];
    req.on('data', function (chunk) {
      data.push(chunk);
    })
    req.on('end', function () {
      console.log("POST: " + requestURL)
      request({ url: requestURL, method: "POST", body: Buffer.concat(data), headers: req.headers }).pipe(res);
    }
    )
  }
}).listen(3000); 