#!/bin/bash

# Start script for Railway deployment

echo "🚀 Starting Schedule Manager Backend..."

# Run database migrations
echo "📊 Running database migrations..."
npx knex migrate:latest

# Check if migrations were successful
if [ $? -eq 0 ]; then
    echo "✅ Database migrations completed successfully"
else
    echo "❌ Database migrations failed"
    exit 1
fi

# Start the application
echo "🌟 Starting the application..."
npm start
