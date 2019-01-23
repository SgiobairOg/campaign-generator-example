/*jslint node: true */
'use strict';

const i18n = require('i18n');

class LocaleService {
    constructor(i18nProvider = i18n) {
        this.i18nProvider = i18nProvider;
    }

    getLocale() {
        return this.i18nProvider.getLocale();
    }

    getLocales() {
        return this.i18nProvider.getLocales();
    }

    setLocale(locale) {
        if (this.getLocales().includes(locale)) {
            this.i18nProvider.setLocale(locale);
        }
    }

    translate(string, options = undefined) {
        return this.i18nProvider.__(string, options);
    }

    translateN(string, count = 1) {
        return this.i18nProvider.__n(string, count);
    }
}

module.exports = LocaleService;
