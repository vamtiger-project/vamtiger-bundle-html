import { resolve as resolvePath, dirname } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import bash from 'vamtiger-bash';
import getFileData from 'vamtiger-get-file-data';
import * as XRegExp from 'xregexp';
import createBundle from '../..';

const build = XRegExp('/build/');
const source = '/source/';
const mockData =  'mock-data';
const htmlFile = 'index.html';
const htmlFileCopy = 'index-copy.html';
const encoding = 'utf-8';
const mockDataFolderPath = resolvePath(
    __dirname,
    mockData
);
const entryFilePath = resolvePath(
    XRegExp.replace(mockDataFolderPath, build, source),
    htmlFile
);
const bundleFilePath = resolvePath(
    mockDataFolderPath,
    htmlFile
);
const copyBundleFilePath = resolvePath(
    mockDataFolderPath,
    htmlFileCopy
);
const createMockDataFolder = `mkdir ${mockDataFolderPath}`;
const bundleHtmlParams = {
    entryFilePath,
    bundleFilePath,
    copyBundleFilePath
};

describe('vamtiger-bundle-html should', function () {
    it('bundle html into a single HTML file', async function () {
        const createFolder = bash(createMockDataFolder).catch(ignore);
        const createdBundle = await createBundle(bundleHtmlParams);
        const htmlBundle = await getFileData(bundleFilePath, encoding);
        const htmlBundleCopy = await getFileData(copyBundleFilePath, encoding);

        expect(createdBundle).to.be.ok;
        expect(htmlBundle).to.be.ok;
        expect(htmlBundleCopy).to.be.ok;
        expect(htmlBundle).to.equal(htmlBundleCopy);
    })
});

function ignore() {}