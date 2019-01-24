/*jslint node: true */
'use strict';

const LocaleService = require('./../services/locale.service');
const BuildService = require('./../services/build.service');

const localiser = new LocaleService();
const builder = new BuildService();

builder.readFlags();

const locales = localiser.getLocales();

locales.forEach(locale => {
    builder.createPaths(builder.flags, locale);
    const { writePage } = require(builder.templatePath);

    builder.emptyDirectory(builder.outputPath);
    builder.createPage(builder.indexPath, writePage(locale));
    builder.copyAssets(builder.templatePath, builder.outputPath);
});
