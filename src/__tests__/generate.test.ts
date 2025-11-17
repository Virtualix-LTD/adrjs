import {doGenerate, doTOC} from "../generate";

const EMPTY_DIR = `${__dirname}/deliberatelyEmptyFolder`;
const TEST_DIR = `${__dirname}/testAdrDir`;

describe(doGenerate.name, () =>{
	it("should throw if arguments are not 'toc' or 'graph'", () => {
		const expected="Not recognised: [foo]\n\nUsage: generate [graph|toc]"
		const fn = () => doGenerate(['foo']);

		expect(fn).toThrow(expected);
	})

	it("should throw if no arguments are given", () => {
		const expected="Usage: generate [graph|toc]"
		const fn = () => doGenerate([]);

		expect(fn).toThrow(expected);
	})
})

describe(doTOC.name, () => {
	it("should work with an empty directory", () => {
		const expected = "# Architecture Decision Records\n\n";
		const result = doTOC(EMPTY_DIR);

		expect(result).toEqual(expected);
	})

	it("should generate a toc", () => {
		const result = doTOC(TEST_DIR);
		const expected = `# Architecture Decision Records

* 2025-01-07 0001 - [We will use the MIT license](0001-we-will-use-the-mit-license.md)
* 2025-01-07 0002 - [We will not use external dependencies as much as possible](0002-we-will-not-use-external-dependencies-as-much-as-possible.md)
* 2025-01-07 0003 - [We will use semantic versioning](0003-we-will-use-semantic-versioning.md)`;

		expect(result).toEqual(expected);
	})
})
