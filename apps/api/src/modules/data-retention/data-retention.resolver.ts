import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { DataRetentionService } from './data-retention.service'
import { JwtAuthGuard } from '../../common/guards/jwt.guard'
import { RolesGuard } from '../../common/guards/roles.guard'
import { Roles } from '../../common/decorators/roles.decorator'
import { Role } from '../../common/enums/roles.enum'
import { CurrentUser } from '../../common/decorators/current-user.decorator'
import { User } from '../../entities/user.entity'

@Resolver()
@UseGuards(JwtAuthGuard, RolesGuard)
export class DataRetentionResolver {
  constructor(private readonly dataRetentionService: DataRetentionService) {}

  @Query(() => String)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  async getRetentionStats(@CurrentUser() _user: User) {
    const stats = await this.dataRetentionService.getRetentionStats()
    return JSON.stringify(stats, null, 2)
  }

  @Mutation(() => String)
  @Roles(Role.SUPER_ADMIN)
  async performDataRetentionCleanup(@CurrentUser() _user: User) {
    const result = await this.dataRetentionService.performManualCleanup()
    return JSON.stringify(result, null, 2)
  }

  @Mutation(() => String)
  @Roles(Role.SUPER_ADMIN)
  async restoreUserFromDeletion(
    @Args('userId') userId: string,
    @CurrentUser() _user: User
  ) {
    await this.dataRetentionService.restoreUserFromDeletion(userId)
    return `User ${userId} restored from deletion`
  }

  @Mutation(() => String)
  @Roles(Role.SUPER_ADMIN)
  async restoreStravaAccountFromDeletion(
    @Args('accountId') accountId: string,
    @CurrentUser() _user: User
  ) {
    await this.dataRetentionService.restoreStravaAccountFromDeletion(accountId)
    return `Strava account ${accountId} restored from deletion`
  }
}
