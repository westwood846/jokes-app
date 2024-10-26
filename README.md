# Lang App

> Still working on a better name

## Web/Frontend

In `web`

### Dev

`pnpm dev` to start dev-server with default env config (localhost API).

### Prod

`pnpm build` to build static files, `node envify.js` to write the .env config to the build, then start with your fave web server, e.g. `npx http-server dist`.

## API/Backend

In `server`

### Dev

`npx prisma migrate dev` to apply DB migrations and build the Prisma client. `pnpm dev` to start the dev server in watch mode.

`docker compose up -d` starts a local Postgres DB.

### Prod

`npx prisma migrate deploy` to apply DB migrations. `pnpm build`, then `node server.js`. Tell it about the DB connection

Change the server's .env to point it to a Postgres DB.
