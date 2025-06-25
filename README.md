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

---
This roadmap provides the base tasks to implement Strava connectivity in the API. Once these are complete, we will have an MVP capable of importing activities from Strava and exposing them through GraphQL.

