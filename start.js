#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Schedule Manager Backend...');

// Change to backend directory
process.chdir(path.join(__dirname, 'backend'));

// Wait for database to be ready
function waitForDatabase(retries = 30) {
  return new Promise((resolve) => {
    console.log(`⏳ Waiting for database... (${retries} retries left)`);

    const testConnection = spawn('npm', ['run', 'migrate'], {
      stdio: 'pipe',
      shell: true
    });

    testConnection.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Database is ready and migrations completed');
        resolve(true);
      } else if (retries > 0) {
        console.log('⏳ Database not ready, retrying in 2 seconds...');
        setTimeout(() => {
          waitForDatabase(retries - 1).then(resolve);
        }, 2000);
      } else {
        console.log('⚠️ Database connection failed, starting server anyway...');
        resolve(false);
      }
    });

    testConnection.on('error', (err) => {
      if (retries > 0) {
        console.log('⏳ Database connection error, retrying...');
        setTimeout(() => {
          waitForDatabase(retries - 1).then(resolve);
        }, 2000);
      } else {
        console.log('⚠️ Database connection failed, starting server anyway...');
        resolve(false);
      }
    });
  });
}

// Start the process
async function start() {
  // Wait for database
  await waitForDatabase();

  // Start the server
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
}

start().catch(err => {
  console.error('Startup error:', err);
  process.exit(1);
});
