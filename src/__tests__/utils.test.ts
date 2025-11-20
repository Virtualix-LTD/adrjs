import { DecisionDocument } from '../new';
import { _getFilePaths, genFileName, getMetadataFromContent } from '../util';
import { renderedDecision, renderedDecisionSupercedes } from './_fixtures';

describe(genFileName.name, () => {
	it('should replace spaces with dashes and lowercase', () => {
		const input = 'We will foo';
		const expected = '0005-we-will-foo.md';
		const result = genFileName(5, input);
		expect(result).toEqual(expected);
	});

	it('should keep accented characters', () => {
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
			flags: [],
		};
		const result = getMetadataFromContent(renderedDecision);
		expect(result).toEqual(expected);
	});

	it("should extract metadata and links to other decisions", () => {
		const expected: Pick<DecisionDocument, "index" | "title" | "date" | "flags">= {
			title:"amends the fourth decision",
			index: 10,
			date: new Date('2025-11-20'),
			flags: [
				{
					flag: 'amend',
					index: 4,
				}
			],
		};
		const result = getMetadataFromContent(renderedDecisionSupercedes);
		expect(result).toEqual(expected);
	})
});

describe(_getFilePaths.name, () => {
	const filenames = [
		'0001-we-will use the mit license.md',
		'0002-we-will not use external dependencies as much as possible.md',
		'0003-we-will use semantic versioning.md',
		'0004-we-will-use-iso8601-for-dates.md',
		'0005-we-will-make-this-tool-compatible-with-the-adrtools-interface-in-v1.md',
		'0006-we-will-rename-this-tool-to-adrjs.md',
		'0007-we-will-use-git-tags-to-mark-releases.md',
		'0008-we-will-use-git-branches-to-track-major-versions-in-case-we-ever-have-more-than-one.md',
		'0009-we-will-keep-this-tool-compatible-with-the-three-major-operating-systems.md',
		'0010-we-will-use-utf8-everywhere.md',
		'0011-we-will-use-errors-instead-of-processexit.md',
		'0012-we-will-adopt-the-anticode-code-of-conduct.md',
		'0013-we-will-use-docopt-to-describe-our-cli-options.md',
	];

	it('should correctly parse valid filenames', function() {
		const input = [
			...filenames,
			'foo', ' ', '.', '\n',
		];

		expect(_getFilePaths(input)).toEqual(filenames);
	});
});
