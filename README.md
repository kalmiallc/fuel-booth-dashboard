# Fuel app (Leaderboard)

This repository contains source code for the Leaderboard frontend.

## Stack

- node 18+
- Nuxt 3
- Vue 3 w/ TypeScript
- Pinia Store
- NaiveUI
- TailwindCSS

## Environment

You need to setup a `lib/config/${env}.ts` file with variables described below.

First part is Application setup.

- `APP_URL` URL where Leaderboard will be runnig.
- `GAME_URL` URL where game will be running
- `API_BASE` URL where API will be running.

Second is FUEL configuration:

- `SIGNER_ADDRESS` Address of the signer,

## Running

```sh
npm i

# dev (serve with browser refresh on file change)
npm run dev

# build code
npm run build

# just serve
npm run preview
```
