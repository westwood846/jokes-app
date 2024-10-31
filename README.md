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

### Docker & Cloud Build

Build and run a Docker image locally, replacing `<IP_ADDRESS>` with your computer's IP address in the LAN:

```
docker build \
  -t stories-backend:latest \
  --build-arg PORT=3001 \
  --build-arg DATABASE_URL="postgresql://postgres:postgres@<IP_ADDRESS>:5432/mydb?schema=public" \
  --build-arg API_URL="http://localhost:3001" \
  .

docker run --name stories -d -p 3001:3001 stories-backend:latest
```

You can also change the API `PORT`, `DATABASE_URL` and `API_URL` through their respective args.

In a Google Cloud Shell, or with `gcloud` installed locally, you can run the cloud build defined by `cloudbuild.yaml` by running `gcloud builds submit`. Deploy a service with the created image with `gcloud run deploy --image=gcr.io/${GOOGLE_CLOUD_PROJECT}/stories:latest --platform managed`
