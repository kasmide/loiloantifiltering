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
  console.log(req.method + " " + requestURL)
  const data = [];
  req.on('data', function (chunk) {
    data.push(chunk);
  })
  req.on('end', function () {
    switch (url.parse(requestURL).pathname) {
      case "/api/web_filtering":
        var sender = setInterval(function () { res.write("hello world ") }, 10000)
        setTimeout(function () {
          clearInterval(sender);
        }, 3600000)
        res.on("close", function () {
          clearInterval(sender);
        });
        return;
      case "/api/web_card/browsing_status":
        res.end("{}");
        return;
      case "/api/tokens":
        const usernameArray = String(Buffer.concat(data)).match(/user=.[^&]*/g);
        if (usernameArray) {
          const username = usernameArray[usernameArray.length - 1].substring(5);
          if (!blockedAccounts[username] || new Date().getTime() - blockedAccounts[username]["time"] >= 3600000 || !blockedAccounts[username]["blocked"]) {
            request({ url: requestURL, method: req.method, body: Buffer.concat(data), headers: req.headers, encoding: null }, function (error, response, body) {
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
          return;
        }
      default:
        if (data.length != 0) request({ url: requestURL, method: req.method, body: Buffer.concat(data), headers: req.headers }).pipe(res);
        else request({ url: requestURL, method: req.method, headers: req.headers }).pipe(res);
        return;
    }
  }
  )
}).listen(port);
console.log("Listen on 0.0.0.0:" + port);
