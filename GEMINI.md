# Gemini Project Analysis

This document provides a high-level overview of the Lominic project structure and technologies used.

## Project Overview

This is a monorepo managed with pnpm workspaces and Turborepo. It contains a NestJS API, a Next.js web application, and a shared TypeScript package.

### Key Technologies

- **Monorepo:** pnpm workspaces, Turborepo
- **Language:** TypeScript
- **API:** NestJS, GraphQL, TypeORM, PostgreSQL
- **Web:** Next.js, React, Tailwind CSS, Apollo Client
- **Linting/Formatting:** ESLint, Prettier

## Workspace Breakdown

### `apps/api`

- **Framework:** NestJS
- **Purpose:** Provides the backend GraphQL API.
- **Database:** PostgreSQL (via TypeORM)
- **Authentication:** JWT-based, with OAuth integration for Strava.
- **Key files:**
    - `nest-cli.json`: NestJS configuration.
    - `src/main.ts`: Application entry point.
    - `src/app.module.ts`: Root application module.
    - `src/schema.gql`: GraphQL schema definition.
    - `docker-compose.yml`: For running the PostgreSQL database.

### `apps/web`

- **Framework:** Next.js
- **Purpose:** Frontend web application.
- **Styling:** Tailwind CSS
- **GraphQL:** Apollo Client for interacting with the API.
- **Key files:**
    - `next.config.ts`: Next.js configuration.
    - `src/app/[locale]`: Main application routes.
    - `src/graphql`: GraphQL queries and mutations.
    - `src/lib/apollo-client.ts`: Apollo Client setup.

### `packages/strava-api-types`

- **Purpose:** Shared TypeScript types for the Strava API.
- **Key files:**
    - `src/index.ts`: Type definitions.

## Getting Started

- **Installation:** `pnpm install`
- **Running the API:** `pnpm dev --filter=api`
- **Running the Web App:** `pnpm dev --filter=web`
