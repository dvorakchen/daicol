FROM docker.1ms.run/denoland/deno:latest

WORKDIR /app

COPY ./package.json ./package.json
COPY ./deno.json ./deno.json
COPY ./deno.lock ./deno.lock

RUN deno install --allow-scripts=npm:@tailwindcss/oxide

COPY . .

ENV DATABASE_URL="postgres://postgres:123123@localhost:5432/daicol"
ENV MINIO_ENDPOINT="minio"
ENV MINIO_PORT="9000"
ENV MINIO_ACCESS_KEY="minio_user"
ENV MINIO_SECRET_KEY="minio_password"

RUN deno task build

RUN rm ./static -rf

ENV BODY_SIZE_LIMIT=5M
ENV PORT=3000

EXPOSE 3000

CMD deno task db:migrate && deno run -E -N -S -R ./build/index.js
