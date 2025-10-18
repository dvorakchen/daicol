FROM docker.1ms.run/denoland/deno:latest

WORKDIR /app

COPY ./package.json ./package.json
COPY ./deno.json ./deno.json
COPY ./deno.lock ./deno.lock

RUN deno install --allow-scripts=npm:sharp,npm:@tailwindcss/oxide

COPY . .

RUN deno install --allow-scripts=npm:sharp,npm:@tailwindcss/oxide
ENV DATABASE_URL="postgres://postgres:123123@localhost:5432/daicol"

RUN deno task build

RUN rm ./static -rf

ENV PORT=3000
EXPOSE 3000

CMD deno task db:push && deno run -E -N -S -R ./build/index.js