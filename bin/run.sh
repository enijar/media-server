#!/usr/bin/env bash

npm start &

if [[ "$APP_ENV" = production ]]
then
    echo "APP_ENV build"
    npm run build
else
    echo "APP_ENV watch"
    npm run watch
fi
