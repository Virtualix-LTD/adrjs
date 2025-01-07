export type COMMANDS = "init" | "add";

export const CONFIG_FILE = ".adr-dir"

export function printInvalidCommand(validCommands: string[]) {
	console.error(`Invalid command. The list of valid commands is ${validCommands}.
Run each of them with -h to get the help page.`)
}

export function printHelp(page: COMMANDS) {
	const initText = `
NAME
    npx adr init - Initialises a folder which will hold your Architecture
                   Decision Records.

SYNOPSIS
    npx adr init PATH

DESCRIPTION
    A textual description of the functioning of the command or function.

EXAMPLES
    npx adr init docs/adr
        Initialises an adr database under 'docs/adr'

    npx adr init "docs/path with spaces"
        Initialises an adr database under '"docs/path with spaces"'

EXIT STATUS
    0 - Successful program execution.
    1 - Usage or syntax error.

SEE ALSO
    npx adr add
BUGS
    List known bugs.
AUTHOR
   Tony Klinakis, for Virtualix LTD.
COPYRIGHT
    (c) 2025 MIT
`

	switch (page) {
		case "init":
			console.log(initText);
			return;
		default:
			console.error("foo");

	}
}
