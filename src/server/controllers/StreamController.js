const path = require('path');
const WebTorrent = require('webtorrent');
const Movie = require('../models/Movie');
const services = require('../services/index');

const client = new WebTorrent();
client.uploadSpeed = 0;
const downloadsPath = path.resolve(__dirname, '..', '..', '..', 'storage', 'downloads');

const streamVideo = (torrent, req, res) => {
  const file = torrent.files.find(file => file.name.endsWith('.mp4'));

  if (req.headers.range) {
    const parts = req.headers.range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 0) : file.length - 1;
    const chunkSize = (end - start) + 1;
    const stream = file.createReadStream({start, end});

    res.set({
      'Content-Range': `bytes ${start}-${end}/${file.length}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    });
    res.status(206);
    return stream.pipe(res);
  }

  const stream = file.createReadStream();
  res.set({
    'Content-Length': file.length,
    'Content-Type': 'video/mp4',
  });
  return stream.pipe(res);
};

module.exports = async (req, res) => {
  const cachedTorrent = services.cache.get(`movie.${req.params.id}`);

  if (cachedTorrent) {
    return streamVideo(cachedTorrent, req, res);
  }

  const movie = await Movie.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!movie) {
    res.status(404).send({errors: ['Movie not found']});
  }

  const magnet = services.magnet.get(movie);

  client.add(magnet, {path: downloadsPath}, torrent => {
    services.cache.set(`movie.${req.params.id}`, torrent);
    return streamVideo(torrent, req, res);
  });
};
