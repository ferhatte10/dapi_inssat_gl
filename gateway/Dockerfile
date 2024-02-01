FROM node:lts-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
RUN npm install

COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]