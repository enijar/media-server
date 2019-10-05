const express = require('express');
const bodyParser = require('body-parser');
require('./bootstrap');
const config = require('../config/server');

const app = express();

app.use(bodyParser.json());
app.use(express.static(config.paths.build));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

app.listen(config.port, () => {
  console.log(`Running http://localhost:${config.port}`);
  process.on('uncaughtException', err => {
    console.error(err.message);
  });
});
