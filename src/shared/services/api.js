const request = require('superagent');

const sendRequest = ({endpoint, method, data = {}}) => new Promise(resolve => {
    request[method](endpoint)
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
    get: (endpoint, data) => sendRequest({endpoint, method: 'get', data}),
    post: (endpoint, data) => sendRequest({endpoint, method: 'post', data}),
};
