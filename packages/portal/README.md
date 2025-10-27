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
