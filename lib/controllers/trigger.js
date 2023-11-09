const makeServiceRunner = require('../makeServiceRunner');
const CallTrigger       = require('../services/CallTrigger');

module.exports = {
    callTrigger : makeServiceRunner(CallTrigger, req => ({ ...req.query }))
};
