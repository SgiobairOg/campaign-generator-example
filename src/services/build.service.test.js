const expect = require('chai').expect;

const BuildService = require('./build.service');
const fse = require('fs-extra');

describe('Build Service', function() {
    describe('Constructor Function', function() {
        it('Should provide a file system module ', function() {
            const provider = new BuildService();
            expect(provider.fs).to.equal(fse);
        });
    });
    describe('Read Flags Function', function() {
        it('Should read flags from the arguments ', function() {
            const mockArgs = ['', '', '-t', 'test', '-o', 'test'];
            process.argv = mockArgs;
            const provider = new BuildService();
            provider.readFlags();
            expect(provider.flags).to.haveOwnProperty('t');
            expect(provider.flags).to.haveOwnProperty('o');
            expect(provider.flags.t).to.equal('test');
            expect(provider.flags.o).to.equal('test');
        });
        it('Should set default flags without arguments ', function() {
            const mockArgs = ['', ''];
            process.argv = mockArgs;
            const provider = new BuildService();
            provider.readFlags();
            expect(provider.flags).to.haveOwnProperty('t');
            expect(provider.flags).to.haveOwnProperty('o');
            expect(provider.flags.t).to.equal('basic');
            expect(provider.flags.o).to.equal('dist');
        });
    });
    describe('Create paths Function', function() {
        const flags = {
            template: 'test',
            output: 'test-dist'
        };
        const locale = 'en';
        const provider = new BuildService();
        provider.createPaths(flags, locale);
        it('Should return a template path ', function() {
            expect(provider.templatePath).to.contain('src/templates/test');
        });
        it('Should return an output path ', function() {
            expect(provider.outputPath).to.contain('test-dist/test/en');
        });
        it('Should return an options path ', function() {
            expect(provider.optionsPath).to.contain('src/templates/test/site.config.js');
        });
        it('Should return an index path ', function() {
            expect(provider.indexPath).to.contain('test-dist/test/en/index.html');
        });
    });

    describe('Copy Filter Function ', function() {
        it('Should return false for index.js', function() {
            const provider = new BuildService();
            expect(provider.copyFilter('index.js')).to.be.false;
        });
        it('Should return false for site.config.js', function() {
            const provider = new BuildService();
            expect(provider.copyFilter('site.config.js')).to.be.false;
        });
        it('Should return false for both', function() {
            const provider = new BuildService();
            expect(provider.copyFilter('index.js/site.config.js')).to.be.false;
        });
        it('Should return true for css files', function() {
            const provider = new BuildService();
            expect(provider.copyFilter('css/random.css')).to.be.true;
        });
        it('Should return true for js folder files', function() {
            const provider = new BuildService();
            expect(provider.copyFilter('js/random.js')).to.be.true;
        });
    });
    describe('Empty Dir Function ', function() {
        it('Should call the fs emptyDirSync function', function() {
            const provider = new BuildService();
            let calledFunction = false;
            let calledWith;
            const mockFunction = function(src) {
                calledFunction = true;
                calledWith = src;
            };
            provider.fs.emptyDirSync = mockFunction;
            provider.emptyDirectory('test');
            expect(calledFunction).to.be.true;
            expect(calledWith).to.equal('test');
        });
        it('Should exit if the fs emptyDirSync function errors', function() {
            const provider = new BuildService();
            let calledFunction = false;
            let calledWith;
            const mockEmptyFunction = function() {
                throw 'error';
            };
            const mockExitFunction = function(code) {
                calledFunction = true;
                calledWith = code;
            };
            process.exit = mockExitFunction;
            provider.fs.emptyDirSync = mockEmptyFunction;
            expect(provider.emptyDirectory('test')).to.throw;
            expect(calledFunction).to.be.true;
            expect(calledWith).to.equal(1);
        });
    });
    describe('Create page Function ', function() {
        it('Should call the fs createFileSync function', function() {
            const provider = new BuildService();
            let calledFunction = false;
            let calledWith;
            const mockFunction = function(path, content) {
                calledFunction = true;
                calledWith = [path, content];
            };
            provider.fs.outputFileSync = mockFunction;
            provider.createPage('file.test.js', 'test');
            expect(calledFunction).to.be.true;
            expect(calledWith).to.deep.equal(['file.test.js', 'test']);
        });
        it('Should exit if the fs createFileSync function errors', function() {
            const provider = new BuildService();
            let calledFunction = false;
            let calledWith;
            const mockCreateFunction = function() {
                throw 'error';
            };
            const mockExitFunction = function(code) {
                calledFunction = true;
                calledWith = code;
            };
            process.exit = mockExitFunction;
            provider.fs.outputFileSync = mockCreateFunction;
            expect(provider.createPage('file.test.js', 'test')).to.throw;
            expect(calledFunction).to.be.true;
            expect(calledWith).to.equal(1);
        });
    });
    describe('Copy Assets Function ', function() {
        it('Should call the fs copySync function', function() {
            const provider = new BuildService();
            let calledFunction = false;
            let calledWith;
            const mockFunction = function(src, dest) {
                calledFunction = true;
                calledWith = [src, dest];
            };
            provider.fs.copySync = mockFunction;
            provider.copyAssets('test/', 'test/2/');
            expect(calledFunction).to.be.true;
            expect(calledWith).to.deep.equal(['test/', 'test/2/']);
        });
        it('Should exit if the fs copySync function errors', function() {
            const provider = new BuildService();
            let calledFunction = false;
            let calledWith;
            const mockCopyFunction = function() {
                throw 'error';
            };
            const mockExitFunction = function(code) {
                calledFunction = true;
                calledWith = code;
            };
            process.exit = mockExitFunction;
            provider.fs.copySync = mockCopyFunction;
            expect(provider.copyAssets('test/', 'test/2/')).to.throw;
            expect(calledFunction).to.be.true;
            expect(calledWith).to.equal(1);
        });
    });
});
