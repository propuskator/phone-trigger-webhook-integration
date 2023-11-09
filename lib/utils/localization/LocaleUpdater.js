const fs = require('fs');
const path = require('path');
const errorClasses = require('../errors');
const validatorMappings = require('../validationErrorFormatter/mappings');
const { Logger } = require('../Logger');

const logger = Logger('LocaleUpdater');

module.exports = class LocaleUpdater {
    constructor() {
        this.messages = [];
    }

    getMessagesFromErrors() {
        const initialLength = this.messages.length;

        logger.info('Getting messages from errors...');
        for (const errorClass in errorClasses) {
            if (!errorClasses[errorClass]) continue;
            const ValidationError = errorClasses[errorClass];

            for (const code in ValidationError.codes) {
                if (!ValidationError.codes[code]) continue;
                if (ValidationError.codesWithArgs && ValidationError.codesWithArgs[code]) {
                    for (const args of ValidationError.codesWithArgs[code]) {
                        const err = ValidationError.codes[code](args);

                        this.messages.push(err.message);
                        err.errors.forEach(e => this.messages.push(e.message));
                    }
                } else {
                    const err = ValidationError.codes[code]({});

                    this.messages.push(err.message);
                    err.errors.forEach(e => this.messages.push(e.messages));
                }
            }
        }

        logger.info(`Found messages count: ${this.messages.length - initialLength}.`);

        this.messages = [ ...new Set(this.messages) ].filter(m => !!m).sort();
    }

    getMessagesFromValidator() {
        const initialLength = this.messages.length;

        logger.info('Getting messages from validator...');
        for (const mapping in validatorMappings) {
            if (mapping === 'defaultMapping') {
                this.messages = this.messages.concat(Object.values(validatorMappings[mapping]));
            } else {
                for (const fieldsMapping in validatorMappings[mapping]) {
                    if (!validatorMappings[mapping][fieldsMapping]) continue;
                    this.messages = this.messages.concat(Object.values(validatorMappings[mapping][fieldsMapping]));
                }
            }
        }

        logger.info(`Found messages count: ${this.messages.length - initialLength}.`);
    }

    updateLocaleFile(localePath) {
        const fullLocalePath = path.join(__dirname, localePath);
        const locale = require(fullLocalePath);
        const newLocale = JSON.parse(JSON.stringify(locale));

        for (const message of this.messages) {
            if (!newLocale.locale_data.messages[message]) {
                newLocale.locale_data.messages[message] = [];
            }
        }

        // eslint-disable-next-line
        fs.writeFileSync(fullLocalePath, JSON.stringify(newLocale, null, 4));
    }

    checkEmpty(localePath) {
        logger.info('Checking for empty translations...');
        const fullLocalePath = path.join(__dirname, localePath);

        delete require.cache[fullLocalePath];
        const locale = require(fullLocalePath);
        const messages = locale.locale_data.messages;

        if (!Object.keys(messages).length) {
            logger.info('All translated.');

            return;
        }
        const notTranslatedMessages = [];

        for (const messageName in messages) {
            if (messageName && !messages[messageName].length) {
                notTranslatedMessages.push(`- ${messageName}`);
            }
        }

        if (notTranslatedMessages.length) {
            logger.info('Messages without localizations:');
            notTranslatedMessages.forEach(m => console.log(m));
            logger.info(`Please check localization file ${localePath}.`);
        } else {
            logger.info('All messages translated.');
        }
    }
};
