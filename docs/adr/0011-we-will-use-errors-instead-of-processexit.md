# 0011. We will use Errors instead of process.exit

Date: 2025-01-10

## Status

Accepted

## Context
So far we have been using `console.error` and `process.exit` to show errors and
quit the tool.

## Decision
We will replace all occurrences of `process.exit` with throwing `Error`s.

## Consequences
It will be possible to test functions for exceptions.
