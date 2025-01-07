# 0007. We will use git tags to mark releases

Date: 2025-01-07

## Status

Accepted

## Context
We need an easy way to navigate npmjs releases from git

## Decision
We will tag release versions with `vM.m.p` (Major, minor, patch) or as
appropriate. We will not use git tags before `v1.0.0` because we don't need to.

## Consequences
