module.exports = app => {
    app.get('/api/movie/featured', require('./controllers/MovieFeaturedController'));
    app.post('/api/movie/search', require('./controllers/MovieSearchController'));
    app.post('/api/stream', require('./controllers/StreamController'));
    app.get('*', require('./controllers/AppController'));
};
