// @todo fetch these dynamically from an API
const trackers = [
  'udp://open.demonii.com:1337/announce',
  'udp://tracker.openbittorrent.com:80',
  'udp://tracker.coppersurfer.tk:6969',
  'udp://glotorrents.pw:6969/announce',
  'udp://tracker.opentrackr.org:1337/announce',
  'udp://torrent.gresille.org:80/announce',
  'udp://p4p.arenabg.com:1337',
  'udp://tracker.leechers-paradise.org:6969',
];

module.exports = {
  get (movie) {
    return `magnet:?xt=urn:btih:${movie.hash}&dn=${encodeURI(movie.title)}&tr=${trackers.join('&tr=')}`;
  },
};
