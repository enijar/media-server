const {Op} = require('sequelize');
const torrentStream = require('torrent-stream');
const pump = require('pump');
const rangeParser = require('range-parser');
const Movie = require('../models/Movie');
const services = require('../services/index');

module.exports = async (req, res) => {
  const movie = await Movie.findOne({
    where: {
      id: {
        [Op.eq]: req.params.id,
      },
    },
  });

  if (!movie) {
    return res.status(404).send('Movie not found');
  }

  const magnet = services.magnet.get(movie);
  const engine = torrentStream(magnet);

  engine.swarm.pause();

  engine.on('ready', () => {
    const file = engine.files.find(file => file.name.endsWith('.mp4'));

    if (!file) {
      console.error('No MP4 file found for movie');
      return res.end();
    }

    // if (req.headers.range) {
    //   const parts = req.headers.range.replace(/bytes=/, '').split('-');
    //   const start = parseInt(parts[0], 10);
    //   const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
    //   return file.createReadStream({start, end}).pipe(res);
    // }
    //
    // return file.createReadStream().pipe(res);

    let range = req.headers.range;
    range = range && rangeParser(file.length, range)[0];
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('transferMode.dlna.org', 'Streaming');
    res.setHeader('contentFeatures.dlna.org', 'DLNA.ORG_OP=01;DLNA.ORG_CI=0;DLNA.ORG_FLAGS=01700000000000000000000000000000');
    if (!range) {
      res.setHeader('Content-Length', file.length);
      if (req.method === 'HEAD') {
        return res.end();
      }
      pump(file.createReadStream(), res);
      return;
    }

    res.statusCode = 206;
    res.setHeader('Content-Length', range.end - range.start + 1);
    res.setHeader('Content-Range', 'bytes ' + range.start + '-' + range.end + '/' + file.length);
    if (req.method === 'HEAD') return res.end();
    pump(file.createReadStream(range), res);
  });
};
