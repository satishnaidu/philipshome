FROM resin/raspberrypi3-alpine-node:slim

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPy . .
CMD ["npm","start"]
