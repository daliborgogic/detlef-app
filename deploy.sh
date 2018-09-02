#!/bin/bash
ssh $APP_USER@$TLD "cd $APP_PATH
  git pull
  rm -rf node_modules .nuxt
  npm i
  npm run build
  pm2 restart pwa"

echo "Sucessfull build"

# exit 0
