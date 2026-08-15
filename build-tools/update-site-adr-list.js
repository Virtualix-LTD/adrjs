#!/usr/bin/env node

/*
Builds the list of ADRs that we display on the website
https://virtualix-ltd.github.io/adrjs/
Usage:
./build-tools/update-site-adr-list.js > docs/_data/adr.yaml
*/

const fs = require('fs');

const dir="docs/adr"
const regex=/# \d{1,4}\. (.*)$/;

fs.readdirSync(dir)
	.filter(fname => fname.endsWith(".md"))
	.forEach((fname, i) => {
		const firstline = fs.readFileSync(`${dir}/${fname}`, {encoding: 'utf-8'}).trim().split("\n").splice(0, 1)


		const [_, title]=regex.exec(firstline)
		console.log(
			`- title: ${title}
  url: adr/${fname.split('.')[0]}`)
	})
