const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '..', '..', '.env')});
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes')(app);

require('./services/index').db.sync();

app.listen(3000, () => {
    console.log(`Running http://localhost:3000`);
});
