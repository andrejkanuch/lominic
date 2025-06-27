# Strava Module

This module handles the integration with the Strava API, including OAuth 2.0 authentication and fetching user activities.

## Files

-   `strava.controller.ts`: Handles the OAuth 2.0 callback from Strava.
-   `strava.service.ts`: Contains the core logic for interacting with the Strava API.
-   `strava.resolver.ts`: Exposes Strava-related queries and mutations to the GraphQL API.
-   `strava.module.ts`: The NestJS module file.
-   `dto/strava-activity.dto.ts`: Data transfer object for Strava activities.
-   `README.md`: This file.

## Setup

1.  **Create a Strava Application:**
    -   Go to [https://www.strava.com/settings/api](https://www.strava.com/settings/api) and create a new application.
    -   Set the "Authorization Callback Domain" to `localhost`.
    -   Set the "Redirect URI" to `http://localhost:4000/api/strava/oauth/callback`.

2.  **Configure Environment Variables:**
    -   Copy the `.env.example` file to `.env` in the `apps/api` directory.
    -   Add your Strava application's Client ID and Client Secret to the `.env` file:

        ```
        STRAVA_CLIENT_ID=<your_client_id>
        STRAVA_CLIENT_SECRET=<your_client_secret>
        ```

## Authentication Flow

1.  The user clicks the "Connect with Strava" button in the frontend, which opens a popup window to the `/api/strava/connect` endpoint.
2.  The `StravaController` redirects the user to the Strava authorization page.
3.  The user authorizes the application and is redirected back to the `/api/strava/oauth/callback` endpoint.
4.  The `StravaController` handles the callback, exchanging the authorization code for an access token using the `StravaService`.
5.  The `StravaService` saves the access token, refresh token, and expiration date to the `strava_accounts` table in the database.
6.  The popup window is closed, and the frontend refetches the user's activities.
