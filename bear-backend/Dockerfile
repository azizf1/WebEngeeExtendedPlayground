FROM node:20 AS development

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

FROM node:20 AS production

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install --production

COPY . .

RUN npx tsc

EXPOSE 3000

CMD ["node", "dist/server.js"]
