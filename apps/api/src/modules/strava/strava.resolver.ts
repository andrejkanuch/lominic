import { Resolver, Query, Args, Int } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { StravaService } from './strava.service'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../../entities/user.entity'
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard'
import { DetailedAthlete } from './dto/detailed-athlete.dto'
import { Zones } from './dto/zones.dto'
import { ActivityStats } from './dto/activity-stats.dto'

import { CommentDto } from './dto/comment.dto'
import { KudoerDto } from './dto/kudoer.dto'
import { ActivityZoneDto } from './dto/activity-zone.dto'
import { StreamSetDto } from './dto/stream-set.dto'
import { Comment as StravaComment } from '@lominic/strava-api-types'
import { StravaActivityDto } from './dto/strava-activity.dto'

@Resolver()
@UseGuards(GqlAuthGuard)
export class StravaResolver {
  constructor(private readonly stravaService: StravaService) {}

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

  @Query(() => StravaActivityDto)
  async getActivityById(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<StravaActivityDto> {
    try {
      return await this.stravaService.getActivityById(
        user.id,
        parseInt(activityId)
      )
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

  @Query(() => StreamSetDto)
  async getActivityStreams(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<StreamSetDto> {
    try {
      return await this.stravaService.getActivityStreams(
        user.id,
        parseInt(activityId)
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch activity streams: ${errorMessage}`)
    }
  }

  @Query(() => [String])
  async getActivityInsights(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string,
  ): Promise<string[]> {
    try {
      return await this.stravaService.getActivityInsights(
        user.id,
        parseInt(activityId),
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      throw new Error(`Failed to fetch activity insights: ${errorMessage}`)
    }
  }
}
