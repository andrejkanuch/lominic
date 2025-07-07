# Render Deployment Guide

## Prerequisites

1. **Render Account**: Sign up at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: Prepare your environment variables

## Step 1: Create PostgreSQL Database

1. Go to your Render dashboard
2. Click "New" → "PostgreSQL"
3. Configure:

   - **Name**: `lominic-db`
   - **Region**: Same as your web service
   - **Plan**: Free (for development)
   - **Database**: `lominic_prod`
   - **User**: `lominic_user`

4. After creation, copy the connection details:
   - **Host**: `your-db-host.render.com`
   - **Port**: `5432`
   - **Database**: `lominic_prod`
   - **Username**: `lominic_user`
   - **Password**: `your-generated-password`

## Step 2: Create Web Service

1. Go to your Render dashboard
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:

### Basic Settings

- **Name**: `lominic-api`
- **Root Directory**: `apps/api`
- **Environment**: `Node`
- **Region**: Same as your database
- **Branch**: `main`

### Build & Deploy

- **Build Command**: `pnpm install --frozen-lockfile && pnpm build`
- **Start Command**: `node dist/main.js`

### Instance Type

- **Plan**: Free (for development)

## Step 3: Environment Variables

Add these environment variables in your web service settings:

```bash
# Database Configuration
DB_HOST=your-db-host.render.com
DB_PORT=5432
DB_USERNAME=lominic_user
DB_PASSWORD=your-generated-password
DB_NAME=lominic_prod

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Strava Configuration
STRAVA_CLIENT_ID=your-strava-client-id
STRAVA_CLIENT_SECRET=your-strava-client-secret
STRAVA_REDIRECT_URI=https://your-frontend-domain.com/auth/strava/callback

# Email Configuration (Resend)
RESEND_API_KEY=your-resend-api-key

# Frontend URL
FRONTEND_URL=https://your-frontend-domain.com

# Environment
NODE_ENV=production
```

## Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy your application
3. Monitor the build logs for any issues

## Step 5: Database Migrations

After deployment, you may need to run database migrations:

1. Go to your web service dashboard
2. Click "Shell"
3. Run: `pnpm migration:run`

## Step 6: Verify Deployment

1. Check your service URL: `https://your-service-name.onrender.com`
2. Test GraphQL endpoint: `https://your-service-name.onrender.com/graphql`
3. Test API endpoint: `https://your-service-name.onrender.com/api`

## Troubleshooting

### Common Issues

1. **Build Failures**:

   - Check if `pnpm` is available
   - Verify all dependencies are in `package.json`
   - Check TypeScript compilation errors

2. **Database Connection Issues**:

   - Verify database credentials
   - Check if database is in the same region
   - Ensure SSL is properly configured

3. **Environment Variables**:
   - Double-check all required variables are set
   - Verify no typos in variable names
   - Ensure sensitive data is properly secured

### Logs

- Check build logs for compilation errors
- Check runtime logs for application errors
- Use Render's log viewer for debugging

## Production Considerations

1. **Upgrade Plans**: Consider upgrading to paid plans for production
2. **Custom Domains**: Set up custom domains for your API
3. **SSL**: Render provides automatic SSL certificates
4. **Monitoring**: Set up monitoring and alerts
5. **Backups**: Configure database backups

## Security Notes

1. **JWT Secret**: Use a strong, random JWT secret
2. **Database Password**: Use a strong database password
3. **API Keys**: Keep all API keys secure
4. **CORS**: Configure CORS properly for your frontend domain
