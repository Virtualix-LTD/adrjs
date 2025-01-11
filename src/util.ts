import fs from 'fs';

export type COMMANDS = 'init' | 'new' | 'version';

export const CONFIG_FILE = '.adr-dir';

export function printInvalidCommand(validCommands: string[]) {
	console.error(`Invalid command. The list of valid commands is ${validCommands}.
Run each of them with -h to get the help page.`);
}

export function printHelp(page: COMMANDS) {
	const initText = `
NAME
    npx adrjs init - Initialises a folder which will hold your Architecture
                   Decision Records.

SYNOPSIS
    npx adrjs init PATH

DESCRIPTION
    A textual description of the functioning of the command or function.

EXAMPLES
    npx adrjs init docs/adr
        Initialises an adr database under 'docs/adr'

    npx adrjs init "docs/path with spaces"
        Initialises an adr database under '"docs/path with spaces"'

EXIT STATUS
    0 - Successful program execution.
    1 - Usage or syntax error.

SEE ALSO
    npx adrjs new
BUGS
    List known bugs.
AUTHOR
   Tony Klinakis, for Virtualix LTD.
COPYRIGHT
    (c) 2025 MIT
`;

	switch (page) {
		case 'init':
			console.log(initText);
			return;
		default:
			console.error('foo');

	}
}

type Flag = 'amend' | 'supersede';

export type ChangeFlag = {
	flag: Flag;
	index: number;
}

export type getFlagsType = {
	flags: ChangeFlag[];
	args: string[];
}

function getFlagType(str: string): Flag | undefined {
	switch (str) {
		case '-a':
			return 'amend';
		case '-s':
			return 'supersede';
		default:
			return undefined;
	}
}

export function getFlags(arr: string[]): getFlagsType {
	const flags: ChangeFlag[] = [];
	const rest: string[] = [];

	for (let i = 0; i < arr.length; i++) {
		const flagType: Flag | undefined = getFlagType(arr[i]);

		// console.log(`Considering ${arr[i]}`);

		if (flagType === undefined) {
			rest.push(arr[i]);
			// console.log(`${i} No flag type`);
			continue;
		}

		if (i + 1 >= arr.length) {
			throw new Error(`Parameter ${i - 1} (the ${arr[-1]} flag) is missing a value (expecting a number).`);
		}

		i++;

		const index = Number(arr[i]);

		if (isNaN(index)) {
			throw new Error(`Parameter ${i - 1} (after ${arr[-1]} flag) is not a number: Expected a number.`);
		}

		flags.push({
			flag: flagType,
			index,
		});


	}
	return { flags, args: rest };
}

export function readFolderLocation() {
	return fs.readFileSync(CONFIG_FILE, { encoding: 'utf-8' }).trim();
}

export function formatDate(date: Date) {
	const month = `${(date.getMonth() + 1)}`.padStart(2, '0');
	const day = `${date.getDate()}`.padStart(2, '0');
	return `${date.getFullYear()}-${month}-${day}`;
}

export function formatIndex(index: number) {
	return `${index}`.padStart(4, '0');
}

export function countRecords(adrLocation: string): number {
	return fs.readdirSync(adrLocation)
		// ignore dotfiles
		.filter(path => path.indexOf('.') !== 0)
		.length;
}

export function genFileName(index: number, title: string) {
	const filename = title
		.replace(/[^A-zÀ-ú\d\s]+/gi, '')
		.trim()
		.replace(/\s+/g, '-')
		.toLocaleLowerCase();
	return `${formatIndex(index)}-${filename}.md`;
}

export function getMetadataFromContent(content: string) {
	const match = /#\s*(\d+)\. (.*)\s*Date:\s+(\d{4}-\d{2}-\d{2})/gm.exec(content);
	if (!match) {
		throw new Error('Cannot find match');
	}

	const [_, index, title, date] = match;
	return { index: Number(index), title, date: new Date(date) };
}

export function getFileContents(filename: string, folder: string): string {
	return fs.readFileSync(`${folder}/${filename}`, { encoding: 'utf-8' });
}

export function writeFile(filename: string, folder: string, content: string) {
	fs.writeFileSync(`${folder}/${filename}`, content, { encoding: 'utf-8' });
}

