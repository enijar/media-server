const request = require('superagent');
const server = require('../../config/server');

/**
 * Search the first available endpoint for magnet
 * URIs matching the given query.
 *
 * @param {String} query
 * @return {Promise<Array>}
 */
module.exports = query => {
    if (!query) {
        throw new Error('No query passed to searchEndpoints service');
    }

    query = encodeURI(query);

    let endpoint = server.endpoints[0];
    endpoint = endpoint.split('{query}').join(query);

    return new Promise(resolve => {
        request.get(endpoint).send().end((err, res) => {
            if (err) {
                console.error(err);
                return resolve([]);
            }

            const magnets = (res.text || '').match(/magnet:[^"]*/gm);

            return resolve(magnets || []);
        });
    });
};
