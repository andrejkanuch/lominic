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

@Resolver(() => GarminAccount)
export class GarminResolver {
  constructor(private readonly garminService: GarminService) {}

  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  async getGarminAuthUrl(@CurrentUser() user: User): Promise<string> {
    return this.garminService.getAuthorizationUrl(user.id)
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
}
