import { Resolver, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { InsightsService } from './insights.service'
import { StravaService } from '../strava/strava.service'
import { DetailedInsightsResponse } from '../strava/dto/insights.dto'
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../../entities/user.entity'
import { UserGoalsInput, PhysicalStatus } from './dto/insights.dto'
import { handleInsightsError } from './utils/error-handler'

@Resolver()
@UseGuards(GqlAuthGuard)
export class InsightsResolver {
  constructor(
    private readonly insightsService: InsightsService,
    private readonly stravaService: StravaService
  ) {}

  @Query(() => [String])
  async getActivityInsights(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<string[]> {
    try {
      const activity = await this.stravaService.getActivityById(
        user.id,
        parseInt(activityId)
      )
      const streams = await this.stravaService.getActivityStreams(
        user.id,
        parseInt(activityId)
      )
      const zones = await this.stravaService.getAthleteZones(user.id)
      const historicalActivities = await this.stravaService.getRecentActivities(
        user.id,
        50
      )

      return await this.insightsService.generateInsights(
        activity as any,
        streams as any,
        zones as any,
        historicalActivities as any,
        user.id
      )
    } catch (error) {
      handleInsightsError(error, 'fetch activity insights')
    }
  }

  @Query(() => DetailedInsightsResponse)
  async getActivityInsightsDetailed(
    @CurrentUser() user: User,
    @Args('activityId', { type: () => String }) activityId: string
  ): Promise<DetailedInsightsResponse> {
    try {
      const activity = await this.stravaService.getActivityById(
        user.id,
        parseInt(activityId)
      )
      const streams = await this.stravaService.getActivityStreams(
        user.id,
        parseInt(activityId)
      )
      const zones = await this.stravaService.getAthleteZones(user.id)
      const historicalActivities = await this.stravaService.getRecentActivities(
        user.id,
        50
      )

      return await this.insightsService.generateDetailedInsights(
        activity as any,
        streams as any,
        zones as any,
        historicalActivities as any,
        user.id
      )
    } catch (error) {
      handleInsightsError(error, 'fetch detailed activity insights')
    }
  }

  @Query(() => PhysicalStatus)
  async getPhysicalStatus(
    @CurrentUser() user: User,
    @Args('userGoals', { type: () => UserGoalsInput, nullable: true })
    userGoals?: any
  ): Promise<any> {
    try {
      return await this.insightsService.resolvePhysicalStatus(
        user.id,
        userGoals
      )
    } catch (error) {
      handleInsightsError(error, 'fetch physical status')
    }
  }
}
