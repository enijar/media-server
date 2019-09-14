const path = require('path');
const BASE_PATH = path.resolve(__dirname, '..', '..');
require('dotenv').config({path: path.join(BASE_PATH, '.env')});
const common = require('./common');

module.exports = {
  ...common,
  port: 3000,
  endpoints: [
    'https://thepiratebay.org/search/{query}/0/99/0',
  ],
  apiKey: '51421ce3f49d256ef63b70b3beeb7792',
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  cdnHost: 'https://img.yts.am',
  scraperInterval: 5000,
  paths: {
    base: BASE_PATH,
    build: path.join(BASE_PATH, 'build'),
    storage: path.join(BASE_PATH, 'storage'),
  },
};
