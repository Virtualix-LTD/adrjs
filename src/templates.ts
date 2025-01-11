export const DECISION_TEMPLATE = `# {{NUMBER}}. {{TITLE}}

Date: {{DATE}}

## Status

Proposed | Accepted | Superseded

{{AFFECTS}}

## Context
The issue motivating this decision, and any context that influences or constrains the decision.

## Decision
The change that we're proposing or have agreed to implement.

## Consequences
What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
`;

export const initText = `
Usage: adrjs init ([-h | <path>)

-h  Show this screen.
`.trim();

export const newText = `
Usage: adrjs new [options] DECISION-TITLE

-h                                 Show this screen.
-a INDEX, --amend, --amends        Marks decision INDEX as amended by this
                                   decision. Marks this decision as amending
                                   decision INDEX.
-s INDEX, --supersede, supersedes  Marks decision INDEX as superseded by this
                                   decision. Marks this decision as superseding
                                   decision INDEX.
`.trim();

export const versionText = `
Usage: adrjs [-h] version

-h  Show this screen.
`.trim();

export const defaultText = `
Usage: adrjs [-h] (init|new|version)

-h  Show the help screen for each command.
`.trim();
