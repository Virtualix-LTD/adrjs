import {_doGraph, _doGraphDocs, _doGraphDocsArrows, doGenerate, doGraph, doTOC} from "../generate";

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
* 2025-01-07 0003 - [We will use semantic versioning](0003-we-will-use-semantic-versioning.md)
* 2025-11-18 0004 - [supersedes 1](0004-supersedes-1.md)
* 2025-11-18 0005 - [Links to second decision](0005-links-to-second-decision.md)
* 2025-11-18 0006 - [Links to first decision](0006-links-to-first-decision.md)
* 2025-11-18 0007 - [Links to first decision](0007-links-to-first-decision.md)
* 2025-11-20 0008 - [-l 1 links to the first decision](0008-l-1-links-to-the-first-decision.md)
* 2025-11-20 0009 - [supercedes the third decision](0009-supercedes-the-third-decision.md)
* 2025-11-20 0010 - [amends the fourth decision](0010-amends-the-fourth-decision.md)`;

		expect(result).toEqual(expected);
	})
})

describe(doGraph.name, () => {
	it("should generate a graph", () => {
		const expected=`digraph {
node [shape=plaintext];
subgraph {
_1 [label="We will use the MIT license"; URL="0001-we-will-use-the-mit-license.md"];
_2 [label="We will not use external dependencies as much as possible"; URL="0002-we-will-not-use-external-dependencies-as-much-as-possible.md"];
_3 [label="We will use semantic versioning"; URL="0003-we-will-use-semantic-versioning.md"];
_4 [label="supersedes 1"; URL="0004-supersedes-1.md"];
_5 [label="Links to second decision"; URL="0005-links-to-second-decision.md"];
_6 [label="Links to first decision"; URL="0006-links-to-first-decision.md"];
_7 [label="Links to first decision"; URL="0007-links-to-first-decision.md"];
_8 [label="-l 1 links to the first decision"; URL="0008-l-1-links-to-the-first-decision.md"];
_9 [label="supercedes the third decision"; URL="0009-supercedes-the-third-decision.md"];
_10 [label="amends the fourth decision"; URL="0010-amends-the-fourth-decision.md"];
_1 -> _2 [style="dotted", weight=1];
_2 -> _3 [style="dotted", weight=1];
_3 -> _4 [style="dotted", weight=1];
_4 -> _5 [style="dotted", weight=1];
_5 -> _6 [style="dotted", weight=1];
_6 -> _7 [style="dotted", weight=1];
_7 -> _8 [style="dotted", weight=1];
_8 -> _9 [style="dotted", weight=1];
_9 -> _10 [style="dotted", weight=1];}
_9 -> _3 [label="supersedes", weight="0"]
_10 -> _4 [label="amends", weight="0"]}`;
		const result = doGraph(TEST_DIR);

		expect(result).toEqual(expected);
	})

	describe(_doGraphDocs.name, () =>{
		it("should generate an empty array for an empty input", () =>{
			const expected: string[] = [];
			const result = _doGraphDocs([]);

			expect(result).toEqual(expected);
		});
	})

	describe(_doGraphDocsArrows.name, () => {
		it("should generate an empty array for an empty input", () => {
			const expected: string[] = [];
			const result = _doGraphDocsArrows([]);

			expect(result).toEqual(expected);
		})

		it("should generate an empty array for a single entry", () => {
			const expected: string[] = [];
			const result = _doGraphDocsArrows([{index: 1}]);

			expect(result).toEqual(expected);
		})

		it("should generate an empty array for a single entry", () => {
			const expected: string[] = [];
			const result = _doGraphDocsArrows([{index: 1}]);

			expect(result).toEqual(expected);
		})

		it("should generate a single link for an array of 2 elements", () => {
			const expected: string[] = ["_1 -> _2 [style=\"dotted\", weight=1];",];
			const result = _doGraphDocsArrows([{index: 2}, {index: 1}]);

			expect(result.length).toEqual(1);
			expect(result).toEqual(expected);
		})

		it("should work with an odd number of elements", () => {
			const expected: string[] = [
				"_1 -> _2 [style=\"dotted\", weight=1];",
				"_2 -> _3 [style=\"dotted\", weight=1];",
			];
			const result = _doGraphDocsArrows([{index: 2}, {index: 1}, {index: 3}]);

			expect(result.length).toEqual(2);
			expect(result).toEqual(expected);
		})
	})

	it("should generate a graph for an empty dir", () => {
		const expected=`digraph {
node [shape=plaintext];
subgraph {

}}`;
		const result = _doGraph([]);
		expect(result).toEqual(expected);
	})
});
