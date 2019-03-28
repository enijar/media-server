const services = require('./services/index');

(async () => {
  try {
    const query = 'Harry Potter';
    const res = await services.http.search(query);
    const magnets = res.text.match(/magnet:[^"]*/gm);

    for (let i = 0; i < magnets.length; i++) {
      const {name} = services.magnet.parse(magnets[i]);
      console.log(name, magnets[i]);
    }

  } catch (err) {
    console.error(err);
  }
})();
