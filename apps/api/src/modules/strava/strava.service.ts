import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import fetch from 'node-fetch'
import { StravaAccount } from '../../entities/strava-account.entity'
import { StravaActivityDto } from './dto/strava-activity.dto'

@Injectable()
export class StravaService {
  private readonly logger = new Logger(StravaService.name)

  // Hardcoded credentials for testing
  private readonly STRAVA_CLIENT_ID = '165965'
  private readonly STRAVA_CLIENT_SECRET =
    '8f0119291cb417f21921608020f29ec51ae2bf81'

  constructor(
    @InjectRepository(StravaAccount)
    private accounts: Repository<StravaAccount>,
    private configService: ConfigService
  ) {}

  getAuthorizationUrl(userId: string): string {
    const clientId = this.STRAVA_CLIENT_ID
    const redirectUri = 'http://localhost:4000/api/strava/oauth/callback'
    const scope = 'read,activity:read_all'
    const state = userId // Use userId as state for security and to link the account
    this.logger.log(`Generating Strava authorization URL for user: ${userId}`)
    return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}&state=${state}`
  }

  async exchangeToken(code: string, userId: string): Promise<StravaAccount> {
    const clientId = this.STRAVA_CLIENT_ID
    const clientSecret = this.STRAVA_CLIENT_SECRET

    this.logger.log(`Exchanging Strava token for user: ${userId}`)

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(`Token exchange failed for user ${userId}: ${text}`)
      throw new Error(`Token exchange failed: ${text}`)
    }

    const data = (await res.json()) as any
    this.logger.log(`Successfully exchanged token for user: ${userId}`)

    let account = await this.accounts.findOne({ where: { userId } })
    if (!account) {
      account = new StravaAccount()
      account.userId = userId
    }
    account.accessToken = data.access_token
    account.refreshToken = data.refresh_token
    account.expiresAt = data.expires_at
    account.athleteId = data.athlete.id

    return this.accounts.save(account)
  }

  async findAccountByUserId(userId: string): Promise<StravaAccount | null> {
    return this.accounts.findOne({ where: { userId } })
  }

  private async refreshTokenIfNeeded(
    account: StravaAccount
  ): Promise<StravaAccount> {
    // Check if token expires within the next 5 minutes (300 seconds)
    const now = Math.floor(Date.now() / 1000)
    if (account.expiresAt > now + 300) return account

    this.logger.log(`Refreshing Strava token for user: ${account.userId}`)

    const clientId = this.STRAVA_CLIENT_ID
    const clientSecret = this.STRAVA_CLIENT_SECRET

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: account.refreshToken,
        grant_type: 'refresh_token',
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(
        `Token refresh failed for user ${account.userId}: ${text}`
      )
      throw new Error(`Token refresh failed: ${text}`)
    }

    const data = (await res.json()) as any
    this.logger.log(`Successfully refreshed token for user: ${account.userId}`)
    account.accessToken = data.access_token
    account.refreshToken = data.refresh_token
    account.expiresAt = data.expires_at
    return this.accounts.save(account)
  }

  async getRecentActivities(
    userId: string,
    limit = 10
  ): Promise<StravaActivityDto[]> {
    const account = await this.findAccountByUserId(userId)
    if (!account) {
      this.logger.warn(`No Strava account found for user: ${userId}`)
      throw new NotFoundException(
        'Strava account not found. Please connect your Strava account first.'
      )
    }

    try {
      await this.refreshTokenIfNeeded(account)
    } catch (error) {
      this.logger.error(`Failed to refresh token for user ${userId}: ${error}`)
      throw new Error(
        'Failed to refresh Strava token. Please reconnect your account.'
      )
    }

    this.logger.log(`Fetching recent activities for user: ${userId}`)

    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${limit}`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(
        `Failed to fetch activities for user ${userId}: ${text}`
      )
      throw new Error(`Failed to fetch activities: ${text}`)
    }

    const data = (await res.json()) as any[]
    this.logger.log(
      `Successfully fetched ${data.length} activities for user: ${userId}`
    )

    return data.map(a => ({
      id: a.id.toString(),
      name: a.name,
      distance: a.distance,
      movingTime: a.moving_time,
      startDate: a.start_date,
      description: a.description,
    }))
  }

  // Method to manually create a test account with hardcoded tokens
  async createTestAccount(userId: string): Promise<StravaAccount> {
    this.logger.log(`Creating test Strava account for user: ${userId}`)

    let account = await this.accounts.findOne({ where: { userId } })
    if (!account) {
      account = new StravaAccount()
      account.userId = userId
    }

    // Use the refreshed token that should have the correct scope
    // This token was refreshed and should have activity:read_all permission
    account.accessToken = 'c7f75a09288d1cb61459507ce72d9bca4a7d32d9'
    account.refreshToken = '2f5e6e7e672585ca6a7a5c5cec3be2a03bb5e31e'
    account.expiresAt = Math.floor(
      new Date('2025-06-27T12:31:35Z').getTime() / 1000
    )
    account.athleteId = 56926193 // Updated with real athlete ID from test

    return this.accounts.save(account)
  }
}
