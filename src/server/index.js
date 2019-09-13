const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('./bootstrap');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

app.listen(3000, () => {
  console.log(`Running http://localhost:3000`);
});
