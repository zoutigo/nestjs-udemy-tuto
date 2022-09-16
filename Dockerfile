FROM node:alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . .

ENV DOCKER=ENABLE

CMD npm run start:dev