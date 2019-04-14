#!/usr/bin/env bash

npm install

if [[ "$APP_ENV" = production ]]
then
    echo "APP_ENV build"
    npm run build
    npm start
else
    echo "APP_ENV watch"
    npm run server-watch &
    npm run watch
fi
