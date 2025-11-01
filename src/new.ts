import fs from 'fs';
import {
	ChangeFlag,
	countRecords,
	formatDate,
	formatIndex,
	formatIndexInDoc,
	genFileName,
	getFileContents,
	getFlags,
	getMetadataFromContent,
	readFolderLocation,
	writeFile,
} from './util';
import { DECISION_TEMPLATE } from './templates';
import { spawnSync } from 'child_process';

export type DecisionDocument = {
	index: number;
	filename: string;
	title: string;
	flags: ChangeFlag[];
	date: Date;
}

export type PartialDecisionDocument = Pick<DecisionDocument, "title" | "filename" | "index">

export function _createRecord(argv: string[], adrLocation: string, date = new Date(Date.now())): DecisionDocument {
	const index = countRecords(adrLocation) + 1;
	const { flags, args } = getFlags(argv);
	const title = args.join(' ');
	const filename = genFileName(index, title);

	return {
		index,
		title,
		filename,
		flags,
		date,
	};
}

function getDecisionByIndex(index: number, adrLocation: string): DecisionDocument {
	const formattedIndex = formatIndex(index);
	const file = fs.readdirSync(adrLocation).find(location => location.indexOf(formattedIndex) === 0);

	if (!file) {
		console.error(`Cannot find decision number ${formattedIndex}. Exiting.`);
		process.exit(1);
	}

	const contents = fs.readFileSync(`${adrLocation}/${file}`, { encoding: 'utf-8' });
	const { title, date } = getMetadataFromContent(contents);

	return {
		index,
		filename: file,
		title,
		flags: [],
		date
	};
}

function compileFlagsTextActiveVoice(flags: ChangeFlag[], adrLocation: string) {
	const documents: [ChangeFlag, DecisionDocument][] = flags.map(changeFlag => [changeFlag, getDecisionByIndex(changeFlag.index, adrLocation)]);
	//TODO foo this bar
	return documents.map(([{ flag }, { index, filename, title }]) => {
		const verb = flag === 'amend' ? 'Amends' : 'Supersedes';
		return `* ${verb} [${formatIndex(index)} - ${title}](${filename})`;
	}).join('\n');
}

export function createRecord(argv: string[]) {
	const adrLocation = readFolderLocation();

	const { index, title, filename, flags } = _createRecord(argv, adrLocation);

	fs.writeFileSync(`${adrLocation}/${filename}`, compileTemplate(index, title, flags, adrLocation), { encoding: 'utf-8' });

	flags.forEach(({ index: oldIndex, flag }) => {
		updatePreviousDecision(oldIndex, { index, flag }, adrLocation);
	});

	spawnSync(`eval $EDITOR ${adrLocation}/${filename}`);
}

function compileTemplate(index: number, title: string, flags: ChangeFlag[], adrLocation: string, date = new Date()) {
	return DECISION_TEMPLATE
		.replace('{{NUMBER}}', formatIndexInDoc(index))
		.replace('{{TITLE}}', title)
		.replace('{{DATE}}', formatDate(date))
		.replace('{{AFFECTS}}', compileFlagsTextActiveVoice(flags, adrLocation))
		.replace(/^\n$/gm, '');
}

function updatePreviousDecision(index: number, { flag, index: changedBy }: ChangeFlag, adrLocation: string) {
	const { filename } = getDecisionByIndex(index, adrLocation);
	const {
		filename: changedByFilename,
		title,
	} = getDecisionByIndex(changedBy, adrLocation);

	const contents = getFileContents(filename, adrLocation);
	const [firstPart, secondPart] = contents.split('## Context');
	const verb = flag === 'amend' ? 'Amended By' : 'Superseded By';
	const line = formatLinkText(verb, { index: changedBy, filename: changedByFilename, title });

	const compiled = `${firstPart}${line}\n## Context${secondPart}`;
	writeFile(filename, adrLocation, compiled);
}

function formatLinkText(verb: string, { index, title, filename }: PartialDecisionDocument) {
	return `* ${verb} [${formatIndex(index)} - ${title}](${filename})\n`;
}
