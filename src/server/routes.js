module.exports = app => {
  app.post('/search/:query', require('./controllers/SearchController'));
  app.get('*', require('./controllers/AppController'));
}
