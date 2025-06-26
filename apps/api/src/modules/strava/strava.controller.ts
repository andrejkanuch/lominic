import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { StravaService } from './strava.service';

@Controller('strava')
export class StravaController {
  constructor(private readonly stravaService: StravaService) {}

  @Get('connect')
  async connect(@Query('state') state: string, @Res() res: Response) {
    const url = this.stravaService.getAuthorizationUrl(state || '');
    return res.redirect(url);
  }

  @Get('oauth/callback')
  async callback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Res() res: Response,
  ) {
    await this.stravaService.exchangeToken(code, state);
    return res.send('Strava connected');
  }
}
