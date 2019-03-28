const services = require('./services/index');

(async () => {
  const query = 'Harry Potter';
  const magnets = await services.searchEndpoints(query);

  for (let i = 0; i < magnets.length; i++) {
    const {name, uri} = services.parseMagnetURI(magnets[i]);
    console.log(name, uri);
  }
})();
