import { Module } from '@nestjs/common'
import { StravaModule } from '../strava/strava.module'
import { InsightsService } from './insights.service'
import { InsightsResolver } from './insights.resolver'

@Module({
  imports: [StravaModule],
  providers: [InsightsService, InsightsResolver],
  exports: [InsightsService],
})
export class InsightsModule {}
