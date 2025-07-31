import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GarminService } from './garmin.service'
import { GarminAccount } from '../../entities/garmin-account.entity'
import { GarminActivity } from './dto/garmin-activity.dto'
import { GarminAuthUrlData } from './dto/garmin-auth-url-data.dto'
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../../entities/user.entity'

@Resolver(() => GarminAccount)
export class GarminResolver {
  constructor(private readonly garminService: GarminService) {}

  @Query(() => String, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getGarminAuthUrl(@CurrentUser() user: User): Promise<string> {
    const { url } = this.garminService.buildAuthUrl(user.id)
    return url
  }

  @Query(() => GarminAuthUrlData, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getGarminAuthData(
    @CurrentUser() user: User
  ): Promise<GarminAuthUrlData> {
    const { url, state, verifier } = this.garminService.buildAuthUrl(user.id)
    return { url, state, verifier, userId: user.id }
  }

  @Query(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async isGarminConnected(@CurrentUser() user: User): Promise<boolean> {
    return this.garminService.isGarminConnected(user.id)
  }

  @Query(() => GarminAccount, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getGarminAccount(
    @CurrentUser() user: User
  ): Promise<GarminAccount | null> {
    return this.garminService.getGarminAccount(user.id)
  }

  @Query(() => [String])
  @UseGuards(GqlAuthGuard)
  async getGarminUserPermissions(@CurrentUser() user: User): Promise<string[]> {
    const account = await this.garminService.getGarminAccount(user.id)
    if (!account) {
      throw new Error('Garmin account not found')
    }

    // Check if token needs refresh
    if (new Date() >= account.expiresAt) {
      const newTokens = await this.garminService.refreshToken(
        account.refreshToken
      )
      await this.garminService.storeGarminAccount(
        user.id,
        account.garminUserId,
        newTokens,
        account.scope
      )
      account.accessToken = newTokens.access_token
    }

    return this.garminService.fetchUserPermissions(account.accessToken)
  }

  @Query(() => [GarminActivity])
  @UseGuards(GqlAuthGuard)
  async getGarminActivities(
    @CurrentUser() user: User,
    @Args('limit', { type: () => Number }) limit: number,
    @Args('startTime', { type: () => Number, nullable: true })
    startTime?: number,
    @Args('endTime', { type: () => Number, nullable: true }) endTime?: number
  ): Promise<GarminActivity[]> {
    return this.garminService.getGarminActivities(
      user.id,
      limit,
      startTime,
      endTime
    )
  }

  @Mutation(() => GarminAccount)
  @UseGuards(GqlAuthGuard)
  async exchangeGarminCode(
    @CurrentUser() user: User,
    @Args('code', { type: () => String }) code: string,
    @Args('state', { type: () => String }) state: string
  ): Promise<GarminAccount> {
    // Exchange code for tokens
    const { tokens: tokenData, userId: storedUserId } =
      await this.garminService.exchangeCodeForTokens(code, state)

    // Fetch additional data
    const garminUserId = await this.garminService.fetchGarminUserId(
      tokenData.access_token
    )
    const permissions = await this.garminService.fetchUserPermissions(
      tokenData.access_token
    )

    // Store in database
    return this.garminService.storeGarminAccount(
      storedUserId,
      garminUserId,
      tokenData,
      permissions
    )
  }

  @Mutation(() => GarminAccount)
  @UseGuards(GqlAuthGuard)
  async refreshGarminToken(@CurrentUser() user: User): Promise<GarminAccount> {
    const account = await this.garminService.getGarminAccount(user.id)
    if (!account) {
      throw new Error('Garmin account not found')
    }

    const newTokens = await this.garminService.refreshToken(
      account.refreshToken
    )
    return this.garminService.storeGarminAccount(
      user.id,
      account.garminUserId,
      newTokens,
      account.scope
    )
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async disconnectGarminAccount(@CurrentUser() user: User): Promise<boolean> {
    return this.garminService.disconnectGarminAccount(user.id)
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteGarminUserRegistration(
    @CurrentUser() user: User
  ): Promise<boolean> {
    const account = await this.garminService.getGarminAccount(user.id)
    if (!account) {
      throw new Error('Garmin account not found')
    }

    return this.garminService.deleteUserRegistration(account.accessToken)
  }
}
