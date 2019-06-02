export interface MainParams {
    entryFilePath?: string;
    entryFolderPath?: string;
    bundleFilePath: string;
    copyBundleFilePath?: string;
    json?: boolean;
    ts?: boolean;
    ignore?: RegExp;
}

export interface LogParams {
    eventType: string;
    fileName: string;
}

export interface IGetHtml {
    entryFilePath?: string;
    entryFolderPath?: string;
    ignore?: RegExp;
}