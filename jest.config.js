/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
	"roots": ["src"],
  testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
  },
};
