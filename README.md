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
│   ├── ui/           # Shared React components and hooks
│   └── strava-api-types/  # Strava API type definitions
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

## 📊 Activity API Implementation

The Lominic API provides comprehensive Strava activity integration through GraphQL, offering detailed activity data, real-time streams, and analytics.

### 🏃‍♂️ Activity Data Structure

#### Core Activity Information (`StravaActivityDto`)

The main activity type includes comprehensive data from Strava:

**Basic Activity Data:**

- `id`: Unique activity identifier
- `name`: Activity title/name
- `type`: Activity type (e.g., "Run", "Ride")
- `sport_type`: Detailed sport classification (enum with 50+ sports)
- `start_date` & `start_date_local`: Activity start timestamps
- `timezone`: Activity timezone

**Performance Metrics:**

- `distance`: Total distance in meters
- `moving_time` & `elapsed_time`: Duration in seconds
- `total_elevation_gain`: Elevation gained in meters
- `elev_high` & `elev_low`: Highest and lowest elevation points
- `average_speed` & `max_speed`: Speed metrics in m/s
- `average_cadence`: Pedaling/running cadence (if available)
- `average_watts` & `max_watts`: Power output (cycling activities)
- `kilojoules`: Total work done (cycling activities)

**Heart Rate Data:**

- `has_heartrate`: Whether heart rate data is available
- `average_heartrate` & `max_heartrate`: Heart rate metrics
- `calories`: Estimated calories burned
- `suffer_score`: Strava's relative effort score

**Location & Mapping:**

- `start_latlng` & `end_latlng`: GPS coordinates
- `map`: Polyline map data for route visualization
- `location_city`, `location_state`, `location_country`: Location metadata

**Social & Engagement:**

- `kudos_count`: Number of kudos received
- `comment_count`: Number of comments
- `achievement_count`: Personal records achieved
- `pr_count`: Personal records count
- `has_kudoed`: Whether the current user has kudoed

**Activity Metadata:**

- `trainer`: Indoor/outdoor activity
- `commute`: Whether marked as commute
- `manual`: Manually entered activity
- `private`: Privacy setting
- `flagged`: Content moderation flag

**Detailed Activity Data (when available):**

- `description`: Activity description
- `gear`: Equipment used (bike, shoes, etc.)
- `segment_efforts`: Strava segment performances
- `splits_metric` & `splits_standard`: Split times
- `laps`: Individual lap data
- `best_efforts`: Personal best performances
- `photos`: Activity photos

### 🏷️ Type System

#### External Types (from `@lominic/strava-api-types`)

The API uses comprehensive type definitions from the `strava-api-types` package:

**Core Strava Types:**

- `DetailedActivity`: Complete activity data from Strava API
- `SummaryActivity`: Basic activity summary
- `SportType`: Enum of 50+ supported sports
- `MetaAthlete`: Athlete reference data
- `PolylineMap`: Route mapping data
- `SummaryGear`: Equipment information

**Stream Types:**

- `StreamSet`: Complete stream data collection
- `BaseStream`: Base stream interface
- `AltitudeStream`, `CadenceStream`, `DistanceStream`, etc.: Specific stream types
- `LatLngStream`: GPS coordinate streams
- `MovingStream`: Movement detection data

**Supporting Types:**

- `DetailedSegmentEffort`: Segment performance data
- `Lap`: Individual lap information
- `Split`: Split time data
- `ActivityZone`: Training zone information
- `Comment`: Activity comments
- `Kudoer`: User who gave kudos

#### Custom Types (Created in API)

**GraphQL DTOs:**

- `StravaActivityDto`: Main activity GraphQL type
- `StreamSetDto`: Stream data GraphQL type
- `ActivityZoneDto`: Training zones GraphQL type
- `ActivityStats`: Activity statistics GraphQL type
- `DetailedSegmentEffortDto`: Segment effort GraphQL type
- `LapDto`: Lap data GraphQL type
- `SplitDto`: Split data GraphQL type

**Supporting DTOs:**

- `MetaAthleteDto`: Athlete reference GraphQL type
- `PolylineMapDto`: Map data GraphQL type
- `SummaryGearDto`: Equipment GraphQL type
- `LatLngDto`: GPS coordinates GraphQL type
- `CommentDto`: Comment GraphQL type
- `KudoerDto`: Kudoer GraphQL type

### 📡 Activity Streams

The API provides real-time activity stream data through the `getActivityStreams` endpoint, offering granular performance data throughout the activity.

#### Available Stream Types

**Time-based Streams:**

- `time`: Timestamp data for each data point
- `distance`: Distance covered at each point
- `moving`: Boolean indicating if athlete was moving

**Performance Streams:**

- `heartrate`: Heart rate data throughout activity
- `cadence`: Pedaling/running cadence data
- `power`: Power output data (cycling activities)
- `velocity_smooth`: Smoothed velocity data
- `grade_smooth`: Elevation grade data

**Location Streams:**

- `latlng`: GPS coordinates throughout activity
- `altitude`: Elevation data

**Environmental Streams:**

- `temp`: Temperature data (if available)

#### Stream Data Structure

Each stream contains:

- `type`: Stream type identifier
- `data`: Array of numerical/boolean/GPS values
- `series_type`: Data series type ("time" or "distance")
- `original_size`: Original data point count
- `resolution`: Data resolution ("low", "medium", "high")

**Special Handling:**

- `LatLngStream`: Contains `LatLngDto` objects instead of numbers
- `MovingStream`: Contains boolean values for movement detection
- Null filtering: Streams automatically filter out null values for data quality

### 🔍 API Endpoints

#### Activity Queries

**Get Recent Activities:**

```graphql
query GetStravaActivities($limit: Int!) {
  getStravaActivities(limit: $limit) {
    id
    name
    distance
    moving_time
    start_date
    sport_type
    # ... other fields
  }
}
```

**Get Specific Activity:**

```graphql
query GetActivityById($activityId: String!) {
  getActivityById(activityId: $activityId) {
    id
    name
    description
    # ... complete activity data
  }
}
```

**Get Activity Streams:**

```graphql
query GetActivityStreams($activityId: String!) {
  getActivityStreams(activityId: $activityId) {
    time {
      data
    }
    distance {
      data
    }
    heartrate {
      data
    }
    latlng {
      data {
        lat
        lng
      }
    }
    # ... other streams
  }
}
```

**Get Activity Zones:**

```graphql
query GetActivityZones($activityId: String!) {
  getActivityZones(activityId: $activityId) {
    type
    score
    points
    max
    # ... zone data
  }
}
```

#### Supporting Queries

**Activity Comments:**

```graphql
query GetActivityComments($activityId: String!) {
  getActivityComments(activityId: $activityId) {
    id
    text
    created_at
  }
}
```

**Activity Kudoers:**

```graphql
query GetActivityKudoers($activityId: String!) {
  getActivityKudoers(activityId: $activityId) {
    firstname
    lastname
  }
}
```

**Athlete Statistics:**

```graphql
query GetAthleteStats {
  getAthleteStats {
    all_run_totals {
      count
      distance
      moving_time
    }
    all_ride_totals {
      count
      distance
      moving_time
    }
    # ... other stats
  }
}
```

### 🎯 Data Display Features

#### Activity List View

- **Basic Info**: Name, date, sport type, duration
- **Performance**: Distance, moving time, average speed
- **Achievements**: PRs, achievements, kudos count
- **Location**: City, state, country (if available)

#### Activity Detail View

- **Complete Metrics**: All performance data with units
- **Route Visualization**: Polyline map data for mapping
- **Segment Efforts**: Strava segment performances
- **Lap Analysis**: Individual lap breakdowns
- **Best Efforts**: Personal record attempts
- **Equipment**: Gear used (bike, shoes, etc.)

#### Stream Visualization

- **Time Series Charts**: Heart rate, power, cadence over time
- **Route Maps**: GPS track visualization
- **Performance Analysis**: Speed, elevation, grade profiles
- **Zone Analysis**: Training zone breakdowns

#### Analytics Features

- **Activity Totals**: Running, cycling, swimming statistics
- **Trend Analysis**: Recent vs. all-time totals
- **Achievement Tracking**: Personal records and milestones
- **Training Load**: Suffer score and relative effort

### 🔧 Implementation Details

#### Service Layer (`StravaService`)

- **Token Management**: Automatic OAuth token refresh
- **Error Handling**: Comprehensive error handling for API failures
- **Data Mapping**: Conversion from Strava API to GraphQL DTOs
- **Stream Processing**: Null filtering and data validation

#### Resolver Layer (`StravaResolver`)

- **Authentication**: JWT-based user authentication
- **Authorization**: User-specific data access
- **Input Validation**: GraphQL argument validation
- **Error Propagation**: User-friendly error messages

#### Type Safety

- **Generated Types**: GraphQL Code Generator for type safety
- **Runtime Validation**: Input/output validation
- **TypeScript Strict**: Full type safety throughout the stack

### 🚀 Future Enhancements

- **Real-time Updates**: WebSocket support for live activity updates
- **Advanced Analytics**: Machine learning insights and predictions
- **Social Features**: Activity sharing and community features
- **Training Plans**: Integration with training plan management
- **Equipment Tracking**: Detailed gear usage analytics
