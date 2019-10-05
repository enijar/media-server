const {Op} = require('sequelize');
const torrentStream = require('torrent-stream');
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

    const headers = {
      'Content-Type': 'video/mp4',
    };

    if (req.headers.range) {
      const parts = req.headers.range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : file.length - 1;
      const chunkSize = (end - start) + 1;
      headers['Content-Range'] = `bytes ${start}-${end}/${file.length}`;
      headers['Accept-Ranges'] = 'bytes';
      headers['Content-Length'] = chunkSize;
    } else {
      headers['Content-Length'] = file.length;
    }

    res.writeHead(200, headers);
    return file.createReadStream().pipe(res);
  });
};
