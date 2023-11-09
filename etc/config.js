module.exports = {
    port : process.env.APP_PORT || 38080,
    auth : {
        login    : process.env.AUTH_LOGIN || 'admin',
        password : process.env.AUTH_PASSWORD || 'admin'
    },
    handler : {
        baseUrl   : process.env.HANDLER_BASE_URL || 'http://access-phone-trigger-handler:48080',
        apiPrefix : process.env.HANDLER_BASE_API_PREFIX || '/api/v1',
        endpoint  : process.env.HANDLER_BASE_ENDPOINT || 'handle-call'
    },
    phoneTriggerNumbers : process.env.PHONE_TRIGGER_NUMBERS
        ? process.env.PHONE_TRIGGER_NUMBERS.split(',')
        : []
};
