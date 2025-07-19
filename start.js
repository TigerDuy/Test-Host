#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Schedule Manager Backend...');

// Change to backend directory
process.chdir(path.join(__dirname, 'backend'));

// Run migrations first
console.log('📊 Running database migrations...');
const migrate = spawn('npm', ['run', 'migrate'], { 
  stdio: 'inherit',
  shell: true 
});

migrate.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Migrations completed successfully');
    
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
    
  } else {
    console.log('⚠️ Migrations failed, starting server anyway...');
    
    // Start server even if migrations fail (for first deploy)
    const server = spawn('npm', ['start'], { 
      stdio: 'inherit',
      shell: true 
    });
    
    server.on('close', (serverCode) => {
      process.exit(serverCode);
    });
  }
});

migrate.on('error', (err) => {
  console.error('Migration process error:', err);
  console.log('🌟 Starting server without migrations...');
  
  const server = spawn('npm', ['start'], { 
    stdio: 'inherit',
    shell: true 
  });
  
  server.on('close', (serverCode) => {
    process.exit(serverCode);
  });
});
