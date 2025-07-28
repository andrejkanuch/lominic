import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { GarminAccount } from '../../entities/garmin-account.entity'
import { GarminService } from './garmin.service'
import { GarminResolver } from './garmin.resolver'
import { GarminController } from './garmin.controller'
import { DataRetentionModule } from '../data-retention/data-retention.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([GarminAccount]),
    HttpModule,
    DataRetentionModule,
  ],
  providers: [GarminService, GarminResolver],
  controllers: [GarminController],
  exports: [GarminService],
})
export class GarminModule {}
