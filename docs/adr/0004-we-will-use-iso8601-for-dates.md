# 0004. We will use ISO-8601 for dates

Date: 2025-01-07

## Status

Accepted

## Context
We need to document the date format in use. We need to avoid confusion over
DD-MM-YYYY and MM-DD-YYYY conventions as used in different countries, and we
need to make obvious what the date format is.

## Decision
We will use the ISO-8601 standard to represent dates in decision documents. The
format is specified in <https://www.iso.org/iso-8601-date-and-time-format.html>
and boils down to `YYYY-MM-DD`.

## Consequences
Locale-specific conventions will not be respected if they contravene the ISO
standard, and most locales do. The ISO-8601 format however is meant to be
understood internationally.
