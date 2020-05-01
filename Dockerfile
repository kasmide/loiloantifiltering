FROM node:slim
WORKDIR /usr/src/loiloantifiltering/
COPY package*.json ./
RUN npm i
COPY . .
ARG DEFAULT_PORT=3000
ENV PORT=$DEFAULT_PORT
EXPOSE $PORT
CMD ["npm", "start", "--", "-p", "$PORT"]