# Garmin OAuth2 PKCE Setup

This document outlines the setup for Garmin OAuth2 with Proof Key for Code Exchange (PKCE) for enhanced security.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Garmin OAuth Configuration
GARMIN_CLIENT_ID=your_garmin_client_id
GARMIN_CLIENT_SECRET=your_garmin_client_secret
GARMIN_REDIRECT_URI=http://localhost:3000/api/auth/garmin/callback
```

## Garmin Developer Portal Setup

1. Go to [Garmin's Developer Portal](https://developer.garmin.com/)
2. Create a new app or use an existing one
3. Select "Health API" or "Wellness API"
4. Set your redirect URI to: `http://localhost:3000/api/auth/garmin/callback`
5. Copy your `client_id` (consumer key) and `client_secret` (consumer secret)

## OAuth Flow Implementation

The implementation follows the OAuth2 PKCE specification:

### 1. Authorization URL Generation

- Generates a random `code_verifier` (43-128 characters)
- Computes `code_challenge` using SHA256 hash and base64url encoding
- Stores `code_verifier` and `state` temporarily in database
- Redirects user to Garmin's authorization URL

### 2. Token Exchange

- Receives authorization code from Garmin callback
- Exchanges code for access/refresh tokens using form data
- Stores tokens in database with expiration dates
- Fetches Garmin user ID using the access token

### 3. Token Refresh

- Automatically refreshes expired access tokens
- Uses refresh token to get new access token
- Updates database with new tokens

### 4. API Usage

- Uses Bearer token authentication for Garmin API calls
- Handles activity fetching, user permissions, etc.

## Key Changes Made

1. **Correct Auth URL**: Using `https://connect.garmin.com/oauth2Confirm` (official endpoint)
2. **Form Data Authentication**: Using `client_id` and `client_secret` in form data as per OAuth2 spec
3. **Proper Error Handling**: Added specific error handling for different HTTP status codes
4. **Database Storage**: Properly stores and manages Garmin account records
5. **Token Management**: Handles token refresh and expiration properly
6. **Activities Endpoint**: Note that activities endpoint is not part of the standard Garmin API

## Testing

1. Start the API server: `npm run start:dev`
2. Start the web app: `npm run dev`
3. Navigate to the profile page
4. Click "Connect with Garmin"
5. Complete the OAuth flow
6. Verify the connection status

## Troubleshooting

- **500 Error**: Check that environment variables are set correctly
- **400 Error**: Invalid authorization code (try reconnecting)
- **401 Error**: Invalid client credentials (check GARMIN_CLIENT_ID and GARMIN_CLIENT_SECRET)
- **Token Refresh Failed**: User needs to reconnect their account
- **Activities Not Available**: The standard Garmin API doesn't include an activities endpoint - you need to implement specific endpoints based on your app's permissions

## Important Notes

- **Activities Endpoint**: The standard Garmin Wellness API doesn't include an activities endpoint. You need to:
  1. Check what permissions your app has been granted
  2. Implement specific endpoints based on those permissions
  3. Contact Garmin support for access to additional endpoints if needed
- **API Permissions**: The available endpoints depend on what permissions your app was granted during the OAuth flow
- **Custom Implementation**: You may need to implement your own activities fetching logic based on your specific use case

## Security Notes

- Never commit real client credentials to version control
- Use environment variables for all sensitive configuration
- The PKCE flow prevents code interception attacks
- Tokens are stored securely in the database
- Refresh tokens are used to maintain long-term access
