import { parse as parsePath } from 'path';
import getFolderContent, { ClassifiedDirectoryContent } from 'vamtiger-get-directory-content-recursive';
import getFileText from 'vamtiger-get-file-text';
import {
    IGetHtml
} from './types';

const htmlExtension = /\.(html|svg)$/;
const newline = '\n'

export default async function ({ entryFilePath, entryFolderPath }: IGetHtml) {
    const { file: files = [] } = (entryFolderPath && await getFolderContent({
        path: entryFolderPath,
        classified: true
    }) || {}) as ClassifiedDirectoryContent;
    const htmlFiles = Array.from(new Set([
        entryFilePath,
        ...files
    ].filter(filePath => filePath && parsePath(filePath as string).ext.match(htmlExtension)))) as string[];
    const htmlList = await Promise.all(
        htmlFiles.map(htmlFile => getFileText(htmlFile as string))
    );
    const html = htmlList.length && htmlList.join(newline) || '';

    return html;
}