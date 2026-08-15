#!/usr/bin/env node
import { COMMANDS, printHelp, printInvalidCommand } from './util';
import { initProject } from './init';
import { createRecord } from './new';
import { getVersion } from './version';
import { doGenerate } from './generate';

const commands: COMMANDS[] = [
	'init',
	'new',
	'version',
];


function run() {
	const [commandArg, ...argv] = process.argv.slice(2);

	if (argv[0] === '-h') {
		printHelp(commandArg);
		return;
	}

	try {
		// noinspection ExceptionCaughtLocallyJS
		switch (commandArg) {
			case 'init':
				initProject();
				break;
			case 'new':
				createRecord(argv);
				break;
			case 'version':
				getVersion();
				break;
			case 'generate':
				doGenerate(argv);
				break;
			default:
				printInvalidCommand(commands);
				throw new Error();
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.error(e.message);
		} else {
			console.error(e);
		}
	}
}

run();
