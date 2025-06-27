import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import fetch from 'node-fetch'
import { StravaAccount } from '../../entities/strava-account.entity'
import { StravaActivityDto } from './dto/strava-activity.dto'
import { Activity, DetailedAthlete } from '@lominic/strava-api-types'

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

  /**
   * Generates the Strava authorization URL.
   * @param userId - The ID of the user to associate with the Strava account.
   * @returns The authorization URL.
   */
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

  /**
   * Exchanges an authorization code for an access token.
   * @param code - The authorization code from Strava.
   * @param userId - The ID of the user to associate with the Strava account.
   * @returns The created or updated Strava account.
   */
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

    const data = (await res.json()) as {
      access_token: string
      refresh_token: string
      expires_at: number
      athlete: { id: number }
    }
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

  /**
   * Finds a Strava account by user ID.
   * @param userId - The ID of the user.
   * @returns The Strava account, or null if not found.
   */
  async findAccountByUserId(userId: string): Promise<StravaAccount | null> {
    return this.accounts.findOne({ where: { userId } })
  }

  /**
   * Refreshes the access token if it has expired.
   * @param account - The Strava account.
   * @returns The updated Strava account.
   */
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

    const data = (await res.json()) as {
      access_token: string
      refresh_token: string
      expires_at: number
    }
    this.logger.log(`Successfully refreshed token for user: ${account.userId}`)
    account.accessToken = data.access_token
    account.refreshToken = data.refresh_token
    account.expiresAt = data.expires_at
    return this.accounts.save(account)
  }

  /**
   * Gets recent activities for a user from the Strava API.
   * @param userId - The ID of the user.
   * @param limit - The maximum number of activities to return.
   * @returns A list of recent activities.
   */
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

    const activities = (await res.json()) as Activity[]
    this.logger.log(
      `Successfully fetched ${activities.length} activities for user: ${userId}`
    )

    console.log(activities[0])

    return activities.map(activity => ({
      id: activity.id.toString(),
      name: activity.name,
      type: activity.type,
      sport_type: activity.sport_type,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      start_date: activity.start_date,
      start_date_local: activity.start_date_local,
      timezone: activity.timezone,
      utc_offset: activity.utc_offset,
      start_latlng: activity.start_latlng
        ? [activity.start_latlng[0], activity.start_latlng[1]]
        : undefined,
      end_latlng: activity.end_latlng
        ? [activity.end_latlng[0], activity.end_latlng[1]]
        : undefined,
      achievement_count: activity.achievement_count,
      kudos_count: activity.kudos_count,
      comment_count: activity.comment_count,
      athlete_count: activity.athlete_count,
      photo_count: activity.photo_count,
      trainer: activity.trainer,
      commute: activity.commute,
      manual: activity.manual,
      private: activity.private,
      flagged: activity.flagged,
      gear_id: activity.gear_id,
      from_accepted_tag: activity.from_accepted_tag,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_cadence: activity.average_cadence,
      average_temp: activity.average_temp,
      average_watts: activity.average_watts,
      weighted_average_watts: activity.weighted_average_watts,
      kilojoules: activity.kilojoules,
      device_watts: activity.device_watts,
      has_heartrate: activity.has_heartrate,
      max_watts: activity.max_watts,
      elev_high: activity.elev_high,
      elev_low: activity.elev_low,
      pr_count: activity.pr_count,
      total_photo_count: activity.total_photo_count,
      has_kudoed: activity.has_kudoed,
      workout_type: activity.workout_type,
      suffer_score: activity.suffer_score,
      description: activity.description,
      calories: activity.calories,
      polyline: activity.map?.summary_polyline,
      // Additional fields from actual API response
      resource_state: activity.resource_state,
      external_id: activity.external_id,
      upload_id: activity.upload_id,
      upload_id_str: activity.upload_id_str,
      location_city: activity.location_city,
      location_state: activity.location_state,
      location_country: activity.location_country,
      visibility: activity.visibility,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      heartrate_opt_out: activity.heartrate_opt_out,
      display_hide_heartrate_option: activity.display_hide_heartrate_option,
    }))
  }

  /**
   * Creates a test Strava account with hardcoded tokens for development.
   * @param userId - The ID of the user.
   * @returns The created test account.
   */
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

  /**
   * Gets the authenticated athlete's profile from the Strava API.
   * @param userId - The ID of the user.
   * @returns The detailed athlete profile.
   */
  async getAthlete(userId: string): Promise<DetailedAthlete> {
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

    this.logger.log(`Fetching athlete data for user: ${userId}`)

    const res = await fetch(`https://www.strava.com/api/v3/athlete`, {
      headers: { Authorization: `Bearer ${account.accessToken}` },
    })

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(`Failed to fetch athlete data for user ${userId}: ${text}`)
      throw new Error(`Failed to fetch athlete data: ${text}`)
    }

    const athlete = (await res.json()) as DetailedAthlete
    this.logger.log(`Successfully fetched athlete data for user: ${userId}`)

    return athlete
  }
}
