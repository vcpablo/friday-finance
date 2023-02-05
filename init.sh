#!/bin/bash
cd friday-finance-be
docker-compose up -d
yarn install
yarn db:reset

cd ../friday-finance-fe
yarn install

cd ../
yarn dev
