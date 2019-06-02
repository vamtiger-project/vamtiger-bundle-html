import { parse as parsePath } from 'path';
import getFolderContent, { ClassifiedDirectoryContent } from 'vamtiger-get-directory-content-recursive';
import getFileText from 'vamtiger-get-file-text';
import {
    IGetHtml
} from './types';

const htmlExtension = /\.(html|svg)$/;
const newline = '\n';
const newlines = /\n/g;
const space = ' ';

export default async function ({ entryFilePath, entryFolderPath, ignore }: IGetHtml) {
    const { file: currentFiles = [] } = (entryFolderPath && await getFolderContent({
        path: entryFolderPath,
        classified: true
    }) || {}) as ClassifiedDirectoryContent;
    const files = ignore && (currentFiles as string[]).filter(currentFile => !currentFile.match(ignore)) || currentFiles;
    const htmlFiles = Array.from(new Set([
        entryFilePath,
        ...files
    ].filter(filePath => filePath && parsePath(filePath as string).ext.match(htmlExtension)))) as string[];
    const htmlList = await Promise.all(
        htmlFiles.map(htmlFile => getFileText(htmlFile as string))
    );
    const html = htmlList.length && htmlList
        .join(newline)
        .replace(newlines, space)
        || '';

    return html;
}