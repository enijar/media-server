// @todo fetch these dynamically from an API, e.g. https://torrents.io/tracker-list/
const trackers = [
  'udp://tracker.openbittorrent.com:80',
];

module.exports = {
  get (movie) {
    return `magnet:?xt=urn:btih:${movie.hash}&dn=${encodeURI(movie.title)}&tr=${trackers.join('&tr=')}`;
  },
};
