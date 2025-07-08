import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { EmailService } from '../email/email.service'
import { DataRetentionService } from '../data-retention/data-retention.service'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'
import { AuthResponse } from './dto/auth-response'
import { User } from '../../entities/user.entity'

interface JwtPayload {
  email: string
  sub: string
}

type UserWithoutPassword = Omit<
  User,
  'password' | 'hashPassword' | 'validatePassword'
>

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private emailService: EmailService,
    private dataRetentionService: DataRetentionService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await user.validatePassword(password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.validateUser(loginInput.email, loginInput.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    // Update last login timestamp for data retention
    await this.dataRetentionService.updateUserLastLogin(user.id)

    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: user as User,
    }
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.usersService.findByEmail(
      registerInput.email
    )
    if (existingUser) {
      throw new UnauthorizedException('User already exists')
    }

    const user = await this.usersService.createUser(registerInput)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user

    // Send thank you email asynchronously (don't await to avoid blocking registration)
    this.emailService.sendThankYouEmail(
      user.email,
      user.firstName || user.email
    )

    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: result as User,
    }
  }
}
