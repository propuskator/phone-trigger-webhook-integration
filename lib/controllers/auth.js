const makeServiceRunner = require('../makeServiceRunner');
const BasicAuth      = require('../services/BasicAuth');

module.exports = {
    basic : makeServiceRunner(BasicAuth, req => ({
        ...req.headers,
        path   : req.path,
        method : req.method
    }), (req, res, next) => next())
};
