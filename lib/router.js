const express     = require('express');
const controllers = require('./controllers');

const router = express.Router();
const basicAuth = controllers.auth.basic;

router.get('/trigger', basicAuth, controllers.trigger.callTrigger);

module.exports = router;
