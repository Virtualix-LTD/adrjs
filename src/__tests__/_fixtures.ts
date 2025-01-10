export const renderedDecision = `# 0005. We will make this tool compatible with the adr-tools interface in v1

Date: 2025-01-07

## Status

Accepted

## Context
How do we decide what features, and therefore, what interface we should adopt
for this tool? This tool was not written in a vacuum. Many implementations exist
and are used in production already.

## Decision
For major version 1, we will adopt the interface and features of
[npryce/adr-tools][1]. Any breaks from the interface will happen on a new major
version.

## Consequences
This limits and sets the scope of what this tool sets out to achieve.

We cannot deviate too much from the established interface of adr-tools.

We are backwards-compatible with existing users of adr-tools.


[1]: https://github.com/npryce/adr-tools
`;
