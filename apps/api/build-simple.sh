#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting simple build process..."

# Install dependencies in current directory
echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

# Build the strava-api-types package first
echo "🔨 Building strava-api-types package..."
cd ../../packages/strava-api-types
pnpm install --frozen-lockfile
pnpm build
cd ../../apps/api

# Build the API
echo "🏗️ Building API..."
pnpm build

echo "✅ Build completed successfully!" 