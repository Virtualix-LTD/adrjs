import { formatDate, formatIndex, getFilePaths, getMetadataFromFile, readFolderLocation } from './util';
import { DecisionDocument } from './new';
import { TOC_TEMPLATE } from './templates';

const toMarkdownLink = ({ title, filename }: DecisionDocument) =>
	`[${title}](${filename})`;

const toList = (decision: DecisionDocument) => {
	const { date, index } = decision;
	return `* ${formatDate(date)} ${formatIndex(index)} - ${toMarkdownLink(decision)}`;
};

export function doTOC() {
	const adrLocation = readFolderLocation();
	console.log(`fp: ${getFilePaths(adrLocation)}`)
	const decisions = getFilePaths(adrLocation)
		.map(file => getMetadataFromFile(file, adrLocation))
		.map(decision => toList(decision))
		.join('\n');

	console.log(TOC_TEMPLATE.replace('{{TOC}}', decisions));
}
