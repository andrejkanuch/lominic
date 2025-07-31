# Frontend Garmin OAuth Integration

This directory contains the frontend implementation for Garmin OAuth2 PKCE integration.

## Components

### `useGarminAuth` Hook

**File:** `../../hooks/use-garmin-auth.ts`

A custom React hook that manages the entire Garmin OAuth flow:

```typescript
const {
  isConnected,
  isConnecting,
  isLoading,
  error,
  account,
  connect,
  disconnect,
  refresh,
  clearError,
} = useGarminAuth()
```

**Features:**

- ✅ Automatic connection status checking
- ✅ OAuth popup management
- ✅ Error handling and state management
- ✅ Account details fetching
- ✅ Disconnect functionality
- ✅ Real-time status updates

### `GarminConnectionStatus` Component

**File:** `../ui/garmin-connection-status.tsx`

A simple component showing connection status with connect/disconnect actions:

```tsx
<GarminConnectionStatus />
```

**Features:**

- ✅ Connection status display
- ✅ Connect/disconnect buttons
- ✅ Error handling with dismissible alerts
- ✅ Loading states
- ✅ Account information display

### `GarminVerificationPage` Component

**File:** `GarminVerificationPage.tsx`

A comprehensive verification page with full OAuth flow:

```tsx
<GarminVerificationPage />
```

**Features:**

- ✅ Complete OAuth flow
- ✅ Account details and permissions
- ✅ Security information
- ✅ Benefits explanation
- ✅ Professional UI/UX

### `GarminIntegrationExample` Component

**File:** `GarminIntegrationExample.tsx`

Example component showing different integration patterns:

```tsx
// Simple integration
<GarminIntegrationExample variant="simple" />

// Full page integration
<GarminIntegrationExample variant="full" />
```

## Usage Examples

### 1. Simple Integration (Anywhere in your app)

```tsx
import { GarminConnectionStatus } from '@/components/ui/garmin-connection-status'

function MyComponent() {
  return (
    <div>
      <h2>Connect Your Devices</h2>
      <GarminConnectionStatus />
    </div>
  )
}
```

### 2. Custom Hook Usage

```tsx
import { useGarminAuth } from '@/hooks/use-garmin-auth'

function MyCustomComponent() {
  const { isConnected, connect, disconnect, error } = useGarminAuth()

  return (
    <div>
      {isConnected ? (
        <button onClick={disconnect}>Disconnect Garmin</button>
      ) : (
        <button onClick={connect}>Connect Garmin</button>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
```

### 3. Full Page Integration

```tsx
import { GarminVerificationPage } from '@/components/garmin/GarminVerificationPage'

export default function GarminPage() {
  return <GarminVerificationPage />
}
```

## OAuth Flow

1. **User clicks "Connect with Garmin"**

   - Hook fetches authorization URL from GraphQL
   - Opens popup with Garmin OAuth URL

2. **User authorizes on Garmin**

   - Garmin redirects to callback URL
   - Callback exchanges code for tokens
   - Sends success/error message to parent window

3. **Popup closes and updates state**
   - Hook receives message from popup
   - Refetches connection status
   - Updates UI accordingly

## Error Handling

The implementation includes comprehensive error handling:

- **Popup blocked**: Shows error message
- **OAuth errors**: Displays specific error messages
- **Network errors**: Graceful fallback
- **Timeout**: 5-minute timeout with cleanup
- **Dismissible alerts**: Users can clear error messages

## Security Features

- **OAuth2 PKCE**: Secure authorization flow
- **Popup isolation**: Prevents XSS attacks
- **Message validation**: Only accepts expected message types
- **Timeout protection**: Prevents hanging popups
- **State management**: Proper cleanup of event listeners

## Styling

Components use Tailwind CSS and are fully responsive:

- **Mobile-friendly**: Works on all screen sizes
- **Accessible**: Proper ARIA labels and keyboard navigation
- **Consistent**: Matches your app's design system
- **Loading states**: Smooth loading animations

## Environment Variables

Make sure these are set in your `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Testing

1. **Start your API server** (port 4000)
2. **Start your web app** (port 3000)
3. **Navigate to a page with Garmin integration**
4. **Click "Connect with Garmin"**
5. **Complete OAuth flow on Garmin's site**
6. **Verify connection status updates**

## Troubleshooting

- **Popup blocked**: Check browser popup settings
- **OAuth errors**: Verify environment variables and API endpoints
- **GraphQL errors**: Check API server and authentication
- **Styling issues**: Ensure Tailwind CSS is properly configured

## Next Steps

1. **Add to your pages**: Use components in your app
2. **Customize styling**: Adjust to match your brand
3. **Add analytics**: Track connection success/failure
4. **Implement activities**: Use connected account to fetch data
