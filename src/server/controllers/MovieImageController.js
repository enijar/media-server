const fs = require('fs');
const path = require('path');
const config = require('../../config/server');

module.exports = async (req, res) => {
  try {
    const imagePath = path.join(config.paths.storage, 'movie-images', `${req.params.id}.jpg`);
    if (fs.existsSync(imagePath)) {
      res.setHeader('Content-Type', 'image/jpg');
      return res.sendFile(imagePath);
    }
  } catch (err) {
    console.error(err);
  }
  return res.send(null);
};
