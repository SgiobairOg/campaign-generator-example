const expect = require('chai').expect;

const LocaleService = require('./locale.service');
const i18n = require('i18n');

describe('Locale Service', function() {
    describe('Constructor funtion ', function() {
        it('Should provide i18n as a default internationalisation provider ', function() {
            let provider = new LocaleService();
            expect(provider.i18nProvider).to.equal(i18n);
        });
        it('Should accept an internationalisation provider ', function() {
            let provider = new LocaleService(i18n);
            expect(provider.i18nProvider).to.equal(i18n);
        });
    });
    describe('getLocale function ', function() {
        it('Should return a string noting the current locale ', function() {
            i18n.configure({
                locales: ['en', 'de']
            });
            let provider = new LocaleService(i18n);
            expect(provider.getLocale()).to.equal('en');
        });
    });
    describe('getLocales function ', function() {
        it('Should return an array containing configured locales ', function() {
            i18n.configure({
                locales: ['en', 'de']
            });
            let provider = new LocaleService(i18n);
            expect(provider.getLocales()).to.deep.equal(['en', 'de']);
        });
    });
    describe('setLocale function ', function() {
        it('Should set a locale if it exists in configured locales ', function() {
            i18n.configure({
                locales: ['en', 'de']
            });
            let provider = new LocaleService(i18n);
            provider.setLocale('de');
            expect(provider.getLocale()).to.equal('de');
        });
    });
    describe('translate function ', function() {
        it('Should return a translation for a given string ', function() {
            i18n.configure({
                locales: ['en', 'de']
            });
            let provider = new LocaleService(i18n);
            expect(provider.translate('hello')).to.be.a('string');
        });
    });
    describe('translate function ', function() {
        it('Should return a translation for a given string and count', function() {
            i18n.configure({
                locales: ['en', 'de']
            });
            let provider = new LocaleService(i18n);
            expect(provider.translateN('puppy', 3)).to.be.a('string');
        });
    });
});
