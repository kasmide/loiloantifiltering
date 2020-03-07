FROM node:latest
WORKDIR /usr/src/loiloantifiltering/
COPY package*.json ./
RUN npm i
COPY . .
ENTRYPOINT ["npm", "start", "$PORT"]