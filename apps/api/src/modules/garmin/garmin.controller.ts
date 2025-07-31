import {
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { GarminService } from './garmin.service'
import { JwtAuthGuard } from '../../common/guards/jwt.guard'

@Controller('garmin')
export class GarminController {
  constructor(private readonly garminService: GarminService) {}

  @Get('auth-url')
  @UseGuards(JwtAuthGuard)
  async getAuthUrl(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.user['id']
      const { url, state, verifier } = this.garminService.buildAuthUrl(userId)

      // Store state and verifier in session for verification
      req.session['garminState'] = state
      req.session['garminVerifier'] = verifier
      req.session['garminUserId'] = userId

      res.json({ url, state })
    } catch (error) {
      console.error('Error generating auth URL:', error)
      res.status(500).json({ error: 'Failed to generate authorization URL' })
    }
  }

  @Post('exchange-token')
  @UseGuards(JwtAuthGuard)
  async exchangeToken(@Req() req: Request, @Res() res: Response) {
    try {
      const { code, state } = req.body
      const userId = req.user['id']

      if (!code || !state) {
        return res.status(400).json({
          error: 'Missing required parameters: code, state',
        })
      }

      // Exchange code for tokens
      const { tokens: tokenData, userId: storedUserId } =
        await this.garminService.exchangeCodeForTokens(code, state)

      // Fetch additional data
      const garminUserId = await this.garminService.fetchGarminUserId(
        tokenData.access_token
      )
      const permissions = await this.garminService.fetchUserPermissions(
        tokenData.access_token
      )

      // Store in database
      const garminAccount = await this.garminService.storeGarminAccount(
        storedUserId,
        garminUserId,
        tokenData,
        permissions
      )

      res.json({
        success: true,
        garminAccount: {
          id: garminAccount.id,
          garminUserId: garminAccount.garminUserId,
          scope: garminAccount.scope,
        },
      })
    } catch (error) {
      console.error('Token exchange error:', error)
      res.status(500).json({ error: 'Failed to exchange authorization code' })
    }
  }

  @Get('connection-status')
  @UseGuards(JwtAuthGuard)
  async getConnectionStatus(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.user['id']
      const isConnected = await this.garminService.isGarminConnected(userId)
      const account = await this.garminService.getGarminAccount(userId)

      res.json({
        isConnected,
        account: account
          ? {
              id: account.id,
              garminUserId: account.garminUserId,
              scope: account.scope,
              createdAt: account.createdAt,
            }
          : null,
      })
    } catch (error) {
      console.error('Error getting connection status:', error)
      res.status(500).json({ error: 'Failed to get connection status' })
    }
  }

  @Post('disconnect')
  @UseGuards(JwtAuthGuard)
  async disconnect(@Req() req: Request, @Res() res: Response) {
    try {
      const userId = req.user['id']
      const success = await this.garminService.disconnectGarminAccount(userId)

      res.json({ success })
    } catch (error) {
      console.error('Error disconnecting Garmin account:', error)
      res.status(500).json({ error: 'Failed to disconnect Garmin account' })
    }
  }
}
