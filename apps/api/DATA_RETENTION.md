# Data Retention Policies

This document outlines the data retention policies implemented in the Lominic API to ensure compliance with privacy regulations and efficient data management.

## Overview

The data retention system automatically manages user data lifecycle, ensuring that:

- Inactive users are marked for deletion after a specified period
- Unverified users are removed quickly
- Strava account data is cleaned up when no longer in use
- All deletions follow a grace period to allow for recovery

## Retention Policies

### User Data Retention

| Data Type            | Retention Period      | Action                            |
| -------------------- | --------------------- | --------------------------------- |
| **Inactive Users**   | 365 days (1 year)     | Marked for deletion               |
| **Unverified Users** | 30 days               | Marked for deletion               |
| **Grace Period**     | 30 days               | Soft delete (marked for deletion) |
| **Hard Delete**      | 90 days after marking | Permanent deletion                |

### Strava Account Data Retention

| Data Type                    | Retention Period      | Action                            |
| ---------------------------- | --------------------- | --------------------------------- |
| **Inactive Strava Accounts** | 180 days (6 months)   | Marked for deletion               |
| **Grace Period**             | 30 days               | Soft delete (marked for deletion) |
| **Hard Delete**              | 90 days after marking | Permanent deletion                |

## Environment Variables

Configure retention periods using these environment variables:

```bash
# User retention periods (in days)
DATA_RETENTION_INACTIVE_USER_DAYS=365
DATA_RETENTION_UNVERIFIED_USER_DAYS=30

# Strava account retention periods (in days)
DATA_RETENTION_STRAVA_INACTIVE_DAYS=180

# Grace periods (in days)
DATA_RETENTION_SOFT_DELETE_GRACE_DAYS=30
DATA_RETENTION_HARD_DELETE_GRACE_DAYS=90
```

## Implementation Details

### Database Schema

The following fields have been added to track retention:

#### Users Table

- `lastLoginAt`: Timestamp of last user login
- `dataRetentionExpiresAt`: When data retention expires
- `isMarkedForDeletion`: Whether user is marked for deletion
- `markedForDeletionAt`: When user was marked for deletion

#### Strava Accounts Table

- `lastSyncAt`: Timestamp of last Strava data sync
- `dataRetentionExpiresAt`: When data retention expires
- `isMarkedForDeletion`: Whether account is marked for deletion
- `markedForDeletionAt`: When account was marked for deletion

### Automatic Tracking

The system automatically tracks:

- **User Activity**: Updates `lastLoginAt` on every login
- **Strava Sync**: Updates `lastSyncAt` on every Strava API call
- **Account Status**: Resets deletion flags when activity is detected

### Cleanup Process

1. **Marking for Deletion**: Inactive data is marked with `isMarkedForDeletion = true`
2. **Grace Period**: 30 days to allow for recovery
3. **Permanent Deletion**: Data is permanently removed after 90 days

## Admin Operations

### GraphQL Queries and Mutations

#### Get Retention Statistics

```graphql
query {
  getRetentionStats
}
```

#### Perform Manual Cleanup

```graphql
mutation {
  performDataRetentionCleanup
}
```

#### Restore User from Deletion

```graphql
mutation {
  restoreUserFromDeletion(userId: "user-id")
}
```

#### Restore Strava Account from Deletion

```graphql
mutation {
  restoreStravaAccountFromDeletion(accountId: "account-id")
}
```

### Access Control

- **Retention Statistics**: Available to ADMIN and SUPER_ADMIN roles
- **Manual Cleanup**: Available to SUPER_ADMIN role only
- **Restore Operations**: Available to SUPER_ADMIN role only

## Scheduled Cleanup

**Note**: Scheduled cleanup requires the `@nestjs/schedule` package to be installed.

To enable scheduled cleanup:

1. Install the package:

   ```bash
   pnpm add @nestjs/schedule
   ```

2. Import the ScheduleModule in your app module:

   ```typescript
   import { ScheduleModule } from '@nestjs/schedule';

   @Module({
     imports: [
       ScheduleModule.forRoot(),
       // ... other imports
     ],
   })
   ```

3. Uncomment the `@Cron` decorator in `DataRetentionService`:
   ```typescript
   @Cron(CronExpression.EVERY_DAY_AT_2AM)
   async performScheduledCleanup(): Promise<void>
   ```

## Manual Cleanup

You can trigger cleanup manually using the GraphQL mutation or by calling the service directly:

```typescript
// In a service or controller
const result = await this.dataRetentionService.performManualCleanup()
console.log('Cleanup result:', result)
```

## Monitoring

### Retention Statistics

The system provides comprehensive statistics including:

- Total users and Strava accounts
- Inactive users and accounts
- Users/accounts marked for deletion
- Current retention policy settings

### Logging

All retention operations are logged with appropriate levels:

- `INFO`: Normal operations (marking, deletion, restoration)
- `ERROR`: Failed operations
- `WARN`: Potential issues

## Compliance

### GDPR Compliance

This implementation supports GDPR requirements:

- **Right to Erasure**: Users can request data deletion
- **Data Minimization**: Only necessary data is retained
- **Transparency**: Clear retention periods and policies
- **Recovery**: Grace period allows for data recovery

### Strava API Compliance

The retention system respects Strava's API agreement:

- Data is only shown to the user who provided it
- Proper attribution is maintained
- Rate limits are respected
- Privacy settings are honored

## Best Practices

1. **Regular Monitoring**: Check retention statistics regularly
2. **Grace Periods**: Always use grace periods to prevent accidental data loss
3. **Backup Strategy**: Ensure backups are available during grace periods
4. **Documentation**: Keep retention policies updated and communicated
5. **Testing**: Test cleanup procedures in development environments

## Troubleshooting

### Common Issues

1. **Data Not Being Cleaned Up**

   - Check if scheduled cleanup is enabled
   - Verify environment variables are set correctly
   - Check logs for errors

2. **Users Being Deleted Too Quickly**

   - Verify `lastLoginAt` is being updated correctly
   - Check if login tracking is working
   - Review retention period settings

3. **Strava Accounts Not Syncing**
   - Verify `lastSyncAt` is being updated
   - Check Strava API connectivity
   - Review sync frequency

### Recovery Procedures

1. **Restore from Grace Period**: Use the restore mutations
2. **Database Backup**: Restore from recent backup if needed
3. **Contact Support**: For critical data loss situations

## Future Enhancements

- **Email Notifications**: Notify users before deletion
- **Data Export**: Allow users to export their data
- **Custom Retention**: Per-user retention policies
- **Analytics**: Retention analytics and reporting
- **Integration**: Integration with external backup systems
