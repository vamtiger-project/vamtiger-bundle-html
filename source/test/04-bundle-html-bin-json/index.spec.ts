import { resolve as resolvePath, dirname } from 'path';
import { expect } from 'chai';
import createFile from 'vamtiger-create-file';
import bash from 'vamtiger-bash';
import getFileData from 'vamtiger-get-file-data';
import getDirectoryContent from 'vamtiger-get-directory-content';
import * as XRegExp from 'xregexp';
import createBundle from '../..';
import { CommandlineArgs as Args } from '../../types';

const projectPath = resolvePath(
    __dirname,
    '../../..'
);
const build = XRegExp('/build/');
const source = '/source/';
const mockData =  'mock-data';
const htmlFile = 'index.html';
const htmlBundle = 'index.json';
const htmlBundleCopy = 'index-copy.json';
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
    htmlBundle
);
const copyBundleFilePath = resolvePath(
    mockDataFolderPath,
    htmlBundleCopy
);
const createMockDataFolder = `mkdir ${mockDataFolderPath}`;
const createBundlePath = resolvePath(
    __dirname,
    '../../bin/index.js'
);
const createHtmlBundle = [
    `node ${createBundlePath}`,
    `--${Args.entryFilePath} ${entryFilePath}`,
    `--${Args.bundleFilePath} ${bundleFilePath}`,
    `--json`
].join(' ');

describe('vamtiger-bundle-html: bin should', function () {
    it('bundle html into a single JSON file', async function () {
        const directoryContent = await getDirectoryContent(projectPath);
        const createFolder = directoryContent.includes('source') ? 
            await bash(createMockDataFolder).catch(ignore)
            :
            this.skip();
        const createdBundle = await bash(createHtmlBundle);
        const htmlBundle = require(bundleFilePath);

        expect(htmlBundle.html).to.be.ok;
    })
});

function ignore() {}