/*
Copyright 2020 kasmide

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


SPDX-License-Identifier: Apache-2.0
*/

'use strict'

const loiloAPIserver = "https://n.loilo.tv" //Change this if the server is on premise
let port = 3000
let isDebug = false;

const http = require("http");
const url = require("url");
for (let i = 2; process.argv.length > i; i++) {
  switch (process.argv[i]) {
    case "--port":
    case "-p":
      i++
      if (!isNaN(process.argv[i]) && Number(process.argv[i]) <= 65535 && Number(process.argv[i]) >= 0) {
        port = Number(process.argv[i])
      } else {
        console.error(`The given port number "${process.argv[i]}" is invalid\nPort number must be in the range of 0 ~ 65535`);
        process.exitCode = 1;
        return;
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
  req.on("data", function () {
  })
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
