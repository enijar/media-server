import request from "axios";
import get from "lodash/get";
import config from "../config";

const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

const pendingRequests = [];

const cancelRequest = token => {
    for (let i = pendingRequests.length - 1; i >= 0; i--) {
        if (pendingRequests[i].token === token) {
            pendingRequests.splice(i, 1);
            break;
        }
    }
};

const sendRequest = ({method, endpoint, data = {}, type = 'json', progressCallback = null, headers = {}}) => new Promise(async resolve => {
    headers = Object.assign(DEFAULT_HEADERS, headers);

    // We're using JWT here to authenticate, so if the token is not in
    // localStorage, then the user is definitely not authenticated.
    // NOTE: We ignore any routes that are public (defined in app config.
    const user = JSON.parse(localStorage.getItem('auth.user')) || {};

    if (!config.publicRoutes.includes(endpoint) && !user.hasOwnProperty('jwt')) {
        return resolve({success: false, errors: ['Unauthorised'], message: null, code: 401});
    }

    // Set the JWT in the Bearer header for all requests.
    headers['Authorization'] = `Bearer ${user.jwt || ''}`;

    const CancelToken = request.CancelToken;
    const source = CancelToken.source();

    pendingRequests.push(source);

    try {
        const args = {cancelToken: source.token, headers};

        if (method === 'download') {
            method = 'get';
            args.responseType = 'blob';
        }

        const res = await request[method](endpoint, method === 'get' ? args : data, method === 'get' ? undefined : args);

        // Remove this request from the pending requests array
        cancelRequest(source.token);

        if (res === undefined) {
            // Server is disconnected
            return resolve({success: false, errors: ['Server disconnected'], message: null, code: 503});
        }

        if (res.status < 300) {
            return resolve({
                success: true,
                body: res.data,
                errors: [],
                message: get(res, 'data.message', null),
                code: res.status,
            });
        }
    } catch (err) {
        // Remove this request from the pending requests array
        cancelRequest(source.token);

        let errors = ['Unknown error'];

        if (err.response.status === 404) {
            errors = ['Page not found'];
        }

        if (err.response.status === 500) {
            errors = ['Internal server error'];
        }

        if (err.response.data && err.response.data.errors) {
            errors = err.response.data.errors;
        }

        resolve({success: false, errors, message: null, code: err.response.status});
    }
});

export default class Request {
    static get(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'get', endpoint, data, headers});
    }

    static post(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'post', endpoint, data, headers});
    }

    static patch(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'patch', endpoint, data, headers});
    }

    static delete(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'delete', endpoint, data, headers});
    }

    static download(endpoint, data = {}, headers = {}) {
        return sendRequest({method: 'download', endpoint, data, headers});
    }

    static abortAllRequests() {
        // Stop all pending requests and remove them from the array
        for (let i = pendingRequests.length - 1; i >= 0; i--) {
            pendingRequests[i].cancel();
            pendingRequests.splice(i, 1);
        }
    }
}
