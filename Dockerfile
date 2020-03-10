FROM node:latest
WORKDIR /usr/src/loiloantifiltering/
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "start", "$PORT"]