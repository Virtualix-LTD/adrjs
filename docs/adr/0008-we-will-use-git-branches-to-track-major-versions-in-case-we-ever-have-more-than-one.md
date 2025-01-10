# 0008. We will use git branches to track major versions in case we ever have more than one

Date: 2025-01-07

## Status

Accepted

## Context
We might (conceivably) need to maintain multiple major versions, and we need a
way to continue to provide fixes for old versions. This cannot happen easily of
all major versions live on the `master` branch.

## Decision
The new major version will stay on `master`. The previous major version will be
moved into it's own `versionN` branch, so that fixes can be applied for that
version.

## Consequences
None.
