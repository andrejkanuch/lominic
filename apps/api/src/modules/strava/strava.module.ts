import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StravaAccount } from '../../entities/strava-account.entity';
import { StravaService } from './strava.service';
import { StravaController } from './strava.controller';
import { StravaResolver } from './strava.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([StravaAccount])],
  providers: [StravaService, StravaResolver],
  controllers: [StravaController],
  exports: [StravaService],
})
export class StravaModule {}
