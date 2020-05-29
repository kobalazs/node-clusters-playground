FROM node:lts-alpine3.11

  WORKDIR /app
  
  COPY src/package.json ./

  RUN apk add yarn
  RUN yarn install
  RUN yarn global add pm2

  COPY src/ ./
  EXPOSE 1337

  RUN apk add bash
  CMD [ "pm2-runtime", "ecosystem.config.js" ]
  # CMD [ "yarn", "develop" ]
