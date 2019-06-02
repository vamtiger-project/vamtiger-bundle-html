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
const vamtiger_create_file_1 = require("vamtiger-create-file");
const vamtiger_copy_file_1 = require("vamtiger-copy-file");
const XRegExp = require("xregexp");
const types_1 = require("./types");
const get_html_1 = require("./get-html");
const newLines = XRegExp('\\n', 'gms');
const multiSpace = XRegExp('\\s{2,}', 'g');
const htmlExtension = XRegExp('htm(l)?$');
const tsExtension = XRegExp('\.ts$');
const nothing = '';
exports.default = (params) => __awaiter(this, void 0, void 0, function* () {
    const { entryFilePath, entryFolderPath, bundleFilePath: bundleFile, json, copyBundleFilePath, ignore } = params;
    const ts = bundleFile.match(tsExtension);
    const html = yield get_html_1.default({
        entryFilePath,
        entryFolderPath,
        ignore
    });
    const htmlBundle = html.replace(multiSpace, ' ') || '';
    const htmlBundleJson = json && JSON.stringify({ html: htmlBundle });
    const htmlBundleTs = ts && `export default \`${htmlBundle}\`;`;
    const bundleFilePath = ts && bundleFile.replace(htmlExtension, 'ts')
        || json && bundleFile.replace(htmlExtension, 'json')
        || bundleFile;
    const copyFileParams = copyBundleFilePath && {
        source: bundleFilePath,
        destination: copyBundleFilePath
    };
    let result = false;
    if (!bundleFilePath)
        throw new Error(types_1.ErrorMessage.noBundleFile);
    yield vamtiger_create_file_1.default(bundleFilePath, htmlBundleTs || htmlBundleJson || htmlBundle);
    copyFileParams && (yield vamtiger_copy_file_1.default(copyFileParams));
    result = true;
    return result;
});
//# sourceMappingURL=index.js.map