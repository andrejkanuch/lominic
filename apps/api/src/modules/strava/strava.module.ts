import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { StravaAccount } from '../../entities/strava-account.entity'
import { StravaService } from './strava.service'
import { StravaController } from './strava.controller'
import { StravaResolver } from './strava.resolver'
import { DataRetentionModule } from '../data-retention/data-retention.module'

@Module({
  imports: [TypeOrmModule.forFeature([StravaAccount]), DataRetentionModule],
  providers: [StravaService, StravaResolver],
  controllers: [StravaController],
  exports: [StravaService],
})
export class StravaModule {}
