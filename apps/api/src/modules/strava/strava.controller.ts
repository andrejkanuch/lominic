import { Controller, Get, Query, Res, Logger } from '@nestjs/common'
import { Response } from 'express'
import { StravaService } from './strava.service'

@Controller('strava')
export class StravaController {
  private readonly logger = new Logger(StravaController.name)

  constructor(private readonly stravaService: StravaService) {}

  @Get('connect')
  connect(@Query('state') userId: string, @Res() res: Response) {
    this.logger.log(`Received Strava connect request for user: ${userId}`)
    const url = this.stravaService.getAuthorizationUrl(userId)
    this.logger.log(`Redirecting to Strava authorization URL: ${url}`)
    res.redirect(url)
  }

  @Get('oauth/callback')
  async callback(
    @Query('code') code: string,
    @Query('state') userId: string,
    @Res() res: Response
  ) {
    this.logger.log(
      `Received Strava callback for user: ${userId} with code: ${code}`
    )
    try {
      await this.stravaService.exchangeToken(code, userId)
      this.logger.log(`Successfully exchanged token for user: ${userId}`)
      return res.send(`
        <html>
          <body>
            <h1>Strava Connected Successfully!</h1>
            <p>You can now close this window and return to the app.</p>
            <script>
              // Close window after 3 seconds
              setTimeout(() => window.close(), 3000);
            </script>
          </body>
        </html>
      `)
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred'
      this.logger.error(
        `Error connecting Strava for user ${userId}: ${errorMessage}`
      )
      return res.status(400).send(`
        <html>
          <body>
            <h1>Error Connecting Strava</h1>
            <p>${errorMessage}</p>
          </body>
        </html>
      `)
    }
  }
}
