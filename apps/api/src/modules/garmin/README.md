# Garmin OAuth2 PKCE Implementation

This module implements the Garmin OAuth2 PKCE (Proof Key for Code Exchange) flow for secure authentication with Garmin Connect.

## Features

- ✅ OAuth2 PKCE flow with code verifier/challenge
- ✅ Secure token exchange and storage
- ✅ Automatic token refresh
- ✅ User permissions fetching
- ✅ Account disconnection
- ✅ GraphQL and REST API endpoints
- ✅ Session-based state management

## Environment Variables

Add these to your `.env` file:

```env
# Garmin OAuth Configuration
GARMIN_CLIENT_ID=your_garmin_client_id
GARMIN_CLIENT_SECRET=your_garmin_client_secret
GARMIN_REDIRECT_URI=http://localhost:3000/api/auth/garmin/callback
GARMIN_SCOPES=ACTIVITY_EXPORT HEALTH_EXPORT

# Session (for OAuth state management)
SESSION_SECRET=your_session_secret_key
```

## Garmin Developer Portal Setup

1. Go to [Garmin's Developer Portal](https://developer.garmin.com/)
2. Create a new app or use an existing one
3. Select "Health API" or "Wellness API"
4. Set your redirect URI to: `http://localhost:3000/api/auth/garmin/callback`
5. Copy your `client_id` (consumer key) and `client_secret` (consumer secret)

## API Endpoints

### REST Endpoints

- `GET /api/garmin/auth-url` - Get authorization URL for OAuth flow
- `POST /api/garmin/exchange-token` - Exchange authorization code for tokens
- `GET /api/garmin/connection-status` - Check if user is connected to Garmin
- `POST /api/garmin/disconnect` - Disconnect Garmin account

### GraphQL Endpoints

- `getGarminAuthUrl` - Get authorization URL
- `isGarminConnected` - Check connection status
- `getGarminAccount` - Get user's Garmin account details
- `getGarminUserPermissions` - Get user's granted permissions
- `exchangeGarminCode` - Exchange authorization code for tokens
- `refreshGarminToken` - Refresh access token
- `disconnectGarminAccount` - Disconnect account
- `deleteGarminUserRegistration` - Delete user registration from Garmin

## OAuth Flow

1. **Authorization Request**: User clicks "Connect with Garmin"
   - Generates random code verifier and challenge
   - Builds authorization URL with PKCE parameters
   - Stores state and verifier in session

2. **User Consent**: User authorizes on Garmin's site
   - Garmin redirects back with authorization code and state

3. **Token Exchange**: Backend exchanges code for tokens
   - Verifies state parameter
   - Exchanges authorization code for access/refresh tokens
   - Fetches Garmin user ID and permissions
   - Stores tokens in database

4. **API Usage**: Use access token for Garmin API calls
   - Automatic token refresh when expired
   - Bearer token authentication

## Security Features

- **PKCE**: Prevents code interception attacks
- **State Parameter**: CSRF protection
- **Session Management**: Secure state storage
- **Token Refresh**: Automatic token renewal
- **Secure Storage**: Encrypted token storage in database

## Database Schema

The `GarminAccount` entity stores:
- User ID (foreign key to User)
- Garmin User ID
- Access Token (encrypted)
- Refresh Token (encrypted)
- Token expiration dates
- Granted permissions (scope)
- Connection status

## Error Handling

- Invalid authorization codes
- Expired tokens
- Network errors
- Permission denied
- State mismatch (CSRF protection)

## Testing

1. Start the API server
2. Navigate to your app's Garmin connection page
3. Click "Connect with Garmin"
4. Complete the OAuth flow on Garmin's site
5. Verify the connection status

## Troubleshooting

- **500 Error**: Check environment variables
- **400 Error**: Invalid authorization code (try reconnecting)
- **401 Error**: Invalid client credentials
- **Token Refresh Failed**: User needs to reconnect

## Notes

- Activities endpoint is a placeholder - implement based on your app's permissions
- The standard Garmin Wellness API doesn't include an activities endpoint
- You need to implement specific endpoints based on your app's granted permissions
- Contact Garmin support for access to additional endpoints if needed 