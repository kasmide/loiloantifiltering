FROM node:latest
WORKDIR /usr/src/loiloantifiltering/
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD ["npm", "start", "--", "-p", "$(if [ -z $PORT ]; then echo 3000;else echo $PORT;fi)"]