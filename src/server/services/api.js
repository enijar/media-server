const request = require('superagent');
const querystring = require('querystring');
const config = require('../../config/server');

const sendRequest = ({endpoint, method, data = {}}) => new Promise(resolve => {
  data.api_key = config.apiKey;

  if (method === 'get') {
    endpoint = `${endpoint}?${querystring.encode(data)}`;
    data = undefined;
  }

  request[method](`${config.apiEndpoint}${endpoint}`)
    .set({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    })
    .send(data)
    .end((err, res) => {
      if (res === undefined) {
        return resolve({code: 503, body: null});
      }
      if (err) {
        return resolve({status: res.statusCode, body: res.body});
      }
      resolve({status: res.statusCode, body: res.body});
    });
});

module.exports = {
  get: endpoint => sendRequest({endpoint, method: 'get'}),
  post: endpoint => sendRequest({endpoint, method: 'post'}),
};
