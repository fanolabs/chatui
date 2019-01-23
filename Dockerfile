FROM node:8.6-alpine

RUN apk update
RUN apk upgrade

RUN mkdir -p /code
WORKDIR /code
COPY . /code

RUN npm install