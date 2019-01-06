# VAMTIGER Bundle HTML
[VAMTIGER Bundle HTML](https://github.com/vamtiger-project/vamtiger-bundle-html) bundles  HTML into a single compiled output file.

## Installation
[VAMTIGER Bundle HTML](https://github.com/vamtiger-project/vamtiger-bundle-html) can be installed using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/lang/en/):
```javascript
npm i --global vamtiger-bundle-html 
```
or
```javascript
yarn global vamtiger-bundle-html
```

## Usage
[VAMTIGER Bundle HTML](https://github.com/vamtiger-project/vamtiger-bundle-html) can bundle HTML to a single compiled output file:
```bash
vamtiger-bundle-html --entryFilePath absolute/path/source/index.html --bundleFilePath --bundleFilePath build/index.html
```

The **relativePath** option can be used to reference **entryFilePath** and **bundleFilePath** relative to the current working directory:
```bash
vamtiger-bundle-html --relativePath --entryFilePath absolute/path/source/index.html --bundleFilePath --bundleFilePath build/index.html
```

Referencing the **--bundleFilePath** with the **ts** extension will generate the bundle as a **Typescript** file:
```bash
vamtiger-bundle-html --relativePath --entryFilePath absolute/path/source/index.html --bundleFilePath --bundleFilePath build/index.ts
```

The **json** option can be added to generate compiled output in JSON format:
```bash
vamtiger-bundle-html --relativePath --entryFilePath source/index.html --bundleFilePath --bundleFilePath build/index.json --json
```

The **watch** option can be added to generate compiled output each time a source file is updated:
```bash
vamtiger-bundle-html --relativePath --entryFilePath source/index.html --bundleFilePath --bundleFilePath build/index.json --json --watch
```

The **copyBundleFilePath** option will copy the compiled output to a defined path:
```bash
vamtiger-bundle-html --relativePath --entryFilePath source/index.html --bundleFilePath --bundleFilePath build/index.json --json --watch --copyBundleFilePath absolute/path/index.json
```

[VAMTIGER Bundle HTML](https://github.com/vamtiger-project/vamtiger-bundle-html) can also be defined as a custom script:
```json
    ...
    scripts: {
        "bundle-css": "vamtiger-bundle-html --relativePath --entryFilePath source/index.css --bundleFilePath --bundleFilePath build/index.css",
        "watch": "vamtiger-bundle-html --relativePath --entryFilePath source/index.css --bundleFilePath --bundleFilePath build/index.css --watch"
    }
    ...
```