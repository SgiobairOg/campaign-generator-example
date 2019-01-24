/*jslint node: true */
'use strict';

const fse = require('fs-extra');
const args = require('args');
const path = require('path');
const minify = require('minify');

class BuildService {
    constructor(fs = fse) {
        this.fs = fs;
        this.args = args;
    }

    readFlags() {
        this.args
            .option(['t', 'template'], 'Set the template to use for the site', 'basic')
            .option(['o', 'output'], 'Set the output directory for the site', 'dist');
        this.flags = this.args.parse(process.argv);
    }

    createPaths(flags, locale) {
        this.templatePath = path.resolve(__dirname, '../templates/', flags.template);
        this.outputPath = path.resolve(__dirname, '../../', flags.output, flags.template, locale);
        this.optionsPath = path.resolve(this.templatePath, 'site.config.js');
        this.indexPath = path.resolve(this.outputPath, 'index.html');
    }

    copyFilter(src) {
        return !(src.includes('index.js') || src.includes('site.config.js'));
    }

    emptyDirectory(path) {
        try {
            fse.emptyDirSync(path);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error(err);
            process.exit(1);
        }
    }

    createPage(path, content) {
        try {
            fse.outputFileSync(path, content);
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Failed to output file: ', err);
            process.exit(1);
        }

        minify(path).catch(err => {
            // eslint-disable-next-line no-console
            console.log('Minification failed: ', err);
            process.exit(1);
        });
    }

    copyAssets(source, dist) {
        try {
            fse.copySync(source, dist, { filter: this.copyFilter });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Copying assets filed: ', err);
            process.exit(1);
        }
    }
}

module.exports = BuildService;
