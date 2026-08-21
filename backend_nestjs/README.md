## Libraries Installed

- npm i --save @nestjs/config
- npm i joi
- npm i --save nestjs-pino pino-http pino-pretty
- npm install class-validator class-transformer
- npm install prisma @types/pg --save-dev
- npm install @prisma/client @prisma/adapter-pg pg dotenv
- npm i --save-dev @types/node

## Running Project (without Volume)

```
docker compose up

npx prisma format --schema ./prisma

<!-- npx prisma migrate dev --name init -->
npm run prisma:migrate

npm run start:dev

npm run lint:fix

npm run format

npm run prebuild

npm run build

```
