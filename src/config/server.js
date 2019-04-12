const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '..', '.env')});
const common = require('./common');

module.exports = {
    ...common,
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
    proxyHost: process.env.PROXY_HOST,
    scraperInterval: 5000,
};
