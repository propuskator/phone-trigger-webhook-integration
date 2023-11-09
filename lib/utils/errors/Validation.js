const AbstractException    = require('./AbstractException');
const codes = require('./codes/validation');

module.exports = class ValidationError extends AbstractException {
    constructor(code, payload = {}) {
        super(code, payload, ValidationError);
    }

    static get defaultError() {
        return {
            type    : 'validation',
            message : 'Validation error',
            errors  : []
        };
    }

    static get codesWithArgs() {
        return {
            [codes.NOT_FOUND] : [
                { entityName: 'email' }
            ]
        };
    }

    static get codes() {
        return {
            [codes.NOT_FOUND] : ({ entityName = 'Entity' }) => ({
                ...this.defaultError,
                code    : codes.NOT_FOUND,
                message : `${entityName} not found`
            })
        };
    }
};
