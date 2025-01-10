import { argv } from 'node:process';
import { CONFIG_FILE, printHelp } from './util';
import fs from 'fs';

const trailingArgumentsError = `
There are trailing arguments at the end of this command.
\`init\` accepts a PATH argument only. Run \`init -h\` for more
details.

This command will now exit.
`;

export function initProject() {
	const path = argv[3];

	if (path === '-h' || path === '--help') {
		printHelp('init');
	}

	if (!path || path === '') {
		throw new Error('Missing PATH argument. `npx adr init -h` for details.')
	}

	if (argv[4]) {
		throw new Error(trailingArgumentsError);
	}

	// argv.forEach((v,i) => console.log(`${i}: ${v}`))
	fs.mkdirSync(path, { recursive: true });
	fs.writeFileSync(CONFIG_FILE, path);
}

