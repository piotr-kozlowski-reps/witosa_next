FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json .

# RUN npm install --production --ignore-scripts
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "start"]

