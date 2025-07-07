import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { UsersModule } from '../users/users.module'
import { EmailModule } from '../email/email.module'
import { DataRetentionModule } from '../data-retention/data-retention.module'

@Module({
  imports: [
    UsersModule,
    EmailModule,
    DataRetentionModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET', 'your-secret-key'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {
  constructor() {
    console.log('🔐 AuthModule initialized')
  }
}
