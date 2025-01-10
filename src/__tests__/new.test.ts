import { countRecords, getFlags, getFlagsType } from '../util';
import { _createRecord, DecisionDocument } from '../new';

const EMPTY_DIR = `${__dirname}/deliberatelyEmptyFolder`;

describe(getFlags.name, () => {
	it('should return the array if no flags exist', () => {
		const input = ['foo', 'bar', ''];
		const expected = { args: ['foo', 'bar', ''], flags: [] };
		const result = getFlags(input);
		expect(result).toEqual(expected);
	});

	it('should return flags if there are only flags', function() {
		const input = '-a 4 -s 4'.split(' ');
		const expected: getFlagsType = {
			args: [],
			flags: [{
				index: 4,
				flag: 'amend',
			}, {
				index: 4,
				flag: 'supersede',
			},
			],
		};

		const result = getFlags(input);

		expect(result).toEqual(expected);
	});

	it('should return no flags and no args on an empty array', function() {
		const expected = { args: [], flags: [] };
		const result = getFlags([]);

		expect(result).toEqual(expected);
	});

	it('should understand a mix of flags and title elements', function() {
		//TODO this is wrong but it's the current behaviour, so we document it
		const expected: getFlagsType = {
			args: 'first second third'.split(' '),
			flags: [{
				index: 4,
				flag: 'amend',
			}, {
				index: 4,
				flag: 'supersede',
			},
			],
		};

		const input = 'first -a 4 second -s 4 third'.split(' ');
		const result = getFlags(input);
		expect(result).toEqual(expected);
	});

	it('should understand indices with leading zeros', function() {
		const expected: getFlagsType = {
			args: 'first second third'.split(' '),
			flags: [{
				index: 4,
				flag: 'amend',
			}, {
				index: 4,
				flag: 'supersede',
			},
			],
		};
		const input = 'first -a 4 second -s 000000004 third'.split(' ');
		const result = getFlags(input);
		expect(result).toEqual(expected);
	});
});

describe(_createRecord.name, () => {
	it('should create a record from argv', function() {
		const expected: DecisionDocument = {
			index: 1,
			title: 'We will do Things with Mixed-Capitals -foo',
			filename: '0001-we-will-do-things-with-mixedcapitals-foo.md',
		};

		const argv = 'npx adrjs new We will do Things with Mixed-Capitals -foo'.split(' ');
		const result = _createRecord(argv, EMPTY_DIR);
		expect(result).toEqual(expected);
	});
});

describe(countRecords.name, () => {
	it('should expect an empty directory to be 0', () => {
		const result = countRecords(EMPTY_DIR);
		expect(result).toEqual(0);
	});
});
