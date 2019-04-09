module.exports = app => {
    app.get('/api/movie/featured', require('./controllers/MovieFeaturedController'));
    app.post('/api/movie/search', require('./controllers/MovieSearchController'));
    app.get('*', require('./controllers/AppController'));
};
