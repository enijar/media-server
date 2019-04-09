const services = require('../services/index');

module.exports = async (req, res) => {
    if (services.cache.has('api.movie.featured')) {
        return res.send(services.cache.get('api.movie.featured'));
    }

    const response = await services.api.get('/trending/movie/week');

    // Cache this response for 12 hours
    services.cache.set('api.movie.featured', response.body, 1000 * 60 * 60 * 12);

    res.send(response.body);
};
