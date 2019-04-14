module.exports = app => {
    app.get('/api/movie/featured', require('./controllers/MovieFeaturedController'));
    app.post('/api/movie/search', require('./controllers/MovieSearchController'));
    app.get('/api/movie/:id', require('./controllers/MovieShowController'));
    app.post('/api/stream', require('./controllers/StreamController'));
    app.get('*', require('./controllers/AppController'));
};
