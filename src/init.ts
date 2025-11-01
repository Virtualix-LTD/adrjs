import fs from 'fs';
import { argv } from 'node:process';
import { CONFIG_FILE, EXEC_NAME, formatDate, formatIndex, formatIndexInDoc, printHelp } from './util';

const trailingArgumentsError = `
There are trailing arguments at the end of this command.
\`init\` accepts a PATH argument only. Run \`init -h\` for more
details.

This command will now exit.
`;

const firstDocument = `
# ${formatIndexInDoc(1)}. We will record architecture decisions

Date: ${formatDate(new Date())}

## Status

Accepted

## Context

We need to record the architectural decisions made on this project.

## Decision

We will use Architecture Decision Records, as described by Michael Nygard in
this article:
http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions

## Consequences

See Michael Nygard's article, linked above.

You can use a range of CLI tools to create and manage ADR records:
* adrjs - \`npx adrjs\`
* adrtools - https://github.com/npryce/adr-tools
`

type InitArgs = {
	path?: string;
	showHelp: boolean;
	hasTrailingArgs: boolean;
}

export function _initParseArgv(argv: string[]): InitArgs {
	const arg3 = argv[3]?.trim();
	const showHelp = arg3?.toLocaleLowerCase() === '-h' || arg3?.toLocaleLowerCase() === '--help';
	const hasTrailingArgs = !!argv[4];
	const path = showHelp ? undefined : (arg3 || 'doc/adr');

	return {
		path,
		showHelp,
		hasTrailingArgs,
	};
}

export function initProject() {
	const { showHelp, hasTrailingArgs, path } = _initParseArgv(argv);

	if (showHelp) {
		printHelp('init');
		return;
	}

	if (!path || path === '') {
		throw new Error(`Missing PATH argument. \`npx ${EXEC_NAME} init -h\` for details.`);
	}

	if (hasTrailingArgs) {
		throw new Error(trailingArgumentsError);
	}

	const firstDocumentPath=`${path}/${formatIndex(1)}-we-will-record-architecture-decisions.md`;

	fs.mkdirSync(path, { recursive: true });
	fs.writeFileSync(CONFIG_FILE, path);
	fs.writeFileSync(firstDocumentPath, firstDocument);
}
