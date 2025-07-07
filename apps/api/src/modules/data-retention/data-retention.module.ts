import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataRetentionService } from './data-retention.service'
import { User } from '../../entities/user.entity'
import { StravaAccount } from '../../entities/strava-account.entity'
import { DataRetentionResolver } from './data-retention.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([User, StravaAccount])],
  providers: [DataRetentionService, DataRetentionResolver],
  exports: [DataRetentionService],
})
export class DataRetentionModule {}
