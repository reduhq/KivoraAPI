#! /usr/bin/env sh

# Compile to TS
npm run build

# Run the migrations
npx prisma generate
npx prisma migrate dev

# Run the api
npm run start