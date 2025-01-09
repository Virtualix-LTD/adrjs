import fs from 'fs';
import { countRecords, formatDate, formatIndex, genFileName, joinArrayIntoString, readFolderLocation } from './util';
import { DECISION_TEMPLATE } from './templates';
import { spawnSync } from 'child_process';

type DecisionDocument = {
	index: number;
	filename: string;
	title: string;
}

export function _createRecord(argv: string[], adrLocation: string): DecisionDocument {
	const index = countRecords(adrLocation) + 1;
	const title = joinArrayIntoString(argv);
	const filename = genFileName(index, title);

	return {
		index,
		title,
		filename,
	};
}

export function createRecord() {
	const adrLocation = readFolderLocation();

	const { index, title, filename } = _createRecord(process.argv, adrLocation);

	fs.writeFileSync(`${adrLocation}/${filename}`, compileTemplate(index, title), { encoding: 'utf-8' });

	spawnSync(`eval $EDITOR ${adrLocation}/${filename}`);
}

function compileTemplate(index: number, title: string, date = new Date()) {
	return DECISION_TEMPLATE
		.replace('{{NUMBER}}', formatIndex(index))
		.replace('{{TITLE}}', title)
		.replace('{{DATE}}', formatDate(date));
}
