import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { StravaService } from './strava.service';
import { StravaActivity } from './dto/strava-activity.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '../../entities/user.entity';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';

@Resolver()
@UseGuards(GqlAuthGuard)
export class StravaResolver {
  constructor(private readonly stravaService: StravaService) {}

  @Query(() => [StravaActivity])
  async getStravaActivities(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @CurrentUser() user: User,
  ) {
    return this.stravaService.getRecentActivities(user.id, limit);
  }
}
