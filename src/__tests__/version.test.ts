import { execSync } from 'child_process';

function exec(command: string) {
	return execSync(command, { encoding: 'utf-8' });
}


describe('version', () => {
	it('should print the current version when invoked with the "version" command', () => {
		const stdout = exec('npx . version').trim();

		expect(stdout).toEqual('VERSION_REPLACE');
	});
});
