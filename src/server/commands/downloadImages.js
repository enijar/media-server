require('../bootstrap');
const path = require('path');
const fs = require('fs');
const download = require('image-downloader');
const _ = require('lodash');
const config = require('../../config/server');
const Movie = require('../models/Movie');

const CHUNK_SIZE = 10;
const DOWNLOAD_PATH = path.join(config.paths.storage, 'movie-images');

// @note you will most likely need a VPN for this to run without
// being blocked by your ISP. I suggest https://nordvpn.com
module.exports = async function downloadImages () {
  try {
    const movies = await Movie.findAll();
    const movieChunks = _.chunk(movies, CHUNK_SIZE);

    for (let i = 0; i < movieChunks.length; i++) {
      console.log(`Downloading chunk ${i + 1}/${movieChunks.length}...`);

      const movieChunk = movieChunks[i];
      const downloads = [];

      for (let j = 0; j < movieChunk.length; j++) {
        const movie = movieChunk[j];
        const downloadPath = path.join(DOWNLOAD_PATH, `${movie.id}.jpg`);

        // Push the image to the downloads array (if it doesn't already exist)
        if (!fs.existsSync(downloadPath)) {
          downloads.push(download.image({url: movie.img, dest: downloadPath}));
        }
      }

      // If not downloads need to be executed, skip to the next chunk.
      if (downloads.length === 0) {
        continue;
      }

      try {
        await Promise.all(downloads);
      } catch (err) {
        console.error(err.message);
      }
    }
  } catch (err) {
    console.error(err.message);
  }
};
