import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
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
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    password: string
  ): Promise<UserWithoutPassword | null> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await user.validatePassword(password))) {
      const { password: _unused, ...result } = user
      return result
    }
    return null
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const user = await this.validateUser(loginInput.email, loginInput.password)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: user as any,
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
    const { password: _unused, ...result } = user

    const payload: JwtPayload = { email: user.email, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload),
      user: result as any,
    }
  }
}
