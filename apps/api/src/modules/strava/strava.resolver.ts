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

@Resolver()
@UseGuards(GqlAuthGuard)
export class StravaResolver {
  constructor(private readonly stravaService: StravaService) {}

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
}
