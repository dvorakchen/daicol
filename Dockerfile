FROM docker.1ms.run/denoland/deno:latest

WORKDIR /app

COPY . .
RUN deno cache --no-check --reload packages/portal/deno.json

WORKDIR /app/packages/portal

RUN deno install --allow-scripts=npm:sharp,npm:@tailwindcss/oxide
ENV DATABASE_URL="postgres://postgres:123123@localhost:5432/daicol"

RUN deno task build

RUN rm ./static -rf

ENV BODY_SIZE_LIMIT=5M
ENV PORT=3000
EXPOSE 3000

CMD deno task db:migrate && deno run -E -N -S -R ./build/index.js