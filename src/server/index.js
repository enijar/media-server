const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
require('./bootstrap');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.use(basicAuth({
    users: {
        'admin': process.env.ADMIN_PASSWORD,
    }
}));

require('./routes')(app);

app.listen(3000, () => {
    console.log(`Running http://localhost:3000`);
});
