#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting npm build process..."

# Navigate to workspace root
cd ../..

echo "📦 Installing dependencies with npm..."
npm install

echo "🔨 Building strava-api-types package..."
cd packages/strava-api-types
npm run build
cd ../..

echo "🏗️ Building API..."
cd apps/api
npm run build

echo "✅ Build completed successfully!" 