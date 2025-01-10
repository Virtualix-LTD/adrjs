import { genFileName, getMetadataFromContent } from '../util';
import { renderedDecision } from './_fixtures';

describe(genFileName.name, () => {
	it('should replace spaces with dashes and lowercase', () => {
		const input = 'We will foo';
		const expected = '0005-we-will-foo.md';
		const result = genFileName(5, input);
		expect(result).toEqual(expected);
	});

	xit('should keep accented characters', () => {
		const input = 'ĀÃȺ';
		const expected = '0001-āãⱥ.md';
		const result = genFileName(1, input);
		expect(result).toEqual(expected);
	});

	it('should keep underscores', () => {
		const input = 'We will _underscore__';
		const expected = '0001-we-will-_underscore__.md';
		const result = genFileName(1, input);
		expect(result).toEqual(expected);
	});

	it('should merge dashes and spaces into a single dash', () => {
		const input = 'We will -dash';
		const expected = '0001-we-will-dash.md';
		const result = genFileName(1, input);
		expect(result).toEqual(expected);
	});
});

describe(getMetadataFromContent, () => {

	it('should extract index, title, and date from contents', () => {
		const expected = {
			index: 5,
			title: 'We will make this tool compatible with the adr-tools interface in v1',
			date: new Date('2025-01-07'),
		};
		const result = getMetadataFromContent(renderedDecision);
		expect(result).toEqual(expected);
	});
});
