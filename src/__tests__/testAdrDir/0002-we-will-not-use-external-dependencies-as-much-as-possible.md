# 0002. We will not use external dependencies as much as possible

Date: 2025-01-07

## Status

Accepted

2 [5. Links to second decision](0005-links-to-second-decision.md)

## Context
We often have to decide between writing code ourselves and using an external
package. This package is meant to be distributed, and as such the size must be
kept to an appropriate minimum.

## Decision
We will not use dependencies, as much as possible. This does not apply to
devDependencies, which we will use freely as needed.

## Consequences

We will need to write and test more code ourselves. We will avoid having to deal
with security advisories as they are discovered in dependencies. We will keep
the distributed package size small. We will be forced to evaluate whether a
feature is a need or a want.
