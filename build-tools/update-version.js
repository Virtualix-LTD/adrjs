#!/usr/bin/env node
const fs = require("fs");

const versionJsPath = "./build/version.js";
const {version} = JSON.parse(fs.readFileSync("package.json", "utf-8"));
const versionCommandCode = fs.readFileSync(versionJsPath, "utf-8");

const versionedCode = versionCommandCode.replace("VERSION_REPLACE", version);

fs.writeFileSync(versionJsPath, versionedCode);
