import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { HttpModule } from '@nestjs/axios'
import { GarminAccount } from '../../entities/garmin-account.entity'
import { GarminResolver } from './garmin.resolver'
import { GarminService } from './garmin.service'
import { GarminController } from './garmin.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([GarminAccount]),
    HttpModule,
  ],
  providers: [GarminResolver, GarminService],
  controllers: [GarminController],
  exports: [GarminService],
})
export class GarminModule {} 