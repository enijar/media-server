module.exports = app => {
  app.get('/api/movie/featured', require('./controllers/MovieFeaturedController'));
  app.post('/api/movie/search', require('./controllers/MovieSearchController'));
  app.get('/api/movie/latest', require('./controllers/MovieLatestController'));
  app.get('/api/movie/:id', require('./controllers/MovieShowController'));
  app.get('/api/stream/:id', require('./controllers/StreamController'));
  app.get('*', require('./controllers/AppController'));
};
