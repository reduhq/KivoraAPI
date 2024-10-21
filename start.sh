#! /usr/bin/env bash

# Run the migrations
npx prisma generate
npx prisma migrate deploy

# Compile to TS
npm run build

# Run the api
npm run start