import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { StravaService } from './strava.service'
import { StravaActivityDto } from './dto/strava-activity.dto'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../../entities/user.entity'
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard'
import { DetailedAthlete } from './dto/detailed-athlete.dto'
import { Zones } from './dto/zones.dto'
import { ActivityStats } from './dto/activity-stats.dto'
import { ActivityDto } from './dto/activity.dto'
import { CommentDto } from './dto/comment.dto'
import { KudoerDto } from './dto/kudoer.dto'
import { ActivityZoneDto } from './dto/activity-zone.dto'
import {
  Activity,
  Comment as StravaComment,
  Kudoer,
  ActivityZone,
} from '@lominic/strava-api-types'

@Resolver()
@UseGuards(GqlAuthGuard)
export class StravaResolver {
  constructor(private readonly stravaService: StravaService) {}

  private convertActivityToDto(activity: Activity): ActivityDto {
    return {
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
      polyline: activity.map?.polyline || undefined,
    }
  }

  private convertCommentToDto(comment: StravaComment): CommentDto {
    return {
      id: comment.id.toString(),
      text: comment.text,
      created_at: comment.created_at,
    }
  }

  @Query(() => [StravaActivityDto])
  async getStravaActivities(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @CurrentUser() user: User
  ) {
    try {
      return await this.stravaService.getRecentActivities(user.id, limit)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch Strava activities: ${errorMessage}`)
    }
  }

  @Mutation(() => Boolean)
  async createTestStravaAccount(@CurrentUser() user: User): Promise<boolean> {
    try {
      await this.stravaService.createTestAccount(user.id)
      return true
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to create test Strava account: ${errorMessage}`)
    }
  }

  @Query(() => DetailedAthlete)
  async getAthlete(@CurrentUser() user: User): Promise<DetailedAthlete> {
    try {
      return await this.stravaService.getAthlete(user.id)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch athlete data: ${errorMessage}`)
    }
  }

  @Query(() => Zones)
  async getAthleteZones(@CurrentUser() user: User): Promise<Zones> {
    try {
      return await this.stravaService.getAthleteZones(user.id)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch athlete zones: ${errorMessage}`)
    }
  }

  @Query(() => ActivityStats)
  async getAthleteStats(@CurrentUser() user: User): Promise<ActivityStats> {
    try {
      return await this.stravaService.getAthleteStats(user.id)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch athlete stats: ${errorMessage}`)
    }
  }

  @Query(() => ActivityDto)
  async getActivityById(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<ActivityDto> {
    try {
      const activity = await this.stravaService.getActivityById(
        user.id,
        parseInt(activityId)
      )
      return this.convertActivityToDto(activity)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch activity data: ${errorMessage}`)
    }
  }

  @Query(() => [CommentDto])
  async getActivityComments(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<CommentDto[]> {
    try {
      const comments = await this.stravaService.getActivityComments(
        user.id,
        parseInt(activityId)
      )
      return comments.map(comment => this.convertCommentToDto(comment))
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch activity comments: ${errorMessage}`)
    }
  }

  @Query(() => [KudoerDto])
  async getActivityKudoers(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<KudoerDto[]> {
    try {
      return await this.stravaService.getActivityKudoers(
        user.id,
        parseInt(activityId)
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch activity kudoers: ${errorMessage}`)
    }
  }

  @Query(() => [ActivityZoneDto])
  async getActivityZones(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<ActivityZoneDto[]> {
    try {
      return await this.stravaService.getActivityZones(
        user.id,
        parseInt(activityId)
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch activity zones: ${errorMessage}`)
    }
  }
}
