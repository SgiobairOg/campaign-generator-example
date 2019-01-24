/*jslint node: true */
'use strict';

const LocaleService = require('../../services/locale.service');
const provider = new LocaleService();

const writePage = function(locale = 'en') {
    provider.setLocale(locale);
    return `<!DOCTYPE html>
        <html lang='${locale}'>
            <head>
                <title>${provider.translate('meta.title')}</title>
                <link rel="stylesheet" type="text/css" href="css/main.css" />
            </head>
            <body class="${provider.translate('styles.bodyClass')}">
                <h1>${provider.translate('greeting.normal')}</h1>
                <p>${provider.translateN('%s dog', '3')}</p>
            </body>
        </html>
    `;
};

module.exports = {
    writePage: writePage
};
