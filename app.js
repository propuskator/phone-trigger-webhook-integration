require('dotenv').config();
const express    = require('express');
const { Logger } = require('./lib/utils/Logger.js');
const config     = require('./etc/config');
const router     = require('./lib/router');
const {
    bodyParserJSON,
    clsMiddleware,
    urlencoded
} = require('./lib/middlewares');

const APP_PORT = config.port;

const app    = express();
const logger = Logger('app');

logger.info(`APP STARTING AT PORT ${APP_PORT}`);
app.listen(APP_PORT);

app.use(bodyParserJSON);
app.use(urlencoded);
app.use(clsMiddleware);
app.use('/phone-trigger-webhook/api/v1', router);
app.use('/phone-trigger-webhook-swagger', express.static('apidoc'));

module.exports = app;
