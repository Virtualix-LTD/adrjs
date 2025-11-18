import { formatDate, formatIndex, getFilePaths, getMetadataFromFile, readFolderLocation } from './util';
import { DecisionDocument } from './new';
import { TOC_TEMPLATE } from './templates';

const commandHelp=`Usage: generate [graph|toc]`;

const toMarkdownLink = ({ title, filename }: DecisionDocument) =>
	`[${title}](${filename})`;

const toTocEntry = (decision: DecisionDocument) => {
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
			console.log(doGraph(readFolderLocation()));
		default:
			throw new Error(`Not recognised: [${type}]\n\n${commandHelp}`)
	}
}

function sortdecisions(a: Pick<DecisionDocument, "index">, b: Pick<DecisionDocument, "index">) {
	return a.index - b.index;
}

export function doTOC(adrLocation: string) {

	const decisions = getFilePaths(adrLocation)
		.map(file => getMetadataFromFile(file, adrLocation))
		.map(decision => toTocEntry(decision))
		.join('\n')
		.trim();

	return TOC_TEMPLATE.replace('{{TOC}}', decisions);
}

export function _doGraphDocsArrows(decisions: Pick<DecisionDocument, "index">[]): string[] {
	return decisions
	  .sort(sortdecisions)
		.splice(1)
		.map(({index}) => `_${index - 1} -> _${index} [style="dotted", weight=1];`)
}

export function _doGraphDocs(decisions: Pick<DecisionDocument, "index" | "filename" | "title">[]) {
	const docs = decisions
		.sort(sortdecisions)
		.map(({index, filename, title}) => `_${index} [label="${title}"; URL="${filename}"];`)

		return docs;
}

function _doGraphLinks(decisions: Pick<DecisionDocument, "index" | "flags">[]): string[] {
	return decisions.map(({index, flags})=>flags
		.map(({flag, index: targetIndex}) => `_${index} -> _${targetIndex} [label="${flag}, weight=0"]`))
		.flat()
}

export function _doGraph(decisions: DecisionDocument[]) {
	const graph=_doGraphDocs(decisions).join("\n").trim();
	const graphArrows=_doGraphDocsArrows(decisions).join("\n").trim();
	const links=_doGraphLinks(decisions).join("\n").trim();

	return "digraph {\nnode [shape=plaintext];\nsubgraph {\n" + graph + "\n" + graphArrows + "}" + links +"}"
}

export function doGraph(adrLocation: string) {
	const decisions = getFilePaths(adrLocation)
		.map(file => getMetadataFromFile(file, adrLocation));

	return _doGraph(decisions);
}
