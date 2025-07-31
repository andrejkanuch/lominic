import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import * as crypto from 'crypto'
import { GarminAccount } from '../../entities/garmin-account.entity'
import { GarminActivity } from './dto/garmin-activity.dto'

@Injectable()
export class GarminService {
  // Temporary storage for PKCE verifiers (in production, use Redis or database)
  private verifierStore = new Map<
    string,
    { verifier: string; userId: string; timestamp: number }
  >()

  constructor(
    @InjectRepository(GarminAccount)
    private garminAccountRepository: Repository<GarminAccount>,
    private configService: ConfigService,
    private httpService: HttpService
  ) {}

  /**
   * Generate a random code verifier for PKCE
   */
  private generateCodeVerifier(): string {
    const array = new Uint8Array(32)
    crypto.getRandomValues(array)
    return crypto.randomBytes(32).toString('base64url')
  }

  /**
   * Generate code challenge from verifier using SHA256
   */
  private generateCodeChallenge(verifier: string): string {
    const hash = crypto.createHash('sha256').update(verifier).digest()
    return hash.toString('base64url')
  }

  /**
   * Generate state parameter for CSRF protection
   */
  private generateState(): string {
    return crypto.randomBytes(32).toString('base64url')
  }

  /**
   * Clean up old verifier entries (older than 10 minutes)
   */
  private cleanupVerifierStore(): void {
    const tenMinutesAgo = Date.now() - 10 * 60 * 1000
    for (const [state, data] of this.verifierStore.entries()) {
      if (data.timestamp < tenMinutesAgo) {
        this.verifierStore.delete(state)
      }
    }
  }

  /**
   * Build authorization URL for Garmin OAuth2 PKCE flow
   */
  buildAuthUrl(userId: string): {
    url: string
    state: string
    verifier: string
  } {
    const clientId = this.configService.get<string>('GARMIN_CLIENT_ID')
    const redirectUri = this.configService.get<string>('GARMIN_REDIRECT_URI')
    const scopes = this.configService.get<string>(
      'GARMIN_SCOPES',
      'ACTIVITY_EXPORT HEALTH_EXPORT'
    )

    if (!clientId || !redirectUri) {
      throw new HttpException(
        'Garmin OAuth configuration missing',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    const verifier = this.generateCodeVerifier()
    const challenge = this.generateCodeChallenge(verifier)
    const state = this.generateState()

    const authUrl = new URL('https://connect.garmin.com/oauth2Confirm')
    authUrl.searchParams.append('client_id', clientId)
    authUrl.searchParams.append('response_type', 'code')
    authUrl.searchParams.append('redirect_uri', redirectUri)
    authUrl.searchParams.append('scope', scopes)
    authUrl.searchParams.append('code_challenge', challenge)
    authUrl.searchParams.append('code_challenge_method', 'S256')
    authUrl.searchParams.append('state', state)

    // Store verifier temporarily (clean up old entries)
    this.cleanupVerifierStore()
    this.verifierStore.set(state, {
      verifier,
      userId,
      timestamp: Date.now(),
    })

    return {
      url: authUrl.toString(),
      state,
      verifier,
    }
  }

  /**
   * Exchange authorization code for access token
   */
  async exchangeCodeForTokens(
    code: string,
    state: string
  ): Promise<{ tokens: any; userId: string }> {
    // Get verifier from storage
    const storedData = this.verifierStore.get(state)
    if (!storedData) {
      throw new HttpException(
        'Invalid or expired state parameter',
        HttpStatus.BAD_REQUEST
      )
    }

    const { verifier, userId } = storedData

    // Clean up the stored verifier
    this.verifierStore.delete(state)
    const clientId = this.configService.get<string>('GARMIN_CLIENT_ID')
    const clientSecret = this.configService.get<string>('GARMIN_CLIENT_SECRET')
    const redirectUri = this.configService.get<string>('GARMIN_REDIRECT_URI')

    if (!clientId || !clientSecret || !redirectUri) {
      throw new HttpException(
        'Garmin OAuth configuration missing',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://diauth.garmin.com/di-oauth2-service/oauth/token',
          new URLSearchParams({
            grant_type: 'authorization_code',
            client_id: clientId,
            client_secret: clientSecret,
            code,
            code_verifier: verifier,
            redirect_uri: redirectUri,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
      )

      return { tokens: response.data, userId }
    } catch (error: any) {
      console.error(
        'Token exchange error:',
        error.response?.data || error.message
      )
      throw new HttpException(
        `Token exchange failed: ${
          error.response?.data?.error || error.message
        }`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<any> {
    const clientId = this.configService.get<string>('GARMIN_CLIENT_ID')
    const clientSecret = this.configService.get<string>('GARMIN_CLIENT_SECRET')

    if (!clientId || !clientSecret) {
      throw new HttpException(
        'Garmin OAuth configuration missing',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }

    try {
      const response = await firstValueFrom(
        this.httpService.post(
          'https://diauth.garmin.com/di-oauth2-service/oauth/token',
          new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
          }).toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
      )

      return response.data
    } catch (error: any) {
      console.error(
        'Token refresh error:',
        error.response?.data || error.message
      )
      throw new HttpException(
        `Token refresh failed: ${error.response?.data?.error || error.message}`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  /**
   * Fetch Garmin user ID using access token
   */
  async fetchGarminUserId(accessToken: string): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://apis.garmin.com/wellness-api/rest/user/id',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      )

      return response.data.userId
    } catch (error: any) {
      console.error(
        'Fetch user ID error:',
        error.response?.data || error.message
      )
      throw new HttpException(
        `Failed to fetch Garmin user ID: ${
          error.response?.data?.error || error.message
        }`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  /**
   * Fetch user permissions using access token
   */
  async fetchUserPermissions(accessToken: string): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          'https://apis.garmin.com/wellness-api/rest/user/permissions',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      )

      // Garmin returns permissions in format: {"permissions":["ACTIVITY_EXPORT","HEALTH_EXPORT"]}
      const permissions = response.data?.permissions || response.data

      // Ensure we return an array
      if (Array.isArray(permissions)) {
        return permissions
      }

      // If it's a string, split by space (common format: "ACTIVITY_EXPORT HEALTH_EXPORT")
      if (typeof permissions === 'string') {
        return permissions.split(' ')
      }

      return []
    } catch (error: any) {
      console.error(
        'Fetch permissions error:',
        error.response?.data || error.message
      )
      throw new HttpException(
        `Failed to fetch user permissions: ${
          error.response?.data?.error || error.message
        }`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  /**
   * Store Garmin account in database
   */
  async storeGarminAccount(
    userId: string,
    garminUserId: string,
    tokens: any,
    permissions: string[]
  ): Promise<GarminAccount> {
    const expiresAt = new Date(Date.now() + (tokens.expires_in - 600) * 1000) // Subtract 10 minutes
    const refreshTokenExpiresAt = new Date(
      Date.now() + (tokens.refresh_token_expires_in - 600) * 1000
    )

    // Check if account already exists
    const existingAccount = await this.garminAccountRepository.findOne({
      where: { userId },
    })

    if (existingAccount) {
      // Update existing account
      existingAccount.accessToken = tokens.access_token
      existingAccount.refreshToken = tokens.refresh_token
      existingAccount.expiresAt = expiresAt
      existingAccount.refreshTokenExpiresAt = refreshTokenExpiresAt
      existingAccount.scope = permissions
      existingAccount.garminUserId = garminUserId
      existingAccount.isMarkedForDeletion = false
      existingAccount.markedForDeletionAt = null

      return this.garminAccountRepository.save(existingAccount)
    } else {
      // Create new account
      const garminAccount = this.garminAccountRepository.create({
        userId,
        garminUserId,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiresAt,
        refreshTokenExpiresAt,
        scope: permissions,
      })

      return this.garminAccountRepository.save(garminAccount)
    }
  }

  /**
   * Get Garmin account for user
   */
  async getGarminAccount(userId: string): Promise<GarminAccount | null> {
    return this.garminAccountRepository.findOne({
      where: { userId, isMarkedForDeletion: false },
    })
  }

  /**
   * Check if user has valid Garmin connection
   */
  async isGarminConnected(userId: string): Promise<boolean> {
    const account = await this.getGarminAccount(userId)
    if (!account) return false

    // Check if access token is expired
    if (new Date() >= account.expiresAt) {
      try {
        // Try to refresh token
        const newTokens = await this.refreshToken(account.refreshToken)
        await this.storeGarminAccount(
          userId,
          account.garminUserId,
          newTokens,
          account.scope
        )
        return true
      } catch (error) {
        // Token refresh failed, user needs to reconnect
        return false
      }
    }

    return true
  }

  /**
   * Delete user registration from Garmin
   */
  async deleteUserRegistration(accessToken: string): Promise<boolean> {
    try {
      await firstValueFrom(
        this.httpService.delete(
          'https://apis.garmin.com/wellness-api/rest/user/registration',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
      )

      return true
    } catch (error: any) {
      console.error(
        'Delete registration error:',
        error.response?.data || error.message
      )
      throw new HttpException(
        `Failed to delete user registration: ${
          error.response?.data?.error || error.message
        }`,
        HttpStatus.BAD_REQUEST
      )
    }
  }

  /**
   * Disconnect Garmin account
   */
  async disconnectGarminAccount(userId: string): Promise<boolean> {
    const account = await this.getGarminAccount(userId)
    if (!account) {
      throw new HttpException('Garmin account not found', HttpStatus.NOT_FOUND)
    }

    try {
      // Delete registration from Garmin
      await this.deleteUserRegistration(account.accessToken)

      // Mark for deletion in database
      account.isMarkedForDeletion = true
      account.markedForDeletionAt = new Date()
      await this.garminAccountRepository.save(account)

      return true
    } catch (error) {
      console.error('Disconnect error:', error)
      throw new HttpException(
        'Failed to disconnect Garmin account',
        HttpStatus.INTERNAL_SERVER_ERROR
      )
    }
  }

  /**
   * Get activities from Garmin (placeholder - implement based on available permissions)
   */
  async getGarminActivities(
    userId: string,
    limit: number,
    startTime?: number,
    endTime?: number
  ): Promise<GarminActivity[]> {
    const account = await this.getGarminAccount(userId)
    if (!account) {
      throw new HttpException('Garmin account not found', HttpStatus.NOT_FOUND)
    }

    // Check if token needs refresh
    if (new Date() >= account.expiresAt) {
      const newTokens = await this.refreshToken(account.refreshToken)
      await this.storeGarminAccount(
        userId,
        account.garminUserId,
        newTokens,
        account.scope
      )
      account.accessToken = newTokens.access_token
    }

    // Note: This is a placeholder. The actual activities endpoint depends on your app's permissions
    // You'll need to implement specific endpoints based on what permissions your app has
    throw new HttpException(
      'Activities endpoint not implemented. Check your app permissions and implement specific endpoints.',
      HttpStatus.NOT_IMPLEMENTED
    )
  }
}
