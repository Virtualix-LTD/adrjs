#!/usr/bin/env node
import {COMMANDS, printInvalidCommand} from "./util";
import {initProject} from "./init";
import {createRecord} from "./new";
import {getVersion} from "./version";

const commands: COMMANDS[] = [
	"init",
	"new",
	"version",
]

const commandArg = process.argv[2]?.trim().toLocaleLowerCase();

switch (commandArg) {
	case "init":
		initProject();
		break;
	case "new":
		createRecord();
		break;
	case "version":
		getVersion();
		break;
	default:
		printInvalidCommand(commands);
		process.exit(1)
}

