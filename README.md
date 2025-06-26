# Lominic Monorepo

A modern monorepo built with Turbo, featuring a Next.js web application and NestJS API with GraphQL.

## 🏗️ Architecture

```
lominic/
├── apps/
│   ├── api/          # NestJS API with GraphQL
│   └── web/          # Next.js web application
├── packages/
│   ├── shared/       # Shared utilities, types, and constants
│   └── ui/           # Shared React components and hooks
└── turbo.json        # Turbo configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 8.0.0
- Docker (for PostgreSQL)

### Installation

```bash
# Install dependencies
pnpm install

# Start development servers
pnpm dev

# Start database
pnpm db:up
```

## 📦 Available Scripts

### Root Commands

```bash
# Development
pnpm dev                    # Start all dev servers
pnpm start:api             # Start API dev server
pnpm start:web             # Start web dev server

# Building
pnpm build                 # Build all packages
pnpm type-check            # Type check all packages

# Code Quality
pnpm lint                  # Lint all packages
pnpm lint:fix              # Fix linting issues
pnpm format                # Format all code
pnpm format:check          # Check code formatting

# Testing
pnpm test                  # Run all tests
pnpm test:watch            # Run tests in watch mode
pnpm test:coverage         # Run tests with coverage

# Code Generation
pnpm codegen               # Generate GraphQL types
pnpm codegen:watch         # Watch and generate GraphQL types

# Database
pnpm db:up                 # Start database
pnpm db:down               # Stop database
pnpm db:reset              # Reset database
pnpm db:migrate            # Run migrations
pnpm db:generate           # Generate migration
pnpm db:revert             # Revert migration
pnpm db:sync               # Sync schema
pnpm db:drop               # Drop schema

# Cleanup
pnpm clean                 # Clean build artifacts
pnpm clean:all             # Clean all (including node_modules)
```

### Package-Specific Commands

```bash
# API
pnpm --filter @lominic/api migration:run
pnpm --filter @lominic/api test:coverage

# Web
pnpm --filter @lominic/web build
pnpm --filter @lominic/web test

# Shared packages
pnpm --filter @lominic/shared build
pnpm --filter @lominic/ui build
```

## 🏛️ Package Structure

### Apps

#### `@lominic/api`

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **API**: GraphQL with Apollo Server
- **Authentication**: JWT with Passport
- **Features**: User management, RBAC, migrations

#### `@lominic/web`

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **UI**: Radix UI components
- **State**: Apollo Client for GraphQL
- **Features**: Internationalization, theming, forms

### Packages

#### `@lominic/shared`

- **Types**: Common TypeScript interfaces
- **Utils**: Shared utility functions
- **Constants**: Application constants
- **Usage**: Imported by all packages

#### `@lominic/ui`

- **Components**: Reusable React components
- **Hooks**: Custom React hooks
- **Dependencies**: React, @lominic/shared
- **Usage**: Imported by web app

## 🔧 Development

### Adding Dependencies

```bash
# Add to specific package
pnpm --filter @lominic/api add express
pnpm --filter @lominic/web add react-query

# Add dev dependency
pnpm --filter @lominic/shared add -D typescript

# Add to all packages
pnpm add -w eslint
```

### Creating New Packages

1. Create directory in `packages/`
2. Add `package.json` with proper name (`@lominic/package-name`)
3. Add to workspace in root `package.json`
4. Add build configuration (tsup, etc.)
5. Update Turbo pipeline if needed

### Code Generation

The project uses GraphQL Code Generator for type-safe GraphQL operations:

```bash
# Generate types for all packages
pnpm codegen

# Watch for changes
pnpm codegen:watch
```

## 🗄️ Database

### Setup

```bash
# Start PostgreSQL
pnpm db:up

# Run migrations
pnpm db:migrate

# Generate new migration
pnpm db:generate

# Reset database
pnpm db:reset
```

### Environment Variables

Create `.env` files in `apps/api/`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/lominic
JWT_SECRET=your-jwt-secret
```

## 🧪 Testing

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run specific package tests
pnpm --filter @lominic/api test
pnpm --filter @lominic/web test
```

## 🚀 Deployment

### Build for Production

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @lominic/api build
pnpm --filter @lominic/web build
```

### Docker

```bash
# Build and run with Docker Compose
cd apps/api
docker-compose up -d
```

## 📚 Best Practices

### Turbo Monorepo

- Use `dependsOn` in `turbo.json` for proper task dependencies
- Cache outputs appropriately for faster builds
- Use `persistent: true` for dev servers
- Leverage `globalDependencies` for env files

### Package Management

- Use workspace dependencies (`workspace:*`)
- Keep shared code in packages
- Use proper exports in package.json
- Maintain consistent versioning

### Code Quality

- Run `pnpm lint` before commits
- Use `pnpm format` for consistent formatting
- Write tests for new features
- Use TypeScript strict mode

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Run tests and linting
4. Submit pull request

## 📄 License

ISC

# Strava API Integration Roadmap

This document outlines tasks for adding Strava API support to the Lominic project. The goal is to build a minimal backend that can ingest athlete data and serve it over GraphQL. Each task is meant to be actionable so an LLM can assist with code generation.

## 1. Initial Setup

1. **Create a Strava developer account**

   - Visit <https://www.strava.com/settings/api> and register an application.
   - Record the `Client ID`, `Client Secret`, and `Verification Token`.
   - Add a placeholder callback URL (e.g., `http://localhost:4000/api/strava/oauth/callback`).

2. **Configure environment variables**
   - In `apps/api/.env`, add:
     ```env
     STRAVA_CLIENT_ID=<your-client-id>
     STRAVA_CLIENT_SECRET=<your-client-secret>
     STRAVA_REDIRECT_URI=http://localhost:4000/api/strava/oauth/callback
     ```
   - Commit `.env.example` with the new variables so teammates know what to provide.

## 2. Strava OAuth Flow

1. **Create a `StravaModule` in `apps/api/src/modules`**

   - Generate a NestJS module, service, and controller for Strava.
   - The controller exposes `/strava/connect` to begin OAuth and `/strava/oauth/callback` to handle redirects.

2. **Implement the authorization URL helper**

   - Build a method that returns the Strava OAuth URL using the client ID and redirect URI.
   - Include the necessary scopes (`activity:read_all` for MVP).

3. **Handle the callback route**
   - Exchange the `code` parameter from Strava for an access token using their token endpoint.
   - Save the returned `access_token`, `refresh_token`, and expiration time in the database.

## 3. Persistence Layer

1. **Create a `StravaAccount` entity**

   - Table fields: `id`, `userId`, `accessToken`, `refreshToken`, `expiresAt`, `athleteId`.
   - Link it to the existing `User` entity with a relation.

2. **Add a migration for the new table**
   - Update TypeORM configuration and run `pnpm migration:generate`.

## 4. Fetching Activities

1. **Add a method in `StravaService` to refresh tokens**

   - Before each API call, check if `expiresAt` has passed and refresh if necessary.

2. **Implement a method to fetch recent activities**

   - Call `GET https://www.strava.com/api/v3/athlete/activities` with the stored token.
   - Map the response to an internal DTO.

3. **Expose a GraphQL query**
   - Example: `getStravaActivities(limit: Int!): [StravaActivity!]!`.
   - Use the `currentUser` context to load the appropriate `StravaAccount`.

## 5. Sync Jobs

1. **Create a scheduled task**

   - Use `@nestjs/schedule` to run a sync job every few hours.
   - The job fetches new activities for each connected account and stores them in a dedicated `Activity` table.

2. **Store only basic fields for MVP**
   - `activityId`, `userId`, `name`, `distance`, `movingTime`, `startDate`.

## 6. Testing and Validation

1. **Unit tests**

   - Write tests for `StravaService` using mocked HTTP requests.
   - Ensure token refresh logic and activity fetching work as expected.

2. **Integration tests**
   - Test the OAuth flow using supertest to confirm redirects and callbacks.

## 7. Next Steps

- Expand stored activity data with power, heart rate, and training load metrics.
- Add additional GraphQL queries for analytics.
- Introduce frontend components after the API is stable.

## 8. Initial Frontend Task

- Add an **Activities** tab in the sidebar.
- Display a calendar view with each day's activities.
- Selecting an entry shows the activity description.

## 9. Activities List View

The following tasks describe how to surface activities fetched from Strava in a
traditional list view. The goal is a simple page showing all activities with
their key metrics and description.

1. **Expose activities through GraphQL**

   - Extend the API schema with `Activity` and `Query.activities` types.
   - Add a resolver in `apps/api/src/modules` that returns activities from the
     database ordered by `startDate`.
   - Include fields such as `id`, `name`, `distance`, `movingTime`, `startDate`,
     and `description`.

2. **Create a dedicated Activities page in the web app**

   - Under `apps/web/src/app/[locale]/activities`, add `page.tsx` for the list
     view route.
   - Fetch data with `useGetActivitiesQuery` generated from the GraphQL schema.

3. **Build an `ActivitiesList` component**

   - Render each activity in a table or card list with columns for date,
     name, distance, and moving time.
   - Clicking a row opens a detail modal or navigates to
     `/activities/[id]` where the full description is shown.

4. **Hook up the list to the existing Strava sync**
   - Ensure the sync job populates the `Activity` table so the GraphQL query
     returns up‑to‑date results.
   - Provide a manual "Sync Now" button on the page that triggers an API route
     if the user wants to refresh immediately.

These steps complete the first user‑visible feature for browsing Strava
activities in Lominic.

---

This roadmap provides the base tasks to implement Strava connectivity in the API. Once these are complete, we will have an MVP capable of importing activities from Strava and exposing them through GraphQL.
