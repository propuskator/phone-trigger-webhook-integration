const { handler, phoneTriggerNumbers } = require('../../etc/config');
const ApiFetch    = require('../api/ApiFetch');
const ServiceBase = require('./BaseService');

const apiFetch = new ApiFetch({ baseUrl: handler.baseUrl });

class CallTrigger extends ServiceBase {
    async validate(data) {
        return this.doValidation(data, {
            phone_in   : [ 'required', 'string', 'trim', { like: [ '^[0-9]{7,15}$' ] }, { one_of: phoneTriggerNumbers } ],
            phone_user : [ 'required', 'string', 'trim', { like: [ '^[0-9]{7,15}$' ] } ],
            call_id    : [ 'string' ]
        });
    }

    async execute(data) {
        if (!phoneTriggerNumbers.includes(data.phone_in)) return;

        this.logger.debug('Trigger target service...');

        apiFetch
            .post({
                endpoint  : handler.endpoint,
                body      : data,
                apiPrefix : handler.apiPrefix
            })
            .catch(this.logger.error);

        return { status: 'ok' };
    }
}

module.exports = CallTrigger;
