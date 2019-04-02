import getFileData from 'vamtiger-get-file-data';
import createFile from 'vamtiger-create-file';
import copyFile from'vamtiger-copy-file';
import * as XRegExp from 'xregexp';
import { MainParams as Params, ErrorMessage } from './types';
import getHtml from './get-html';

const newLines = XRegExp('\\n', 'gms');
const multiSpace = XRegExp('\\s{2,}', 'g');
const nothing = '';

export default async ({ entryFilePath, entryFolderPath, bundleFilePath, copyBundleFilePath, json }: Params) => {
    const html = await getHtml({ entryFilePath, entryFolderPath });
    const htmlBundle = html.replace(multiSpace, '') || '';
    const htmlBundleJson = json && JSON.stringify({html: htmlBundle});
    const copyFileParams = copyBundleFilePath && bundleFilePath && copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;

    if (!bundleFilePath) throw new Error(ErrorMessage.noBundleFile);

    await createFile(bundleFilePath, htmlBundleJson || htmlBundle);

    copyFileParams && await copyFile(copyFileParams);

    result = true;

    return result;
}