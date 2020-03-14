FROM node:slim
WORKDIR /usr/src/loiloantifiltering/
COPY package*.json ./
RUN npm i
COPY . .
ARG DEFAULT_PORT=3000
ENV DEFAULT_PORT_ENV=$DEFAULT_PORT
EXPOSE $DEFAULT_PORT_ENV
CMD ["npm", "start", "--", "-p", "$(if [ -z $PORT ]; then echo $DEFAULT_PORT_ENV;else echo $PORT;fi)"]