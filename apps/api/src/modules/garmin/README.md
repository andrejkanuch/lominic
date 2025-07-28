# Garmin Integration

This module provides OAuth 2.0 PKCE integration with Garmin Connect API.

## Features

- OAuth 2.0 PKCE authentication flow
- Automatic token refresh
- User permissions management
- Account disconnection
- Data retention compliance

## Environment Variables

Add the following environment variables to your `.env` file:

```env
GARMIN_CLIENT_ID=your_garmin_client_id
GARMIN_CLIENT_SECRET=your_garmin_client_secret
GARMIN_REDIRECT_URI=https://yourapp.com/redirect
```

## GraphQL API

### Queries

- `getGarminAuthUrl`: Get the authorization URL for OAuth flow
- `getGarminAccount`: Get user's connected Garmin account
- `getGarminUserPermissions`: Get user permissions from Garmin

### Mutations

- `exchangeGarminCode(code, state)`: Exchange authorization code for access token
- `refreshGarminToken`: Refresh the access token
- `deleteGarminUserRegistration`: Delete user registration from Garmin
- `disconnectGarminAccount`: Disconnect Garmin account

## Usage

### 1. Initialize OAuth Flow

```graphql
query {
  getGarminAuthUrl
}
```

### 2. Handle OAuth Callback

After user authorizes, Garmin will redirect to your app with `code` and `state` parameters:

```graphql
mutation {
  exchangeGarminCode(code: "authorization_code", state: "state_parameter") {
    id
    userId
    garminUserId
    expiresAt
    scope
  }
}
```

### 3. Check Account Status

```graphql
query {
  getGarminAccount {
    id
    userId
    garminUserId
    lastSyncAt
    isMarkedForDeletion
  }
}
```

### 4. Disconnect Account

```graphql
mutation {
  disconnectGarminAccount
}
```

## Database Schema

The `garmin_accounts` table stores:

- OAuth tokens (access and refresh)
- Token expiration times
- User permissions (scope)
- Garmin user ID
- Data retention fields
- Sync timestamps

## Security

- Uses PKCE (Proof Key for Code Exchange) for enhanced security
- Tokens are stored encrypted in the database
- Automatic token refresh before expiration
- CORS pre-flight requests are not supported by Garmin API

## Error Handling

The service includes comprehensive error handling for:

- Invalid authorization codes
- Expired tokens
- Network failures
- API rate limits
- Invalid user permissions

## Data Retention

The module integrates with the data retention system to ensure GDPR compliance and automatic data cleanup.
