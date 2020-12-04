FROM node:12.17.0

MAINTAINER fengxiao<@hacker.com>
ONBUILD WELCOME_TO_USE

ENV workdir /workdir
WORKDIR $workdir

COPY . $workdir

RUN npm install -g cnpm --registry=https://registry.npm.taobao.org
RUN cnpm install -i
RUN mv flag /

ENTRYPOINT node app.js