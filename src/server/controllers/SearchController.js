const services = require('../services');

module.exports = async (req, res) => {
    if (!req.body.query) {
        return res.send({errors: ['Missing query parameter']});
    }

    const magnets = await services.searchEndpoints(req.body.query);
    const results = magnets.map(services.parseMagnetURI);

    res.send({results});
}
