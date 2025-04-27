# 0013. We will not update the package version from Github Workflows

Date: 2025-04-27

## Status

Accepted

## Context
We need to automate publishing this NPM package. This is tracked
in [issue #13](https://github.com/Virtualix-LTD/adrjs/issues/13).

## Decision
The package version will NOT be updated by the Workflow action. The package
version will be updated in package.json and checked in normally.

The workflow will be triggered manually.

## Consequences
The workflow will not commit changes to the repo and we will not need to
worry about write credentials.
