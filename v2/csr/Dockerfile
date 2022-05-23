FROM ubuntu:latest
RUN apt update && apt install nodejs -y
RUN mkdir /app

RUN apt-get update && apt-get install -y curl npm
RUN curl -sL https://deb.nodesource.com/setup_14.x | sh -
RUN curl -o- -L https://yarnpkg.com/install.sh | sh
RUN apt-get update
WORKDIR /app
ADD . $WORKDIR
RUN npm install -g yarn
RUN yarn install
EXPOSE 3000
