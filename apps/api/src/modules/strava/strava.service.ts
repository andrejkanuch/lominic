import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import fetch from 'node-fetch'
import { StravaAccount } from '../../entities/strava-account.entity'
import { StravaActivityDto } from './dto/strava-activity.dto'
import { StreamSetDto } from './dto/stream-set.dto'
import { DataRetentionService } from '../data-retention/data-retention.service'
import {
  DetailedActivity,
  DetailedAthlete,
  Zones,
  ActivityStats,
  Kudoer,
  ActivityZone,
  Comment as StravaComment,
  StreamSet,
  HeartRateZoneRanges,
} from '@lominic/strava-api-types'

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
    private configService: ConfigService,
    private dataRetentionService: DataRetentionService
  ) {}

  /**
   * Generates the Strava authorization URL.
   * @param userId - The ID of the user to associate with the Strava account.
   * @returns The authorization URL.
   */
  getAuthorizationUrl(userId: string, forceReauthorize = false): string {
    const clientId = this.STRAVA_CLIENT_ID
    const redirectUri = 'http://localhost:4000/api/strava/oauth/callback'
    const scope = 'read,activity:read_all,profile:read_all'
    const state = userId // Use userId as state for security and to link the account
    const approvalPrompt = forceReauthorize ? 'force' : 'auto'

    this.logger.log(
      `Generating Strava authorization URL for user: ${userId}${
        forceReauthorize ? ' (forcing re-authorization)' : ''
      }`
    )
    return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=${scope}&approval_prompt=${approvalPrompt}&state=${state}`
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

      // Parse the error response to provide better error messages
      let errorMessage = 'Token refresh failed'
      try {
        const errorData = JSON.parse(text)
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch {
        // If we can't parse the JSON, use the raw text
        errorMessage = text
      }

      // Provide specific error messages based on common Strava errors
      if (
        errorMessage.includes('invalid_grant') ||
        errorMessage.includes('invalid refresh token')
      ) {
        throw new Error(
          'Your Strava connection has expired. Please reconnect your account.'
        )
      } else if (errorMessage.includes('invalid_client')) {
        throw new Error(
          'Strava application configuration error. Please contact support.'
        )
      } else if (errorMessage.includes('rate limit')) {
        throw new Error('Strava rate limit exceeded. Please try again later.')
      } else {
        throw new Error(`Failed to refresh Strava token: ${errorMessage}`)
      }
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
      // Re-throw the specific error message from refreshTokenIfNeeded
      throw error
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

      // Parse the error response to provide better error messages
      let errorMessage = 'Failed to fetch activities'
      try {
        const errorData = JSON.parse(text)
        if (errorData.message) {
          errorMessage = errorData.message
        } else if (errorData.error) {
          errorMessage = errorData.error
        }
      } catch {
        // If we can't parse the JSON, use the raw text
        errorMessage = text
      }

      // Provide specific error messages based on common Strava API errors
      if (res.status === 401) {
        throw new Error(
          'Your Strava access has expired. Please reconnect your account.'
        )
      } else if (res.status === 403) {
        throw new Error(
          'You do not have permission to access this data. Please check your Strava privacy settings.'
        )
      } else if (res.status === 429) {
        throw new Error('Strava rate limit exceeded. Please try again later.')
      } else if (res.status >= 500) {
        throw new Error(
          'Strava service is temporarily unavailable. Please try again later.'
        )
      } else {
        throw new Error(`Failed to fetch activities: ${errorMessage}`)
      }
    }

    const activities = (await res.json()) as DetailedActivity[]
    this.logger.log(
      `Successfully fetched ${activities.length} activities for user: ${userId}`
    )

    // Update last sync timestamp for data retention
    await this.dataRetentionService.updateStravaAccountLastSync(account.id)

    return activities.map(activity => ({
      id: activity.id.toString(),
      resource_state: activity.resource_state,
      external_id: activity.external_id,
      upload_id: activity.upload_id?.toString(),
      athlete: {
        id: activity.athlete.id,
        resource_state: activity.athlete.resource_state,
      },
      name: activity.name,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      elev_high: activity.elev_high,
      elev_low: activity.elev_low,
      type: activity.type,
      start_date: activity.start_date,
      start_date_local: activity.start_date_local,
      timezone: activity.timezone,
      start_latlng: activity.start_latlng
        ? {
            lat: activity.start_latlng[0],
            lng: activity.start_latlng[1],
          }
        : undefined,
      end_latlng: activity.end_latlng
        ? {
            lat: activity.end_latlng[0],
            lng: activity.end_latlng[1],
          }
        : undefined,
      achievement_count: activity.achievement_count,
      pr_count: activity.pr_count,
      kudos_count: activity.kudos_count,
      comment_count: activity.comment_count,
      athlete_count: activity.athlete_count,
      photo_count: activity.photo_count,
      total_photo_count: activity.total_photo_count,
      map: {
        id: activity.map.id,
        polyline: activity.map.polyline,
        resource_state: activity.map.resource_state,
        summary_polyline: activity.map.summary_polyline,
      },
      trainer: activity.trainer,
      commute: activity.commute,
      manual: activity.manual,
      private: activity.private,
      flagged: activity.flagged,
      workout_type: activity.workout_type,
      gear_id: activity.gear_id,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_cadence: activity.average_cadence,
      average_temp: activity.average_temp,
      average_watts: activity.average_watts,
      max_watts: activity.max_watts,
      weighted_average_watts: activity.weighted_average_watts,
      kilojoules: activity.kilojoules,
      device_watts: activity.device_watts,
      has_heartrate: true,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories,
      suffer_score: activity.suffer_score,
      has_kudoed: activity.has_kudoed,
      // Deprecated fields
      location_city: activity.location_city,
      location_state: activity.location_state,
      location_country: activity.location_country,
      // DetailedActivity only fields (if present)
      description: activity.description,
      gear: activity.gear
        ? {
            id: activity.gear.id,
            primary: activity.gear.primary,
            name: activity.gear.name,
            resource_state: activity.gear.resource_state,
            distance: activity.gear.distance,
          }
        : undefined,
      segment_efforts: activity.segment_efforts?.map(effort => ({
        id: effort.id.toString(),
        resource_state: effort.resource_state,
        name: effort.name,
        athlete: {
          id: effort.athlete.id,
          resource_state: effort.athlete.resource_state,
        },
        elapsed_time: effort.elapsed_time,
        moving_time: effort.moving_time,
        start_date: effort.start_date,
        start_date_local: effort.start_date_local,
        distance: effort.distance,
        start_index: effort.start_index,
        end_index: effort.end_index,
        average_cadence: effort.average_cadence,
        device_watts: effort.device_watts,
        average_watts: effort.average_watts,
        kom_rank: effort.kom_rank,
        pr_rank: effort.pr_rank,
        hidden: effort.hidden ?? false,
      })),
      splits_metric: activity.splits_metric?.map(split => ({
        distance: split.distance,
        elapsed_time: split.elapsed_time,
        elevation_difference: split.elevation_difference,
        moving_time: split.moving_time,
        split: split.split,
        average_speed: split.average_speed,
        pace_zone: split.pace_zone,
      })),
      splits_standard: activity.splits_standard?.map(split => ({
        distance: split.distance,
        elapsed_time: split.elapsed_time,
        elevation_difference: split.elevation_difference,
        moving_time: split.moving_time,
        split: split.split,
        average_speed: split.average_speed,
        pace_zone: split.pace_zone,
      })),
      laps: activity.laps?.map(lap => ({
        id: lap.id.toString(),
        resource_state: lap.resource_state,
        name: lap.name,
        athlete: {
          id: lap.athlete.id,
          resource_state: lap.athlete.resource_state,
        },
        elapsed_time: lap.elapsed_time,
        moving_time: lap.moving_time,
        start_date: lap.start_date,
        start_date_local: lap.start_date_local,
        distance: lap.distance,
        start_index: lap.start_index,
        end_index: lap.end_index,
        total_elevation_gain: lap.total_elevation_gain,
        average_speed: lap.average_speed,
        max_speed: lap.max_speed,
        average_cadence: lap.average_cadence,
        device_watts: lap.device_watts,
        average_watts: lap.average_watts,
        lap_index: lap.lap_index,
        split: lap.split,
      })),
      best_efforts: activity.best_efforts?.map(effort => ({
        id: effort.id.toString(),
        resource_state: effort.resource_state,
        name: effort.name,
        athlete: {
          id: effort.athlete.id,
          resource_state: effort.athlete.resource_state,
        },
        elapsed_time: effort.elapsed_time,
        moving_time: effort.moving_time,
        start_date: effort.start_date,
        start_date_local: effort.start_date_local,
        distance: effort.distance,
        start_index: effort.start_index,
        end_index: effort.end_index,
        average_cadence: effort.average_cadence,
        device_watts: effort.device_watts,
        average_watts: effort.average_watts,
        kom_rank: effort.kom_rank,
        pr_rank: effort.pr_rank,
        hidden: effort.hidden ?? false,
      })),
      device_name: activity.device_name,
      embed_token: activity.embed_token,
      photos: activity.photos
        ? {
            count: activity.photos.count,
            primary: activity.photos.primary
              ? {
                  id: activity.photos.primary.id,
                  unique_id: activity.photos.primary.unique_id,
                  urls: activity.photos.primary.urls,
                  source: activity.photos.primary.source,
                }
              : undefined,
            use_primary_photo: activity.photos.use_primary_photo,
          }
        : undefined,
      // Additional fields (may not be available in all activity types)
      sport_type: activity.sport_type,
      from_accepted_tag: (activity as any).from_accepted_tag,
      polyline: (activity as any).polyline,
    }))
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
      this.logger.error(
        `Failed to fetch athlete data for user ${userId}: ${text}`
      )
      throw new Error(`Failed to fetch athlete data: ${text}`)
    }

    const athlete = (await res.json()) as DetailedAthlete
    this.logger.log(`Successfully fetched athlete data for user: ${userId}`)

    return athlete
  }

  /**
   * Gets the authenticated athlete's zones from the Strava API.
   * @param userId - The ID of the user.
   * @returns The athlete's zones.
   */
  async getAthleteZones(userId: string): Promise<Zones> {
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

    this.logger.log(`Fetching athlete zones for user: ${userId}`)

    const res = await fetch(`https://www.strava.com/api/v3/athlete/zones`, {
      headers: { Authorization: `Bearer ${account.accessToken}` },
    })

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(
        `Failed to fetch athlete zones for user ${userId}: ${text}`
      )
      throw new Error(`Failed to fetch athlete zones: ${text}`)
    }

    const zones = (await res.json()) as Zones
    this.logger.log(`Successfully fetched athlete zones for user: ${userId}`)

    return zones
  }

  /**
   * Gets the authenticated athlete's stats from the Strava API.
   * @param userId - The ID of the user.
   * @returns The athlete's stats.
   */
  async getAthleteStats(userId: string): Promise<ActivityStats> {
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

    this.logger.log(`Fetching athlete stats for user: ${userId}`)

    const res = await fetch(
      `https://www.strava.com/api/v3/athletes/${account.athleteId}/stats`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(
        `Failed to fetch athlete stats for user ${userId}: ${text}`
      )
      throw new Error(`Failed to fetch athlete stats: ${text}`)
    }

    const stats = (await res.json()) as ActivityStats
    this.logger.log(`Successfully fetched athlete stats for user: ${userId}`)

    return stats
  }

  /**
   * Gets a specific activity by its ID from the Strava API.
   * @param userId - The ID of the user.
   * @param activityId - The ID of the activity.
   * @returns The detailed activity data.
   */
  async getActivityById(
    userId: string,
    activityId: number
  ): Promise<StravaActivityDto> {
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

    this.logger.log(`Fetching activity ${activityId} for user: ${userId}`)

    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      this.logger.error(
        `Failed to fetch activity ${activityId} for user ${userId}: ${text}`
      )
      throw new Error(`Failed to fetch activity: ${text}`)
    }

    const activity = (await res.json()) as DetailedActivity
    this.logger.log(
      `Successfully fetched activity ${activityId} for user: ${userId}`
    )

    // Map to DTO with only official Strava API fields
    return {
      id: activity.id.toString(),
      resource_state: activity.resource_state,
      external_id: activity.external_id,
      upload_id: activity.upload_id?.toString(),
      athlete: activity.athlete,
      name: activity.name,
      distance: activity.distance,
      moving_time: activity.moving_time,
      elapsed_time: activity.elapsed_time,
      total_elevation_gain: activity.total_elevation_gain,
      elev_high: activity.elev_high,
      elev_low: activity.elev_low,
      type: activity.type,
      start_date: activity.start_date,
      start_date_local: activity.start_date_local,
      timezone: activity.timezone,
      start_latlng: activity.start_latlng
        ? {
            lat: activity.start_latlng[0],
            lng: activity.start_latlng[1],
          }
        : undefined,
      end_latlng: activity.end_latlng
        ? {
            lat: activity.end_latlng[0],
            lng: activity.end_latlng[1],
          }
        : undefined,
      achievement_count: activity.achievement_count,
      pr_count: activity.pr_count,
      kudos_count: activity.kudos_count,
      comment_count: activity.comment_count,
      athlete_count: activity.athlete_count,
      photo_count: activity.photo_count,
      total_photo_count: activity.total_photo_count,
      map: activity.map,
      trainer: activity.trainer,
      commute: activity.commute,
      manual: activity.manual,
      private: activity.private,
      flagged: activity.flagged,
      workout_type: activity.workout_type,
      gear_id: activity.gear_id,
      average_speed: activity.average_speed,
      max_speed: activity.max_speed,
      average_cadence: activity.average_cadence,
      average_temp: activity.average_temp,
      average_watts: activity.average_watts,
      max_watts: activity.max_watts,
      weighted_average_watts: activity.weighted_average_watts,
      kilojoules: activity.kilojoules,
      device_watts: activity.device_watts,
      has_heartrate: true,
      average_heartrate: activity.average_heartrate,
      max_heartrate: activity.max_heartrate,
      calories: activity.calories,
      suffer_score: activity.suffer_score,
      has_kudoed: activity.has_kudoed,
      location_city: activity.location_city,
      location_state: activity.location_state,
      location_country: activity.location_country,
      description: activity.description,
      gear: activity.gear,
      segment_efforts: activity.segment_efforts?.map(effort => ({
        id: effort.id.toString(),
        resource_state: effort.resource_state,
        name: effort.name,
        athlete: effort.athlete,
        elapsed_time: effort.elapsed_time,
        moving_time: effort.moving_time,
        start_date: effort.start_date,
        start_date_local: effort.start_date_local,
        distance: effort.distance,
        start_index: effort.start_index,
        end_index: effort.end_index,
        average_cadence: effort.average_cadence,
        device_watts: effort.device_watts,
        average_watts: effort.average_watts,
        kom_rank: effort.kom_rank,
        pr_rank: effort.pr_rank,
        hidden: effort.hidden ?? false,
      })),
      splits_metric: activity.splits_metric,
      splits_standard: activity.splits_standard,
      laps: activity.laps?.map(lap => ({
        id: lap.id.toString(),
        resource_state: lap.resource_state,
        name: lap.name,
        athlete: lap.athlete,
        elapsed_time: lap.elapsed_time,
        moving_time: lap.moving_time,
        start_date: lap.start_date,
        start_date_local: lap.start_date_local,
        distance: lap.distance,
        start_index: lap.start_index,
        end_index: lap.end_index,
        total_elevation_gain: lap.total_elevation_gain,
        average_speed: lap.average_speed,
        max_speed: lap.max_speed,
        average_cadence: lap.average_cadence,
        device_watts: lap.device_watts,
        average_watts: lap.average_watts,
        lap_index: lap.lap_index,
        split: lap.split,
      })),
      best_efforts: activity.best_efforts?.map(effort => ({
        id: effort.id.toString(),
        resource_state: effort.resource_state,
        name: effort.name,
        athlete: effort.athlete,
        elapsed_time: effort.elapsed_time,
        moving_time: effort.moving_time,
        start_date: effort.start_date,
        start_date_local: effort.start_date_local,
        distance: effort.distance,
        start_index: effort.start_index,
        end_index: effort.end_index,
        average_cadence: effort.average_cadence,
        device_watts: effort.device_watts,
        average_watts: effort.average_watts,
        kom_rank: effort.kom_rank,
        pr_rank: effort.pr_rank,
        hidden: effort.hidden ?? false,
      })),
      device_name: activity.device_name,
      embed_token: activity.embed_token,
      photos: activity.photos as any,

      sport_type: activity.sport_type,
      utc_offset: (activity as any).utc_offset,
      from_accepted_tag: (activity as any).from_accepted_tag,
      polyline: (activity as any).polyline,
    }
  }

  /**
   * Gets comments for a specific activity from the Strava API.
   * @param userId - The ID of the user.
   * @param activityId - The ID of the activity.
   * @returns A list of comments.
   */
  async getActivityComments(
    userId: string,
    activityId: number
  ): Promise<StravaComment[]> {
    const account = await this.findAccountByUserId(userId)
    if (!account) {
      throw new NotFoundException('Strava account not found.')
    }
    await this.refreshTokenIfNeeded(account)

    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}/comments`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to fetch activity comments: ${text}`)
    }

    return (await res.json()) as StravaComment[]
  }

  /**
   * Gets kudoers for a specific activity from the Strava API.
   * @param userId - The ID of the user.
   * @param activityId - The ID of the activity.
   * @returns A list of kudoers.
   */
  async getActivityKudoers(
    userId: string,
    activityId: number
  ): Promise<Kudoer[]> {
    const account = await this.findAccountByUserId(userId)
    if (!account) {
      throw new NotFoundException('Strava account not found.')
    }
    await this.refreshTokenIfNeeded(account)

    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}/kudos`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to fetch activity kudoers: ${text}`)
    }

    return (await res.json()) as Kudoer[]
  }

  /**
   * Gets zones for a specific activity from the Strava API.
   * @param userId - The ID of the user.
   * @param activityId - The ID of the activity.
   * @returns A list of activity zones.
   */
  async getActivityZones(
    userId: string,
    activityId: number
  ): Promise<ActivityZone[]> {
    const account = await this.findAccountByUserId(userId)
    if (!account) {
      throw new NotFoundException('Strava account not found.')
    }
    await this.refreshTokenIfNeeded(account)

    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}/zones`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      }
    )

    console.log('res', res)

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to fetch activity zones: ${text}`)
    }

    return (await res.json()) as ActivityZone[]
  }

  /**
   * Gets activity streams from the Strava API.
   * @param userId - The ID of the user.
   * @param activityId - The ID of the activity.
   * @returns The activity streams.
   */
  async getActivityStreams(
    userId: string,
    activityId: number
  ): Promise<StreamSetDto> {
    const account = await this.findAccountByUserId(userId)
    if (!account) {
      throw new NotFoundException('Strava account not found.')
    }
    await this.refreshTokenIfNeeded(account)

    // Request specific stream types that we need
    const streamTypes = [
      'time',
      'distance',
      'latlng',
      'altitude',
      'velocity_smooth',
      'heartrate',
      'cadence',
      'watts',
      'temp',
      'moving',
      'grade_smooth',
    ]
    const streamParams = streamTypes.join(',')

    const res = await fetch(
      `https://www.strava.com/api/v3/activities/${activityId}/streams?keys=${streamParams}&key_by_type=true`,
      {
        headers: {
          Authorization: `Bearer ${account.accessToken}`,
          'Accept-Encoding': 'gzip, deflate',
        },
      }
    )

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Failed to fetch activity streams: ${text}`)
    }

    try {
      const text = await res.text()
      console.log('Response text:', text.substring(0, 500) + '...')
      const streamSet = JSON.parse(text) as any
      console.log('Parsed streams:', streamSet)

      // Map the streams to DTOs, handling LatLng data specially
      return {
        altitude: streamSet.altitude
          ? {
              type: streamSet.altitude.type,
              data: streamSet.altitude.data.filter(val => val !== null),
              series_type: streamSet.altitude.series_type,
              original_size: streamSet.altitude.original_size,
              resolution: streamSet.altitude.resolution,
            }
          : undefined,
        cadence: streamSet.cadence
          ? {
              type: streamSet.cadence.type,
              data: streamSet.cadence.data.filter(val => val !== null),
              series_type: streamSet.cadence.series_type,
              original_size: streamSet.cadence.original_size,
              resolution: streamSet.cadence.resolution,
            }
          : undefined,
        distance: streamSet.distance
          ? {
              type: streamSet.distance.type,
              data: streamSet.distance.data.filter(val => val !== null),
              series_type: streamSet.distance.series_type,
              original_size: streamSet.distance.original_size,
              resolution: streamSet.distance.resolution,
            }
          : undefined,
        heartrate: streamSet.heartrate
          ? {
              type: streamSet.heartrate.type,
              data: (() => {
                console.log(
                  'Original heart rate data length:',
                  streamSet.heartrate.data.length
                )
                console.log(
                  'First 10 heart rate values:',
                  streamSet.heartrate.data.slice(0, 10)
                )
                const filtered = streamSet.heartrate.data.filter(val => {
                  const isNull = val === null
                  if (isNull) {
                    console.log('Filtering out null heart rate value')
                  }
                  return val !== null
                })
                console.log('Filtered heart rate data length:', filtered.length)
                return filtered
              })(),
              series_type: streamSet.heartrate.series_type,
              original_size: streamSet.heartrate.original_size,
              resolution: streamSet.heartrate.resolution,
            }
          : undefined,
        latlng: streamSet.latlng
          ? {
              type: streamSet.latlng.type,
              data: streamSet.latlng.data.map(latlng => ({
                lat: latlng[0],
                lng: latlng[1],
              })),
              series_type: streamSet.latlng.series_type,
              original_size: streamSet.latlng.original_size,
              resolution: streamSet.latlng.resolution,
            }
          : undefined,
        moving: streamSet.moving
          ? {
              type: streamSet.moving.type,
              data: streamSet.moving.data.filter(val => val !== null),
              series_type: streamSet.moving.series_type,
              original_size: streamSet.moving.original_size,
              resolution: streamSet.moving.resolution,
            }
          : undefined,
        power: streamSet.watts
          ? {
              type: streamSet.watts.type,
              data: streamSet.watts.data.filter(val => val !== null),
              series_type: streamSet.watts.series_type,
              original_size: streamSet.watts.original_size,
              resolution: streamSet.watts.resolution,
            }
          : undefined,
        smooth_grade: streamSet.grade_smooth
          ? {
              type: streamSet.grade_smooth.type,
              data: streamSet.grade_smooth.data,
              series_type: streamSet.grade_smooth.series_type,
              original_size: streamSet.grade_smooth.original_size,
              resolution: streamSet.grade_smooth.resolution,
            }
          : undefined,
        smooth_velocity: streamSet.velocity_smooth
          ? {
              type: streamSet.velocity_smooth.type,
              data: streamSet.velocity_smooth.data,
              series_type: streamSet.velocity_smooth.series_type,
              original_size: streamSet.velocity_smooth.original_size,
              resolution: streamSet.velocity_smooth.resolution,
            }
          : undefined,
        temperature: streamSet.temp
          ? {
              type: streamSet.temp.type,
              data: streamSet.temp.data,
              series_type: streamSet.temp.series_type,
              original_size: streamSet.temp.original_size,
              resolution: streamSet.temp.resolution,
            }
          : undefined,
        time: streamSet.time
          ? {
              type: streamSet.time.type,
              data: streamSet.time.data,
              series_type: streamSet.time.series_type,
              original_size: streamSet.time.original_size,
              resolution: streamSet.time.resolution,
            }
          : undefined,
      }
    } catch (error) {
      console.error('Error parsing activity streams:', error)
      throw new Error(
        `Failed to parse activity streams: ${
          error instanceof Error ? error.message : String(error)
        }`
      )
    }
  }
}
