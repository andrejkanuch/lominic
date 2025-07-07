#!/bin/bash

# Exit on any error
set -e

echo "🚀 Starting build process..."

# Navigate to workspace root
cd ../..

echo "📦 Installing dependencies..."
pnpm install --frozen-lockfile

echo "🔨 Building strava-api-types package..."
cd packages/strava-api-types
pnpm build
cd ../..

echo "🏗️ Building API..."
cd apps/api
pnpm build

echo "✅ Build completed successfully!" 