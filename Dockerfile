FROM node:20

RUN corepack enable pnpm
RUN npm i -g @vercel/ncc

WORKDIR /home/node/app
COPY . .

WORKDIR /home/node/app/server
RUN pnpm install
RUN npx prisma generate
RUN pnpm build

WORKDIR /home/node/app/web
RUN pnpm install
RUN pnpm build
ARG API_URL=localhost:3001
ENV API_URL=$API_URL
RUN echo "API_URL=${API_URL}" > .env
RUN node envify.js
RUN cp -r dist ../server/dist/frontend

ARG DATABASE_URL=postgresql://postgres:postgres@localhost:5432/mydb?schema=public
ENV DATABASE_URL=$DATABASE_URL
ARG PORT=3001
ENV PORT=$PORT

EXPOSE $PORT
WORKDIR /home/node/app/server
CMD [ "node", "dist/index.js" ]