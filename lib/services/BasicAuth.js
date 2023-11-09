const { auth }              = require('../../etc/config');
const { ForbiddenError }    = require('../utils/errors');
const { PERMISSION_DENIED } = require('../utils/errors/codes/forbidden');
const ServiceBase           = require('./BaseService');

class BasicAuth extends ServiceBase {
    async validate(data) {
        return this.doValidation(data, {
            authorization : [ 'string' ],
            method        : [ 'string' ],
            path          : [ 'string', 'required' ]
        });
    }

    async execute({ authorization, path, method }) {
        this.logger.info({ method, path });
        const b64auth = (authorization || '').split(' ')[1] || '';
        const [ login, password ] = Buffer.from(b64auth, 'base64').toString().split(':');

        if (login !== auth.login || password !== auth.password) {
            throw new ForbiddenError(PERMISSION_DENIED);
        }

        return {};
    }
}

module.exports = BasicAuth;
