import { execSync } from 'child_process';

function exec(command: string) {
	return execSync(command, { encoding: 'utf-8' });
}


xdescribe('version', () => {
	it('should print the current version when invoked with the "version" command', () => {
		const stdout = exec('npx . version').trim();

		// Note: This fails after npm pack or npm publish
		expect(stdout).toEqual('VERSION_REPLACE');
	});
});
