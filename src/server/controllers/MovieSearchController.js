const services = require('../services');

module.exports = async (req, res) => {
    if (!req.body.query) {
        return res.send({errors: ['Missing query parameter']});
    }

    if (services.cache.has(`api.movie.search.${req.body.query}`)) {
        return res.send({results: services.cache.get(`api.movie.search.${req.body.query}`)});
    }

    const magnets = await services.searchEndpoints(req.body.query);
    const results = magnets.map(services.parseMagnetURI);

    services.cache.set(`api.movie.search.${req.body.query}`, results);

    res.send({results});
};
