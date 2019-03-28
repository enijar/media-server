const magnet = require('magnet-uri');

module.exports = {
  parse (uri) {
    return magnet.decode(uri);
  }
}
