import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import fetch from 'node-fetch';
import { StravaAccount } from '../../entities/strava-account.entity';

@Injectable()
export class StravaService {
  constructor(
    @InjectRepository(StravaAccount)
    private accounts: Repository<StravaAccount>,
    private configService: ConfigService,
  ) {}

  getAuthorizationUrl(state: string): string {
    const clientId = this.configService.get<string>('STRAVA_CLIENT_ID');
    const redirectUri = this.configService.get<string>('STRAVA_REDIRECT_URI');
    const scope = 'activity:read_all';
    return `https://www.strava.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri,
    )}&response_type=code&scope=${scope}&state=${state}`;
  }

  async exchangeToken(code: string, userId: string): Promise<StravaAccount> {
    const clientId = this.configService.get<string>('STRAVA_CLIENT_ID');
    const clientSecret = this.configService.get<string>('STRAVA_CLIENT_SECRET');

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: 'authorization_code',
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Token exchange failed: ${text}`);
    }

    const data = (await res.json()) as any;

    let account = await this.accounts.findOne({ where: { userId } });
    if (!account) {
      account = this.accounts.create({ userId } as any);
    }
    account.accessToken = data.access_token;
    account.refreshToken = data.refresh_token;
    account.expiresAt = data.expires_at;
    account.athleteId = data.athlete.id;

    return this.accounts.save(account);
  }

  async findAccountByUserId(userId: string): Promise<StravaAccount | null> {
    return this.accounts.findOne({ where: { userId } });
  }

  private async refreshTokenIfNeeded(account: StravaAccount) {
    if (account.expiresAt * 1000 > Date.now()) return account;

    const clientId = this.configService.get<string>('STRAVA_CLIENT_ID');
    const clientSecret = this.configService.get<string>('STRAVA_CLIENT_SECRET');

    const res = await fetch('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: account.refreshToken,
        grant_type: 'refresh_token',
      }),
    });

    const data = (await res.json()) as any;
    account.accessToken = data.access_token;
    account.refreshToken = data.refresh_token;
    account.expiresAt = data.expires_at;
    return this.accounts.save(account);
  }

  async getRecentActivities(userId: string, limit = 10) {
    const account = await this.findAccountByUserId(userId);
    if (!account) throw new NotFoundException('Strava account not found');
    await this.refreshTokenIfNeeded(account);

    const res = await fetch(
      `https://www.strava.com/api/v3/athlete/activities?per_page=${limit}`,
      {
        headers: { Authorization: `Bearer ${account.accessToken}` },
      },
    );
    const data = (await res.json()) as any[];
    return data.map((a) => ({
      id: a.id,
      name: a.name,
      distance: a.distance,
      movingTime: a.moving_time,
      startDate: a.start_date,
      description: a.description,
    }));
  }
}
