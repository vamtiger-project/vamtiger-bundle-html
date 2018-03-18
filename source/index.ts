import getFileData from 'vamtiger-get-file-data';
import createFile from 'vamtiger-create-file';
import copyFile from'vamtiger-copy-file';
import * as XRegExp from 'xregexp';
import { MainParams as Params, ErrorMessage } from './types';

const newLines = XRegExp('\\n', 'gms');
const nothing = '';

export default async (params: Params) => {
    const entryFilePath = params.entryFilePath;
    const bundleFilePath = entryFilePath && params.bundleFilePath;
    const copyBundleFilePath = bundleFilePath && params.copyBundleFilePath;
    const json = params.json;
    const html = entryFilePath && await getFileData(entryFilePath, 'utf-8');
    const htmlBundle = html && XRegExp.replace(html, newLines, nothing) || '';
    const htmlBundleJson = json && JSON.stringify({html: htmlBundle});
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;

    if (!entryFilePath) throw new Error(ErrorMessage.noEntryFile);
    else if (!bundleFilePath) throw new Error(ErrorMessage.noBundleFile);

    await createFile(bundleFilePath, htmlBundleJson || htmlBundle);

    if (copyFileParams) await copyFile(copyFileParams);

    result = true;

    return result;
}