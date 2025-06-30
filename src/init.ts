import { argv } from 'node:process';
import { CONFIG_FILE, EXEC_NAME, printHelp } from './util';
import fs from 'fs';

const trailingArgumentsError = `
There are trailing arguments at the end of this command.
\`init\` accepts a PATH argument only. Run \`init -h\` for more
details.

This command will now exit.
`;

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

	fs.mkdirSync(path, { recursive: true });
	fs.writeFileSync(CONFIG_FILE, path);
}
