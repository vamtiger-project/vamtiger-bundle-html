import getFileData from 'vamtiger-get-file-data';
import createFile from 'vamtiger-create-file';
import copyFile from'vamtiger-copy-file';
import * as XRegExp from 'xregexp';
import { MainParams as Params, ErrorMessage } from './types';
import getHtml from './get-html';

const newLines = XRegExp('\\n', 'gms');
const multiSpace = XRegExp('\\s{2,}', 'g');
const htmlExtension = XRegExp('htm(l)?$');
const tsExtension = XRegExp('\.ts$');
const nothing = '';

export default async (params: Params) => {
    const {
        entryFilePath,
        entryFolderPath,
        bundleFilePath: bundleFile,
        json, copyBundleFilePath
    } = params;
    const ts = (bundleFile as string).match(tsExtension);
    const html = await getHtml({
        entryFilePath,
        entryFolderPath
    });
    const htmlBundle = html.replace(multiSpace, '') || '';
    const htmlBundleJson = json && JSON.stringify({html: htmlBundle});
    const htmlBundleTs = ts && `export default '${htmlBundle}';`;
    const bundleFilePath = ts && (bundleFile as string).replace(htmlExtension, 'ts')
        || json && (bundleFile as string).replace(htmlExtension, 'json')
        || bundleFile;
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;

    if (!bundleFilePath) throw new Error(ErrorMessage.noBundleFile);

    await createFile(bundleFilePath, htmlBundleTs || htmlBundleJson || htmlBundle);

    copyFileParams && await copyFile(copyFileParams);

    result = true;

    return result;
}
