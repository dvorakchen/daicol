# Daicol/Portal

Dvorak's AI collection Portal

This project used:

- frontend framework: Sveltekit
- backend framework: Sveltekit
- UI style: Tailwindcss, DaisyUI
- icon: lucide-svelte
- runtime: Deno
- package manager: Deno
- log: winston
- database: postgres
- ORM: drizzle
- http: rxjs
- i18n: paraglide
- unit test: vitest
- e2e test: playwright

## Developing

set the .env file,

```sh
deno install --allow-scripts=npm:sharp,npm:@tailwindcss/oxide
deno task db:push
```

Minio

```sh
sudo docker run -p 9000:9000 -p 9090:9090 --name minio -d -e  "MINIO_ROOT_USER=minio_user" -e  "MINIO_ROOT_PASSWORD=minio_password" -v ~/data/minio:/data docker.1ms.run/minio/minio server /data --console-address ":9090" -address ":9000"
```

PostgreSQL
```sh
docker run -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=daicol -v ~/data/daicol/postgres:/var/lib/postgresql/data docker.1ms.run/postgres:16
```

```sh
deno task dev -- --open
```

## Building

To create a production version of your app:

```sh
npm deno task build
```

You can preview the production build with `deno task preview`.

Run the product file:

```sh
deno run --env-file -E -N -S -R ./build/index.js
```
