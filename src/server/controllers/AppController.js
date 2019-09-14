const path = require('path');
const config = require('../../config/server');

module.exports = (req, res) => {
  res.sendFile(path.join(config.paths.build, 'index.html'));
};
