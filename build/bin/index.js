#!/usr/bin/env node
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
const fs_1 = require("fs");
const path_1 = require("path");
const main_1 = require("vamtiger-argv/build/main");
const __1 = require("..");
const log_1 = require("../log");
const types_1 = require("../types");
const workingDirectory = process.cwd();
const args = new main_1.default();
const relativePath = args.has(types_1.CommandlineArgs.relativePath);
const entryFilePath = args.has(types_1.CommandlineArgs.entryFilePath) && (relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.entryFilePath))
    ||
        args.get(types_1.CommandlineArgs.entryFilePath))
    || '';
const entryFolder = args.has(types_1.CommandlineArgs.entryFolder) && (relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.entryFolder))
    ||
        args.get(types_1.CommandlineArgs.entryFolder));
const entryFolderPath = entryFilePath && path_1.dirname(entryFilePath) || '';
const bundleFilePath = relativePath &&
    path_1.resolve(workingDirectory, args.get(types_1.CommandlineArgs.bundleFilePath))
    ||
        args.get(types_1.CommandlineArgs.bundleFilePath);
const copyBundleFilePath = args.get(types_1.CommandlineArgs.copyBundleFilePath);
const json = args.has(types_1.CommandlineArgs.json);
const watch = args.has(types_1.CommandlineArgs.watch);
const watchOptions = {
    recursive: true
};
const bundleHtmlParams = {
    entryFilePath,
    entryFolderPath,
    bundleFilePath,
    copyBundleFilePath,
    json
};
if (!bundleFilePath) {
    throw new Error(types_1.ErrorMessage.noBundleFile);
}
else if (watch && entryFolderPath) {
    fs_1.watch(entryFolderPath, watchOptions, createBundle);
}
else {
    createBundle();
}
function createBundle(eventType, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileType = fileName && path_1.extname(fileName)
            .substring(1)
            .toLowerCase();
        const logParams = eventType && fileName && {
            eventType,
            fileName
        };
        const generateHtmlBundle = (!eventType && !fileName)
            ||
                fileType === types_1.FileExtension.html;
        if (logParams) {
            log_1.default(logParams);
        }
        if (generateHtmlBundle) {
            yield __1.default(bundleHtmlParams);
        }
    });
}
//# sourceMappingURL=index.js.map