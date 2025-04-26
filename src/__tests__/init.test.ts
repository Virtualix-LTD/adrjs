import { _initParseArgv } from '../init';

describe(_initParseArgv.name, () => {
	it('should recognise the help flag', () => {
		const argvGood1 = ['', '', '', '-h'];
		const argvGood2 = ['', '', '', '-H'];
		const argvGood3 = ['', '', '', '--help'];
		const argvGood4 = ['', '', '', '  --hElP '];
		const argvBad5 = ['', '', '', '-help'];
		const argvBad6 = ['', '', '', '--h'];

		expect(_initParseArgv(argvGood1).showHelp).toEqual(true);
		expect(_initParseArgv(argvGood2).showHelp).toEqual(true);
		expect(_initParseArgv(argvGood3).showHelp).toEqual(true);
		expect(_initParseArgv(argvGood4).showHelp).toEqual(true);
		expect(_initParseArgv(argvBad5).showHelp).toEqual(false);
		expect(_initParseArgv(argvBad6).showHelp).toEqual(false);
	});

	it('should return a default value for path', () => {
		const argv: string[] = [];

		expect(_initParseArgv(argv).path).toEqual('docs/adr');
	});

	it('should trim a given value for a path', () => {
		const argv = ['', '', '', ' /this/is/the/path '];

		expect(_initParseArgv(argv).path).toEqual('/this/is/the/path');
	});

	it('should detect trailing arguments', () => {
		const argvTrue: string[] = ['', '', '', '', 'foo'];
		const argvFalse1: string[] = ['', '', '', ''];
		const argvFalse2: string[] = ['', '', '', '', ''];

		expect(_initParseArgv(argvTrue).hasTrailingArgs).toEqual(true);
		expect(_initParseArgv(argvFalse1).hasTrailingArgs).toEqual(false);
		expect(_initParseArgv(argvFalse2).hasTrailingArgs).toEqual(false);
	});
});
