FROM node:16.15.0-alpine
RUN mkdir -p /node/app/node_modules && chown -R node:node /node/app
WORKDIR /node/app
COPY package.json ./
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
ENV PORT 4000
EXPOSE $PORT
CMD [ "npm", "run", "start:dev"]