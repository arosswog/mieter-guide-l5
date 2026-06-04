#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lese package.json für die Version
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8')
);

const version = packageJson.version;
const buildDate = new Date().toISOString();

// Setze Environment-Variablen
process.env.NEXT_PUBLIC_BUILD_VERSION = version;
process.env.NEXT_PUBLIC_BUILD_DATE = buildDate;

console.log(`Build Info: Version ${version}, Built at ${buildDate}`);

// Starte den Next.js Build
const { execSync } = require('child_process');
try {
  execSync('next build', { stdio: 'inherit' });
} catch (error) {
  process.exit(1);
}
