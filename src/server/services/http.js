const request = require('superagent');
const server = require('../../config/server');

module.exports = {
  search (query) {
    query = encodeURI(query);

    let endpoint = server.endpoints[0];
    endpoint = endpoint.split('{query}').join(query);

    return new Promise((resolve, reject) => {
      request.get(endpoint).send().end((err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res);
      });
    });
  }
}
