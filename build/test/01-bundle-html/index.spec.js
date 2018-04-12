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
const vamtiger_get_directory_content_1 = require("vamtiger-get-directory-content");
const XRegExp = require("xregexp");
const __1 = require("../..");
const projectPath = path_1.resolve(__dirname, '../../..');
const build = XRegExp('/build/');
const source = '/source/';
const mockData = 'mock-data';
const htmlFile = 'index.html';
const htmlFileCopy = 'index-copy.html';
const encoding = 'utf-8';
const mockDataFolderPath = path_1.resolve(__dirname, mockData);
const entryFilePath = path_1.resolve(XRegExp.replace(mockDataFolderPath, build, source), htmlFile);
const bundleFilePath = path_1.resolve(mockDataFolderPath, htmlFile);
const copyBundleFilePath = path_1.resolve(mockDataFolderPath, htmlFileCopy);
const createMockDataFolder = `mkdir ${mockDataFolderPath}`;
const bundleHtmlParams = {
    entryFilePath,
    bundleFilePath,
    copyBundleFilePath
};
describe('vamtiger-bundle-html should', function () {
    it('bundle html into a single HTML file', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const directoryContent = yield vamtiger_get_directory_content_1.default(projectPath);
            const createFolder = directoryContent.includes('source') ?
                yield vamtiger_bash_1.default(createMockDataFolder).catch(ignore)
                :
                    this.skip();
            const createdBundle = yield __1.default(bundleHtmlParams);
            const htmlBundle = yield vamtiger_get_file_data_1.default(bundleFilePath, encoding);
            const htmlBundleCopy = yield vamtiger_get_file_data_1.default(copyBundleFilePath, encoding);
            chai_1.expect(createdBundle).to.be.ok;
            chai_1.expect(htmlBundle).to.be.ok;
            chai_1.expect(htmlBundleCopy).to.be.ok;
            chai_1.expect(htmlBundle).to.equal(htmlBundleCopy);
        });
    });
});
function ignore() { }
//# sourceMappingURL=index.spec.js.map