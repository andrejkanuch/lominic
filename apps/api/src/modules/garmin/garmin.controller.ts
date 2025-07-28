import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common'
import { GarminService } from './garmin.service'
import { JwtAuthGuard } from '../../common/guards/jwt.guard'

@Controller('garmin')
export class GarminController {
  constructor(private readonly garminService: GarminService) {}

  @Get('auth')
  async getAuthUrl(@Query('state') state: string) {
    if (!state) {
      throw new Error('State parameter is required')
    }
    try {
      return this.garminService.getAuthorizationUrl(state)
    } catch (error) {
      console.error('Garmin auth error:', error)
      throw error
    }
  }

  @Post('exchange-token')
  async exchangeToken(@Body() body: { code: string; state: string }) {
    try {
      return this.garminService.exchangeCodeForToken(body.code, body.state)
    } catch (error) {
      console.error('Token exchange error:', error)
      throw error
    }
  }

  @Get('user-permissions')
  async getUserPermissions(@Query('accessToken') accessToken: string) {
    try {
      return this.garminService.getUserPermissions(accessToken)
    } catch (error) {
      console.error('Get user permissions error:', error)
      throw error
    }
  }

  @Get('user-id')
  async getUserId(@Query('accessToken') accessToken: string) {
    try {
      return { userId: await this.garminService.getUserId(accessToken) }
    } catch (error) {
      console.error('Get user ID error:', error)
      throw error
    }
  }

  @Get('check-connection')
  async checkConnection(@Query('userId') userId: string) {
    try {
      const account = await this.garminService.getUserAccount(userId)
      return {
        connected: !!account,
        account: account
          ? {
              id: account.id,
              garminUserId: account.garminUserId,
              lastSyncAt: account.lastSyncAt,
              scope: account.scope,
            }
          : null,
      }
    } catch (error) {
      console.error('Check connection error:', error)
      throw error
    }
  }

  @Get('test')
  async test() {
    return {
      message: 'Garmin API is working!',
      timestamp: new Date().toISOString(),
    }
  }

  @Get('test-connection')
  async testConnection(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('User ID is required')
    }
    return this.garminService.testGarminConnection(userId)
  }

  @Get('test-activities')
  async testActivities(@Query('userId') userId: string) {
    if (!userId) {
      throw new Error('User ID is required')
    }

    const now = Math.floor(Date.now() / 1000)
    const startTime = now - 7 * 24 * 3600 // Last 7 days

    try {
      const activities = await this.garminService.fetchActivities(
        userId,
        startTime,
        now
      )
      return {
        success: true,
        count: activities.length,
        activities: activities.slice(0, 3), // Return first 3 activities
        message: `Successfully fetched ${activities.length} activities`,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
        message: 'Failed to fetch activities',
      }
    }
  }
}
