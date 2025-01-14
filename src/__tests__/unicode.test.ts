import {
	currencySymbols,
	uniIPAExtensions,
	uniLatin1Supplement,
	uniLatinExtended_A,
	uniLatinExtended_B,
} from './_fixtures';
import { genFileName } from '../util';

const prepareTest = (str: string) => [
	`0001-${str.toLocaleLowerCase('en-GB')}.md`,
	genFileName(1, str),
];

describe('Unicode ranges', () => {
	xit('should handle currency symbols', () => {
		const [expected, result] = prepareTest(currencySymbols);
		expect(result).toEqual(expected);
	});

	it('should handle Latin-1 Supplement', () => {
		const [expected, result] = prepareTest(uniLatin1Supplement);
		expect(result).toEqual(expected);
	});

	it('should handle Latin Extended-A', () => {
		const [expected, result] = prepareTest(uniLatinExtended_A);
		expect(result).toEqual(expected);
	});

	it('should handle Latin Extended-B', () => {
		const [expected, result] = prepareTest(uniLatinExtended_B);
		expect(result).toEqual(expected);
	});

	it('should handle IPA Extensions', () => {
		const [expected, result] = prepareTest(uniIPAExtensions);
		expect(result).toEqual(expected);
	});
});
