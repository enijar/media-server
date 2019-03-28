const parseMagnetURI = require('magnet-uri');

/**
 * Parse the given magnet URI, returning
 * useful information about it.
 *
 * @param {String} uri
 * @return {Object}
 */
module.exports = uri => {
  if (!uri) {
    throw new Error('No uri passed to parseMagnetURI service');
  }

  const {name} = parseMagnetURI.decode(uri);
  return {name, uri};
}
