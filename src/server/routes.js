module.exports = app => {
  app.post('/api/movie/search', require('./controllers/MovieSearchController'));
  app.get('/api/movie/latest', require('./controllers/MovieLatestController'));
  app.get('/api/movie/:id/image', require('./controllers/MovieImageController'));
  app.get('/stream/:id', require('./controllers/StreamController'));
  app.get('*', require('./controllers/AppController'));
};
