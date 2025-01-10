#!/usr/bin/env node
import { COMMANDS, printInvalidCommand } from './util';
import { initProject } from './init';
import { createRecord } from './new';
import { getVersion } from './version';

const commands: COMMANDS[] = [
	'init',
	'new',
	'version',
];


function run() {
	const commandArg = process.argv[2]?.trim().toLocaleLowerCase();

	try {
		// noinspection ExceptionCaughtLocallyJS
		switch (commandArg) {
			case 'init':
				initProject();
				break;
			case 'new':
				createRecord();
				break;
			case 'version':
				getVersion();
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
