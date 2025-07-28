import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { createHash, randomBytes } from 'crypto'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { ConfigService } from '@nestjs/config'
import { GarminAccount } from '../../entities/garmin-account.entity'

@Injectable()
export class GarminService {
  private readonly logger = new Logger(GarminService.name)
  private readonly garminAuthUrl = 'https://connect.garmin.com/oauth2Confirm'
  private readonly garminTokenUrl =
    'https://diauth.garmin.com/di-oauth2-service/oauth/token'
  private readonly redirectUri: string
  private readonly wellnessApiBase =
    'https://ghapi.garmin.com/partner-gateway/rest'
  private readonly clientId: string
  private readonly clientSecret: string

  constructor(
    @InjectRepository(GarminAccount)
    private readonly garminAccountRepository: Repository<GarminAccount>,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.redirectUri = this.configService.get<string>(
      'GARMIN_REDIRECT_URI',
      'http://localhost:3000/api/auth/garmin/callback'
    )
    this.clientId = this.configService.get<string>(
      'GARMIN_CLIENT_ID',
      '9c361aa0-9578-4566-89d1-1ade5392088d'
    )
    this.clientSecret = this.configService.get<string>(
      'GARMIN_CLIENT_SECRET',
      'FLRkHjX5l+Kc1k2Ry55V1hy3SvZB5/Vic/rKnFzNjwM'
    )
  }

  // Generate code verifier and code challenge
  private generateCodeVerifierAndChallenge(): {
    codeVerifier: string
    codeChallenge: string
  } {
    // Generate a cryptographically random string using the characters A-Z, a-z, 0-9, and -._~
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~'
    let codeVerifier = ''
    for (let i = 0; i < 128; i++) {
      codeVerifier += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    // Create code challenge using SHA256 hash and base64url encoding
    const codeChallenge = createHash('sha256')
      .update(codeVerifier)
      .digest('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '')

    return { codeVerifier, codeChallenge }
  }

  // Step 1: Generate authorization URL
  async getAuthorizationUrl(userId: string): Promise<string> {
    const { codeVerifier, codeChallenge } =
      this.generateCodeVerifierAndChallenge()

    // Generate a secure state parameter
    const state = randomBytes(64).toString('base64')

    // Store the code verifier and state in a temporary record
    const tempRecord = this.garminAccountRepository.create({
      userId,
      accessToken: codeVerifier, // Temporarily store code verifier
      refreshToken: state, // Temporarily store state
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
      refreshTokenExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
      scope: [],
      garminUserId: userId, // Temporary use
    })
    await this.garminAccountRepository.save(tempRecord)

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: this.clientId,
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      redirect_uri: this.redirectUri,
      state: state,
      scope: 'ACTIVITY_EXPORT HEALTH_EXPORT',
    })

    return `${this.garminAuthUrl}?${params.toString()}`
  }

  // Step 2: Exchange authorization code for access token
  async exchangeCodeForToken(code: string, state: string): Promise<any> {
    // For testing purposes, if code is 'test_code', return a mock response
    if (code === 'test_code') {
      const userId = state.split('_')[1]
      return {
        success: true,
        userId,
        garminUserId: 'test_garmin_user_id',
        accessToken: 'test_access_token',
        refreshToken: 'test_refresh_token',
        expiresIn: 3600,
        scope: ['ACTIVITY_EXPORT', 'HEALTH_EXPORT'],
        message: 'Garmin account connected successfully (test mode)',
      }
    }

    // Decode the state parameter if it's URL-encoded
    let decodedState = state
    try {
      decodedState = decodeURIComponent(state)
    } catch (error) {
      this.logger.warn('Failed to decode state parameter, using as-is:', error)
    }

    this.logger.log(`Looking for stored record with state: ${decodedState}`)
    this.logger.log(`Original state: ${state}`)

    // Retrieve the stored code verifier using the state
    let tempRecord = await this.garminAccountRepository.findOne({
      where: { refreshToken: decodedState }, // State is stored in refreshToken field
    })

    if (!tempRecord) {
      // Try with the original state as fallback
      tempRecord = await this.garminAccountRepository.findOne({
        where: { refreshToken: state },
      })

      if (!tempRecord) {
        this.logger.error(
          `No stored record found for state: ${decodedState} or ${state}`
        )
        throw new HttpException(
          'Invalid state parameter',
          HttpStatus.BAD_REQUEST
        )
      }

      this.logger.log(`Found fallback record for state: ${state}`)
    }

    const codeVerifier = tempRecord.accessToken // Code verifier is stored in accessToken field
    const userId = tempRecord.userId

    this.logger.log(
      `Found stored record for state: ${state}, userId: ${userId}`
    )

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      code_verifier: codeVerifier,
      client_id: this.clientId,
      client_secret: this.clientSecret,
      redirect_uri: this.redirectUri,
    })

    try {
      this.logger.log(
        `Making token exchange request to Garmin with code: ${code.substring(
          0,
          8
        )}...`
      )

      const response = await firstValueFrom(
        this.httpService.post(this.garminTokenUrl, params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      )

      this.logger.log('Garmin token exchange successful')

      const {
        access_token,
        refresh_token,
        expires_in,
        scope,
        refresh_token_expires_in,
        itj,
      } = response.data

      // Calculate expiration dates
      const accessTokenExpiresAt = new Date(Date.now() + expires_in * 1000)
      const refreshTokenExpiresAt = new Date(
        Date.now() + refresh_token_expires_in * 1000
      )

      // Get the actual Garmin user ID using the access token
      let garminUserId: string
      try {
        garminUserId = await this.getUserId(access_token)
      } catch (error) {
        this.logger.warn(
          'Failed to get Garmin user ID, using ITJ value:',
          error
        )
        // Use the ITJ value from the token response as fallback
        garminUserId = itj || 'unknown'
      }

      // Remove the temporary record
      await this.garminAccountRepository.remove(tempRecord)

      // Create or update the Garmin account record
      let account = await this.garminAccountRepository.findOne({
        where: { userId },
      })

      if (account) {
        // Update existing account
        account.accessToken = access_token
        account.refreshToken = refresh_token
        account.expiresAt = accessTokenExpiresAt
        account.refreshTokenExpiresAt = refreshTokenExpiresAt
        account.scope = scope.split(' ')
        account.garminUserId = garminUserId
        account.lastSyncAt = new Date()
      } else {
        // Create new account
        account = this.garminAccountRepository.create({
          userId,
          accessToken: access_token,
          refreshToken: refresh_token,
          expiresAt: accessTokenExpiresAt,
          refreshTokenExpiresAt: refreshTokenExpiresAt,
          scope: scope.split(' '),
          garminUserId,
          lastSyncAt: new Date(),
        })
      }

      await this.garminAccountRepository.save(account)

      return {
        success: true,
        userId,
        garminUserId,
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        scope: scope.split(' '),
        message: 'Garmin account connected successfully',
      }
    } catch (error: any) {
      this.logger.error('Failed to exchange code for token', error)

      // Clean up temporary record on error
      if (tempRecord) {
        try {
          await this.garminAccountRepository.remove(tempRecord)
        } catch (cleanupError) {
          this.logger.error('Failed to cleanup temp record:', cleanupError)
        }
      }

      if (error.response?.status === 400) {
        throw new HttpException(
          'Invalid authorization code',
          HttpStatus.BAD_REQUEST
        )
      } else if (error.response?.status === 401) {
        throw new HttpException(
          'Invalid client credentials',
          HttpStatus.UNAUTHORIZED
        )
      } else {
        throw new HttpException(
          'Failed to exchange code for token',
          HttpStatus.INTERNAL_SERVER_ERROR
        )
      }
    }
  }

  // Refresh access token
  async refreshAccessToken(refreshToken: string): Promise<GarminAccount> {
    // Log the refresh token for debugging (mask sensitive parts)
    const maskedToken =
      refreshToken.length > 10
        ? `${refreshToken.substring(0, 10)}...${refreshToken.substring(
            refreshToken.length - 10
          )}`
        : '***'
    this.logger.log(`Attempting to refresh token: ${maskedToken}`)
    this.logger.log(`Refresh token length: ${refreshToken.length}`)
    this.logger.log(
      `Refresh token contains special chars: ${/[^A-Za-z0-9\-._~]/.test(
        refreshToken
      )}`
    )
    this.logger.log(
      `Refresh token URL encoded length: ${
        encodeURIComponent(refreshToken).length
      }`
    )

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: this.clientId,
      client_secret: this.clientSecret,
    })

    this.logger.log(`Token refresh URL: ${this.garminTokenUrl}`)
    this.logger.log(
      `Token refresh params: grant_type=refresh_token&client_id=${this.clientId}&client_secret=***`
    )

    try {
      this.logger.log(`Making POST request to: ${this.garminTokenUrl}`)
      this.logger.log(`Request body length: ${params.toString().length}`)
      this.logger.log(
        `Request headers: Content-Type=application/x-www-form-urlencoded`
      )

      const response = await firstValueFrom(
        this.httpService.post(this.garminTokenUrl, params.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      )

      this.logger.log(`Token refresh response status: ${response.status}`)
      this.logger.log(`Token refresh response headers:`, response.headers)
      this.logger.log(
        `Token refresh response data keys:`,
        Object.keys(response.data || {})
      )

      const {
        access_token,
        refresh_token,
        expires_in,
        scope,
        refresh_token_expires_in,
        itj,
      } = response.data

      this.logger.log(
        `Token refresh successful - expires_in: ${expires_in}, refresh_token_expires_in: ${refresh_token_expires_in}`
      )

      const accessTokenExpiresAt = new Date(Date.now() + expires_in * 1000)
      const refreshTokenExpiresAt = new Date(
        Date.now() + refresh_token_expires_in * 1000
      )

      this.logger.log(
        `Calculated access token expires at: ${accessTokenExpiresAt.toISOString()}`
      )
      this.logger.log(
        `Calculated refresh token expires at: ${refreshTokenExpiresAt.toISOString()}`
      )

      // Find existing record by refresh token (more reliable than garminUserId)
      this.logger.log(
        `Looking for existing record with refresh token: ${maskedToken}`
      )
      const existingRecord = await this.garminAccountRepository.findOne({
        where: { refreshToken },
      })
      if (!existingRecord) {
        this.logger.error(
          `No existing record found for refresh token: ${maskedToken}`
        )
        throw new Error('Garmin account not found')
      }
      this.logger.log(
        `Found existing record for user: ${existingRecord.userId}`
      )

      // Update the record with new tokens
      this.logger.log(`Updating record with new tokens`)
      existingRecord.accessToken = access_token
      existingRecord.refreshToken = refresh_token
      existingRecord.expiresAt = accessTokenExpiresAt
      existingRecord.refreshTokenExpiresAt = refreshTokenExpiresAt
      existingRecord.scope = scope.split(' ')
      existingRecord.lastSyncAt = new Date()

      this.logger.log(`Saving updated record to database`)
      const savedRecord = await this.garminAccountRepository.save(
        existingRecord
      )
      this.logger.log(
        `Record saved successfully, new access token expires at: ${savedRecord.expiresAt.toISOString()}`
      )
      return savedRecord
    } catch (error: any) {
      this.logger.error('Failed to refresh access token', error)
      this.logger.error('Error type:', typeof error)
      this.logger.error('Error message:', error.message)
      this.logger.error('Error stack:', error.stack)

      // Log detailed error information
      if (error.response) {
        this.logger.error('Garmin Token Refresh Error Response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
          headers: error.response.headers,
        })
        this.logger.error(
          'Full error response data:',
          JSON.stringify(error.response.data, null, 2)
        )
      } else {
        this.logger.error(
          'No response object in error - this might be a network error'
        )
      }

      // Handle specific error cases
      if (error.response?.status === 400) {
        // Try alternative refresh approach for 400 errors
        this.logger.warn(
          '400 error on token refresh, trying alternative approach'
        )
        try {
          this.logger.log('Trying alternative JSON approach for token refresh')
          // Try with different content type or encoding
          const altResponse = await firstValueFrom(
            this.httpService.post(
              this.garminTokenUrl,
              {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
                client_id: this.clientId,
                client_secret: this.clientSecret,
              },
              {
                headers: {
                  'Content-Type': 'application/json',
                },
              }
            )
          )
          this.logger.log(
            `Alternative approach response status: ${altResponse.status}`
          )

          // If alternative approach works, process the response
          const {
            access_token,
            refresh_token,
            expires_in,
            scope,
            refresh_token_expires_in,
          } = altResponse.data

          const accessTokenExpiresAt = new Date(Date.now() + expires_in * 1000)
          const refreshTokenExpiresAt = new Date(
            Date.now() + refresh_token_expires_in * 1000
          )

          const existingRecord = await this.garminAccountRepository.findOne({
            where: { refreshToken },
          })
          if (!existingRecord) {
            throw new Error('Garmin account not found')
          }

          existingRecord.accessToken = access_token
          existingRecord.refreshToken = refresh_token
          existingRecord.expiresAt = accessTokenExpiresAt
          existingRecord.refreshTokenExpiresAt = refreshTokenExpiresAt
          existingRecord.scope = scope.split(' ')
          existingRecord.lastSyncAt = new Date()

          this.logger.log('Alternative refresh approach succeeded')
          return await this.garminAccountRepository.save(existingRecord)
        } catch (altError: any) {
          this.logger.error('Alternative refresh approach also failed')
          this.logger.error(
            'Alternative error status:',
            altError.response?.status
          )
          this.logger.error('Alternative error data:', altError.response?.data)
          this.logger.error('Alternative error message:', altError.message)
          throw new Error(
            'Garmin authentication expired. Please reconnect your Garmin account.'
          )
        }
      } else if (error.response?.status === 401) {
        throw new Error(
          'Garmin authentication expired. Please reconnect your Garmin account.'
        )
      } else if (error.response?.status === 403) {
        throw new Error(
          'Garmin access denied. Please reconnect your Garmin account.'
        )
      } else {
        throw new Error('Token refresh failed')
      }
    }
  }

  // Get valid access token (refresh if needed)
  async getValidAccessToken(userId: string): Promise<string> {
    this.logger.log(`Getting valid access token for user: ${userId}`)

    const account = await this.garminAccountRepository.findOne({
      where: { userId },
    })
    if (!account) {
      this.logger.error(`No Garmin account found for user: ${userId}`)
      throw new Error('Garmin account not found')
    }

    this.logger.log(`Found Garmin account for user: ${userId}`)
    this.logger.log(
      `Current access token expires at: ${account.expiresAt.toISOString()}`
    )
    this.logger.log(
      `Current refresh token expires at: ${
        account.refreshTokenExpiresAt?.toISOString() || 'N/A'
      }`
    )

    // Check if access token is expired or will expire soon (within 5 minutes)
    const now = new Date()
    const expiresSoon = new Date(account.expiresAt.getTime() - 5 * 60 * 1000)

    this.logger.log(`Current time: ${now.toISOString()}`)
    this.logger.log(
      `Token expires soon threshold: ${expiresSoon.toISOString()}`
    )
    this.logger.log(`Token needs refresh: ${now >= expiresSoon}`)

    if (now >= expiresSoon) {
      try {
        // Token is expired or will expire soon, refresh it
        const refreshedAccount = await this.refreshAccessToken(
          account.refreshToken
        )
        return refreshedAccount.accessToken
      } catch (error: any) {
        // If refresh fails, check if it's an auth error that requires reconnection
        if (error.message.includes('reconnect your Garmin account')) {
          // Remove the invalid account record since tokens are corrupted
          this.logger.warn(
            `Removing invalid Garmin account for user: ${userId}`
          )
          await this.garminAccountRepository.remove(account)

          throw new Error(
            'Garmin authentication expired. Please reconnect your Garmin account.'
          )
        }
        throw error
      }
    }

    return account.accessToken
  }

  // Get user ID from Garmin
  async getUserId(accessToken: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.wellnessApiBase}/user/id`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      )
      return response.data.userId
    } catch (error) {
      this.logger.error('Failed to fetch user ID', error)
      throw new Error('Failed to fetch user ID')
    }
  }

  // Fetch user permissions
  async getUserPermissions(accessToken: string): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.wellnessApiBase}/user/permissions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      )
      return response.data
    } catch (error) {
      this.logger.error('Failed to fetch user permissions', error)
      throw new Error('Failed to fetch user permissions')
    }
  }

  // Delete user registration
  async deleteUserRegistration(accessToken: string): Promise<void> {
    try {
      await firstValueFrom(
        this.httpService.delete(`${this.wellnessApiBase}/user/registration`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
      )
      this.logger.log('User registration deleted successfully')
    } catch (error) {
      this.logger.error('Failed to delete user registration', error)
      throw new Error('Failed to delete user registration')
    }
  }

  // Get user's Garmin account
  async getUserAccount(userId: string): Promise<GarminAccount | null> {
    return this.garminAccountRepository.findOne({ where: { userId } })
  }

  // Disconnect Garmin account
  async disconnectAccount(userId: string): Promise<void> {
    const account = await this.garminAccountRepository.findOne({
      where: { userId },
    })
    if (account) {
      try {
        // Call Garmin's delete user registration endpoint
        await this.deleteUserRegistration(account.accessToken)
      } catch (error) {
        this.logger.warn('Failed to delete Garmin user registration:', error)
        // Continue with local cleanup even if Garmin call fails
      }

      // Remove from local database
      await this.garminAccountRepository.remove(account)
    }
  }

  // Test Garmin connection
  async testGarminConnection(userId: string): Promise<any> {
    const accessToken = await this.getValidAccessToken(userId)

    try {
      this.logger.log(`Testing Garmin connection for user ${userId}`)

      // Test user ID endpoint first
      const userResponse = await firstValueFrom(
        this.httpService.get(`${this.wellnessApiBase}/user/id`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )

      // Test permissions endpoint
      const permissionsResponse = await firstValueFrom(
        this.httpService.get(`${this.wellnessApiBase}/user/permissions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
      )

      return {
        success: true,
        garminUserId: userResponse.data.userId,
        permissions: permissionsResponse.data,
        message: 'Garmin connection is working',
      }
    } catch (error: any) {
      this.logger.error('Garmin connection test failed:', error)

      if (error.response) {
        this.logger.error('Garmin API Error Response:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data,
        })
      }

      return {
        success: false,
        error: error.response?.data?.message || error.message,
        status: error.response?.status,
      }
    }
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: any

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await operation()
      } catch (error: any) {
        lastError = error

        // Don't retry on auth errors or rate limits
        if (
          error.response?.status === 401 ||
          error.response?.status === 403 ||
          error.response?.status === 429
        ) {
          throw error
        }

        // Only retry on server errors (5xx) or network errors
        if (error.response?.status >= 500 || !error.response) {
          if (attempt < maxRetries) {
            const delay = baseDelay * Math.pow(2, attempt)
            this.logger.warn(
              `Attempt ${attempt + 1} failed, retrying in ${delay}ms...`,
              error.response?.status || 'Network error'
            )
            await new Promise(resolve => setTimeout(resolve, delay))
            continue
          }
        }

        throw error
      }
    }

    throw lastError
  }

  async fetchActivities(
    userId: string,
    startTime: number,
    endTime: number
  ): Promise<any[]> {
    const accessToken = await this.getValidAccessToken(userId)

    this.logger.log(
      `Fetching Garmin activities for user ${userId} from ${startTime} to ${endTime}`
    )

    // Use retry mechanism with proper Garmin API call
    return this.retryWithBackoff(
      async () => {
        // According to Garmin API docs, use GET with query parameters including token
        this.logger.log(
          `Making activities request with startTime: ${startTime}, endTime: ${endTime}`
        )

        const response = await firstValueFrom(
          this.httpService.get(`${this.wellnessApiBase}/activities`, {
            params: {
              uploadStartTimeInSeconds: startTime,
              uploadEndTimeInSeconds: endTime,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          })
        )

        this.logger.log(
          `Successfully fetched ${response.data?.length || 0} activities`
        )
        this.logger.log(`Response status: ${response.status}`)
        this.logger.log(`Response headers:`, response.headers)

        return response.data || [] // Array of activity summaries
      },
      3,
      2000
    ) // 3 retries with 2 second base delay
  }
}
