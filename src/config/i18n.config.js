/*jslint node: true */
'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['en', 'de'],
    objectNotation: true,
    defaultLocale: 'en',
    directory: path.resolve('./', 'src/locales'),
    updateFiles: true
});

module.exports = i18n;
