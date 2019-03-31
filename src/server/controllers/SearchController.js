const services = require('../services');

module.exports = async (req, res) => {
  return res.send(req.params.query);

  const magnetURI = 'magnet:?xt=urn:btih:196cfbe40f9afa8866681ad5e73d159f50c580aa&dn=Harry+Potter+and+the+Goblet+of+Fire+%282005%29+1080p+BrRip+x264+-+2.&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Fexodus.desync.com%3A6969';

  // services.searchEndpoints(req)

  console.log('magnetURI', magnetURI);

  if (DB.hasOwnProperty(magnetURI)) {
    return DB[magnetURI](req, res);
  }

  client.add(magnetURI);

  DB[magnetURI] = torrent => {
    const file = torrent.files.find(file => file.name.endsWith('.mp4'));
    const total = file.length;
    const range = req.headers.range;

    console.log('range', range);

    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const partialStart = parts[0];
      const partialEnd = parts[1];
      const start = parseInt(partialStart, 10);
      const end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
      const chunkSize = (end - start) + 1;
      console.log('RANGE: ' + start + ' - ' + end + ' = ' + chunkSize);

      res.status(206);
      res.set({
        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'video/mp4',
      });
    } else {
      res.status(200).set({'Content-Length': total, 'Content-Type': 'video/mp4'});
    }

    file.createReadStream().pipe(res);
  };
}
