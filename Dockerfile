FROM hayd/deno:1.4.3
WORKDIR /usr/src/loiloantifiltering/
COPY . .
RUN deno cache main.js
ARG DEFAULT_PORT=3000
ENV PORT=$DEFAULT_PORT
EXPOSE $PORT
CMD deno run --allow-net main.js -p $PORT
