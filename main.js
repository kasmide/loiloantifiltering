const loiloAPIserver = "https://n.loilo.tv" //Change this if the server is on premise
let port = 3000

const http = require("http");
const url = require("url");
const request = require("request");
let blockedAccounts = new Object();
if (process.argv[2]) {
  if (!isNaN(process.argv[2])) {
    port = Number(process.argv[2])
  } else {
    console.error("The given port number is not valid");
  }
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
    req.on('end', function () {
      if (requestURL == loiloAPIserver + "/api/web_card/browsing_status") {
        res.end("{}")
      } else if (requestURL == loiloAPIserver + "/api/tokens") {
        const usernameArray = String(Buffer.concat(data)).match(/user=.[^&]*/g);
        const username = usernameArray[usernameArray.length - 1].substring(5);
        if (!blockedAccounts[username] || new Date().getTime() - blockedAccounts[username]["time"] >= 3600000 || !blockedAccounts[username]["blocked"]) {
          request({ url: requestURL, method: "POST", body: Buffer.concat(data), headers: req.headers }, function (error, response, body) {
            if (response.statusCode != 200) {
              if (!blockedAccounts[username]) {
                blockedAccounts[username] = {};
                blockedAccounts[username]["failCount"] = 1;
                blockedAccounts[username]["time"] = new Date().getTime();
              } else {
                if (new Date().getTime() - blockedAccounts[username]["time"] >= 3600000) {
                  blockedAccounts[username]["failCount"] = 1;
                  blockedAccounts[username]["time"] = new Date().getTime();
                  delete blockedAccounts[username]["blocked"]
                } else {
                  blockedAccounts[username]["failCount"]++;
                  if (blockedAccounts[username]["failCount"] >= 10) {
                    blockedAccounts[username]["blocked"] = true;
                    blockedAccounts[username]["time"] = new Date().getTime();
                  }
                }
              }
            }
          }).pipe(res)
        } else {
          res.writeHead(401);
          res.end("{\"status\":401}")
        }
      } else {
        request({ url: requestURL, method: "POST", body: Buffer.concat(data), headers: req.headers }).pipe(res);
      }
    }
    )
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
      res.end(require('fs').readFileSync('docs/index.html'));
    }
  }
  console.log(req.method + " " + requestURL)
}).listen(port);
console.log("Listen on 0.0.0.0:" + port);
