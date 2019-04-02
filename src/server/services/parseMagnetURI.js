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

  const parsed = parseMagnetURI.decode(uri);
  parsed.uri = uri;

  console.log('parsed', parsed);

  return parsed;
}
