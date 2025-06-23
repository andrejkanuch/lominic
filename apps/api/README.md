# Lominic API

NestJS backend with TypeORM, PostgreSQL, and GraphQL.

## Features

- 🚀 NestJS framework
- 🗄️ TypeORM with PostgreSQL
- 📊 GraphQL with Apollo Server
- 🔐 JWT Authentication
- 🐳 Docker development setup
- 📝 Auto-generated GraphQL schema

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- pnpm (recommended)

### Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start PostgreSQL database:**
   ```bash
   docker-compose up -d
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Run migrations (optional for development):**
   ```bash
   pnpm migration:run
   ```

5. **Start development server:**
   ```bash
   pnpm start:dev
   ```

### Available Scripts

- `pnpm start:dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm start:prod` - Start production server
- `pnpm test` - Run tests
- `pnpm migration:generate` - Generate new migration
- `pnpm migration:run` - Run pending migrations
- `pnpm schema:sync` - Sync database schema

### Database Management

- **pgAdmin**: http://localhost:5050 (admin@lominic.com / admin123)
- **PostgreSQL**: localhost:5432

### GraphQL Playground

- **URL**: http://localhost:4000/graphql
- **Available in development mode only**

### Environment Variables

```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=lominic_user
DB_PASSWORD=lominic_password
DB_NAME=lominic_dev

JWT_SECRET=your-super-secret-jwt-key
```

## Project Structure

```
src/
├── config/           # Configuration files
├── entities/         # TypeORM entities
├── modules/          # Feature modules
│   ├── auth/         # Authentication
│   └── users/        # User management
├── migrations/       # Database migrations
└── main.ts          # Application entry point
```

## API Endpoints

- `GET /api/health` - Health check
- `POST /graphql` - GraphQL endpoint
- `GET /graphql` - GraphQL playground (dev only) 