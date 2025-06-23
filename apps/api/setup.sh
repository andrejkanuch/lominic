#!/bin/bash

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cat > .env << EOF
# Application
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=lominic_user
DB_PASSWORD=lominic_password
DB_NAME=lominic_dev

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# GraphQL
GRAPHQL_PLAYGROUND=true
GRAPHQL_INTROSPECTION=true
EOF
    echo "✅ .env file created successfully!"
else
    echo "✅ .env file already exists"
fi

echo "🚀 Setup complete! You can now run:"
echo "   pnpm start:dev" 