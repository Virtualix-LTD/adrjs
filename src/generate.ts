import { formatDate, formatIndex, getFilePaths, getMetadataFromFile, readFolderLocation } from './util';
import { DecisionDocument } from './new';
import { TOC_TEMPLATE } from './templates';

const commandHelp=`Usage: generate [graph|toc]`;

const toMarkdownLink = ({ title, filename }: DecisionDocument) =>
	`[${title}](${filename})`;

const toList = (decision: DecisionDocument) => {
	const { date, index } = decision;
	return `* ${formatDate(date)} ${formatIndex(index)} - ${toMarkdownLink(decision)}`;
};

export function doGenerate(argv: string[]) {
	if(argv.length === 0) {
		throw new Error(commandHelp)
	}

	if(argv.length > 1) {
		throw new Error(`Extra arguments after "${argv[0]}"`);
	}

	const type = argv[0].trim().toLocaleLowerCase();

	switch(type) {
		case "toc":
			console.log(doTOC(readFolderLocation()));
			break;

		case "graph":
			throw new Error("Not implemented yet");
		default:
			throw new Error(`Not recognised: [${type}]\n\n${commandHelp}`)
	}
}

export function doTOC(adrLocation: string) {

	const decisions = getFilePaths(adrLocation)
		.map(file => getMetadataFromFile(file, adrLocation))
		.map(decision => toList(decision))
		.join('\n');

	return TOC_TEMPLATE.replace('{{TOC}}', decisions);
}
