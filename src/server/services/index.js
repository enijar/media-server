const common = require('../../shared/services/index');

module.exports = {
  ...common,
  api: require('./api'),
  searchEndpoints: require('./searchEndpoints'),
  parseMagnetURI: require('./parseMagnetURI'),
  cache: require('./cache'),
  db: require('./db'),
};
