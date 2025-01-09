#!/usr/bin/env node
const fs = require("fs");

fs.rmSync("build", {recursive: true});
