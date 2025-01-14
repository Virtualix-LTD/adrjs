#!/usr/bin/env node
const fs = require('fs');

try {
	fs.rmSync('build', { recursive: true });
} catch (e) {
	// ignore failures, usually due to dir not being present
}
