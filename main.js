#!/bin/env -S deno run --allow-net
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

import { listenAndServe } from 'https://deno.land/std/http/server.ts';
for (let i = 0; Deno.args.length > i; i++) {
  switch (Deno.args[i]) {
    case "--port":
    case "-p":
      i++
      if (!isNaN(Deno.args[i]) && Number(Deno.args[i]) <= 65535 && Number(Deno.args[i]) >= 0) {
        port = Number(Deno.args[i])
      } else {
        throw new RangeError(`The given port number "${Deno.args[i]}" is invalid\nPort number must be in the range of 0 ~ 65535`);
      }
      break;
    case "--debug":
      isDebug = true;
      console.log("Debug mode enabled")
      break;
    default:
      console.error("Unkown parameter: %s", Deno.args[i])
  }
}
listenAndServe({ port: port }, async function(req) {
  if (isDebug) console.log("%s %s", req.method, req.url)
  switch (req.url.substring(0,req.url.indexOf("?"))) {
    case "/":
      req.respond({
        status: 302,
        headers: new Headers({
          "Location": "https://kasmide.gitlab.io/loiloantifiltering/",
          "Cache-Control": "max-age=31536000",
          "Strict-Transport-Security": "max-age=31536000"
        }),
      });
      break;
    case "/api/web_filtering":
      req.respond({body: "{\"type\":\"none\"}"});
      break;
    case "/api/web_card/browsing_status":
      req.respond({body: "{}"});
      break;
    default:
      req.respond({
        status: 308,
        headers: new Headers({
          "Location": loiloAPIserver + req.url,
          "Cache-Control": "max-age=31536000",
          "Strict-Transport-Security": "max-age=31536000"
        })
      })
      break;
  }
})
console.log("Listen on 0.0.0.0:" + port);
