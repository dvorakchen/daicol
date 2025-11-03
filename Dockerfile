FROM node:lts-slim

WORKDIR /app

COPY package.json ./
COPY packages/*/package.json ./packages/

RUN npm i

COPY . .
WORKDIR /app/packages/portal
ENV DATABASE_URL="postgres://postgres:123123@localhost:5432/daicol"
RUN npm i
RUN rm ./static -rf

ENV BODY_SIZE_LIMIT=5M
ENV PORT=3000
EXPOSE 3000

CMD npm run db:migrate && node ./build/index.js