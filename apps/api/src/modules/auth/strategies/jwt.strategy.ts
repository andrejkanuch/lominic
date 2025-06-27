import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '../../users/users.service'

interface JwtPayload {
  email: string
  sub: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET', 'your-secret-key'),
    })
    console.log('🔐 JwtStrategy initialized')
  }

  async validate(payload: JwtPayload) {
    console.log('🔐 JwtStrategy.validate called with payload:', payload)

    // For JWT validation, we'll create a minimal user object with the payload data
    // This avoids the permission check in findOneUser for JWT validation
    const user = await this.usersService.findByEmail(payload.email)
    if (!user) {
      console.log('❌ JwtStrategy - User not found for email:', payload.email)
      throw new UnauthorizedException()
    }

    // Return user without password
    const { password: _unused, ...result } = user
    console.log('✅ JwtStrategy - User validated:', result)
    return result
  }
}
