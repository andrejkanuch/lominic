import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GarminService } from './garmin.service'
import { GarminAccount } from '../../entities/garmin-account.entity'
import { User } from '../../entities/user.entity'
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { GarminActivity } from './dto/garmin-activity.dto'

@Resolver(() => GarminAccount)
export class GarminResolver {
  constructor(private readonly garminService: GarminService) {}

  @Query(() => String, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getGarminAuthUrl(@CurrentUser() user: User): Promise<string | null> {
    if (!user || !user.id) {
      throw new Error('User not authenticated or user ID not found')
    }

    try {
      return await this.garminService.getAuthorizationUrl(user.id)
    } catch (error) {
      console.error('Error generating Garmin auth URL:', error)
      throw new Error('Failed to generate Garmin authorization URL')
    }
  }

  @Mutation(() => GarminAccount)
  async exchangeGarminCode(
    @Args('code') code: string,
    @Args('state') state: string
  ): Promise<GarminAccount> {
    return this.garminService.exchangeCodeForToken(code, state)
  }

  @Mutation(() => GarminAccount)
  @UseGuards(GqlAuthGuard)
  async refreshGarminToken(@CurrentUser() user: User): Promise<GarminAccount> {
    const account = await this.garminService.getUserAccount(user.id)
    if (!account) {
      throw new Error('Garmin account not found')
    }
    return this.garminService.refreshAccessToken(account.refreshToken)
  }

  @Query(() => [String])
  @UseGuards(GqlAuthGuard)
  async getGarminUserPermissions(@CurrentUser() user: User): Promise<string[]> {
    const accessToken = await this.garminService.getValidAccessToken(user.id)
    return this.garminService.getUserPermissions(accessToken)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGarminUserRegistration(
    @CurrentUser() user: User
  ): Promise<boolean> {
    const accessToken = await this.garminService.getValidAccessToken(user.id)
    await this.garminService.deleteUserRegistration(accessToken)
    return true
  }

  @Query(() => GarminAccount, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getGarminAccount(
    @CurrentUser() user: User
  ): Promise<GarminAccount | null> {
    return this.garminService.getUserAccount(user.id)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async disconnectGarminAccount(@CurrentUser() user: User): Promise<boolean> {
    await this.garminService.disconnectAccount(user.id)
    return true
  }

  @ResolveField(() => User)
  async user(@Parent() garminAccount: GarminAccount): Promise<User> {
    return garminAccount.user
  }

  @Query(() => [GarminActivity]) // Define GarminActivity type in schema
  @UseGuards(GqlAuthGuard)
  async getGarminActivities(
    @CurrentUser() user: User,
    @Args('limit', { type: () => Number, defaultValue: 50 }) limit: number,
    @Args('startTime', { type: () => Number, nullable: true })
    startTime?: number,
    @Args('endTime', { type: () => Number, nullable: true }) endTime?: number
  ): Promise<GarminActivity[]> {
    if (!user || !user.id) {
      throw new Error('User not authenticated or user ID not found')
    }

    const userId = user.id
    const now = Math.floor(Date.now() / 1000)
    const defaultStart = now - 30 * 24 * 3600 // Last 30 days

    try {
      return await this.garminService.fetchActivities(
        userId,
        startTime || defaultStart,
        endTime || now
      )
    } catch (error) {
      console.error('Error fetching Garmin activities:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error'

      // Check if it's a token refresh error
      if (
        errorMessage.includes('Token refresh failed') ||
        errorMessage.includes('401')
      ) {
        throw new Error(
          'Garmin authentication expired. Please reconnect your Garmin account.'
        )
      }

      throw new Error(`Failed to fetch Garmin activities: ${errorMessage}`)
    }
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isGarminConnected(@CurrentUser() user: User): Promise<boolean> {
    if (!user || !user.id) {
      return false
    }

    try {
      const account = await this.garminService.getUserAccount(user.id)
      if (!account) {
        return false
      }

      // Check if the account has valid tokens
      const now = new Date()
      const expiresSoon = new Date(account.expiresAt.getTime() - 5 * 60 * 1000) // 5 minutes buffer

      if (now >= expiresSoon) {
        // Token is expired or will expire soon, try to refresh it
        try {
          await this.garminService.getValidAccessToken(user.id)
          return true // Refresh successful
        } catch (refreshError) {
          // If refresh fails, the connection is invalid
          console.error(
            'Token refresh failed during connection check:',
            refreshError
          )
          return false
        }
      }

      return true // Token is still valid
    } catch (error) {
      console.error('Error checking Garmin connection status:', error)
      return false
    }
  }
}
