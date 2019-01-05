"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const chai_1 = require("chai");
const vamtiger_bash_1 = require("vamtiger-bash");
const vamtiger_get_file_data_1 = require("vamtiger-get-file-data");
const XRegExp = require("xregexp");
const types_1 = require("../../types");
const projectPath = path_1.resolve(__dirname, '../../..');
const build = XRegExp('/build/');
const source = '/source/';
const mockData = 'mock-data';
const htmlFile = 'index.html';
const htmlBundle = 'index.ts';
const htmlBundleCopy = 'index-copy.json';
const encoding = 'utf-8';
const mockDataFolderPath = path_1.resolve(__dirname, mockData);
const entryFilePath = path_1.resolve(XRegExp.replace(mockDataFolderPath, build, source), htmlFile);
const bundleFilePath = path_1.resolve(mockDataFolderPath, htmlBundle);
const copyBundleFilePath = path_1.resolve(mockDataFolderPath, htmlBundleCopy);
const createMockDataFolder = `mkdir ${mockDataFolderPath}`;
const createBundlePath = path_1.resolve(__dirname, '../../bin/index.js');
const createHtmlBundleTs = [
    `node ${createBundlePath}`,
    `--${types_1.CommandlineArgs.entryFilePath} ${entryFilePath}`,
    `--${types_1.CommandlineArgs.bundleFilePath} ${bundleFilePath}`
].join(' ');
describe('vamtiger-bundle-html: bin should', function () {
    before(function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield vamtiger_bash_1.default(createHtmlBundleTs);
        });
    });
    it('bundle html into a single Typescript file', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const htmlBundle = yield vamtiger_get_file_data_1.default(bundleFilePath, encoding);
            chai_1.expect(htmlBundle).to.be.ok;
        });
    });
});
function ignore() { }
//# sourceMappingURL=index.spec.js.map