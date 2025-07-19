#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Schedule Manager Backend (Simple Mode)...');

// Change to backend directory
process.chdir(path.join(__dirname, 'backend'));

// Start server directly - let Railway handle database readiness
console.log('🌟 Starting the server...');
const server = spawn('npm', ['start'], { 
  stdio: 'inherit',
  shell: true 
});

server.on('close', (serverCode) => {
  console.log(`Server exited with code ${serverCode}`);
  process.exit(serverCode);
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
