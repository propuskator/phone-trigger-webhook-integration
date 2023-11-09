const fetch       = require('isomorphic-fetch');
const queryString = require('query-string');

class ApiFetch {
    constructor({ baseUrl }) {
        this.baseUrl = baseUrl;
    }

    get({ endpoint, options = {}, apiPrefix = '/api/v1' }) {
        const query = options.query
            ? queryString.stringify(options.query)
            : '';

        return fetch(`${this.baseUrl}${apiPrefix}/${endpoint}?${query}`, {
            ...options,
            method : 'GET'
        });
    }

    post({ endpoint, body, options = {}, apiPrefix = '/api/v1' }) {
        return fetch(`${this.baseUrl}${apiPrefix}/${endpoint}`, {
            method  : 'POST',
            headers : {
                ...options.headers,
                'Accept'       : 'application/json',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(body)
        });
    }

    put({ endpoint, body, options = {}, apiPrefix = '/api/v1' }) {
        return fetch(`${this.baseUrl}${apiPrefix}/${endpoint}`, {
            method  : 'PUT',
            headers : {
                ...options.headers,
                'Accept'       : 'application/json',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(body)
        });
    }

    delete({ endpoint, body, options = {}, apiPrefix = '/api/v1' }) {
        return fetch(`${this.baseUrl}${apiPrefix}/${endpoint}`, {
            method  : 'DELETE',
            headers : {
                ...options.headers,
                'Accept'       : 'application/json',
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(body)
        });
    }
}

module.exports = ApiFetch;
