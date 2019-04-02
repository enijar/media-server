module.exports = app => {
  app.post('/search', require('./controllers/SearchController'));
  app.get('*', require('./controllers/AppController'));
}
