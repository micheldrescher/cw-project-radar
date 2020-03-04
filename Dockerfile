FROM node:10-alpine

RUN apk add tzdata
ENV TZ=Europe/Rome

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 8080
CMD [ "npm", "run", "dev" ]


