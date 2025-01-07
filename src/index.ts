#!/usr/bin/env node
import {printInvalidCommand} from "./util";
import {initProject} from "./init";
import {createRecord} from "./new";

const commands = [
	"init",
	"new",
]

const commandArg = process.argv[2]?.trim().toLocaleLowerCase();

switch (commandArg) {
	case "init":
		initProject();
		break;
	case "new":
		createRecord();
		break;
	default:
		printInvalidCommand(commands);
		process.exit(1)
}

