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
const vamtiger_get_directory_content_recursive_1 = require("vamtiger-get-directory-content-recursive");
const vamtiger_get_file_text_1 = require("vamtiger-get-file-text");
const htmlExtension = /\.(html|svg)$/;
const newline = '\n';
const newlines = /\n/g;
const space = ' ';
function default_1({ entryFilePath, entryFolderPath, ignore }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { file: currentFiles = [] } = (entryFolderPath && (yield vamtiger_get_directory_content_recursive_1.default({
            path: entryFolderPath,
            classified: true
        })) || {});
        const files = ignore && currentFiles.filter(currentFile => !currentFile.match(ignore)) || currentFiles;
        const htmlFiles = Array.from(new Set([
            entryFilePath,
            ...files
        ].filter(filePath => filePath && path_1.parse(filePath).ext.match(htmlExtension))));
        const htmlList = yield Promise.all(htmlFiles.map(htmlFile => vamtiger_get_file_text_1.default(htmlFile)));
        const html = htmlList.length && htmlList
            .join(newline)
            .replace(newlines, space)
            || '';
        return html;
    });
}
exports.default = default_1;
//# sourceMappingURL=get-html.js.map