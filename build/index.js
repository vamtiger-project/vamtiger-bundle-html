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
const vamtiger_get_file_data_1 = require("vamtiger-get-file-data");
const vamtiger_create_file_1 = require("vamtiger-create-file");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
const XRegExp = require("xregexp");
const types_1 = require("./types");
const newLines = XRegExp('\\n', 'gms');
const multiSpace = XRegExp('\\s{2,}', 'g');
const nothing = '';
exports.default = (params) => __awaiter(this, void 0, void 0, function* () {
    const entryFilePath = params.entryFilePath;
    const bundleFilePath = entryFilePath && params.bundleFilePath;
    const copyBundleFilePath = bundleFilePath && params.copyBundleFilePath;
    const json = params.json;
    const html = entryFilePath && (yield vamtiger_get_file_data_1.default(entryFilePath, 'utf-8'));
    const htmlBundle = html && XRegExp
        .replace(html, newLines, nothing)
        .replace(multiSpace, '') || '';
    const htmlBundleJson = json && JSON.stringify({ html: htmlBundle });
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;
    if (!entryFilePath)
        throw new Error(types_1.ErrorMessage.noEntryFile);
    else if (!bundleFilePath)
        throw new Error(types_1.ErrorMessage.noBundleFile);
    yield vamtiger_create_file_1.default(bundleFilePath, htmlBundleJson || htmlBundle);
    if (copyFileParams)
        yield vamtiger_copy_file_1.default(copyFileParams);
    result = true;
    return result;
});
//# sourceMappingURL=index.js.map