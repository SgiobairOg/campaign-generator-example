/*jslint node: true */
'use strict';

const LocaleService = require('./../services/locale.service');
const provider = new LocaleService();
provider.setLocale(process.env.LOCALE || 'en');

const writePage = function() {
    return `<!DOCTYPE html>
        <html lang='${provider.getLocale()}'>
            <body>
                <h1>${provider.translate('greeting.normal')}</h1>
                <p>${provider.translateN('%s dog', '3')}</p>
            </body>
        </html>
    `;
};

module.exports = {
    writePage: writePage
};
