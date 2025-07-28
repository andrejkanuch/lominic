import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { GqlExecutionContext } from '@nestjs/graphql'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super()
    console.log('🔐 GqlAuthGuard initialized')
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    console.log(
      '🔐 GqlAuthGuard.getRequest - Authorization header:',
      request.headers.authorization
    )
    return request
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('🔐 GqlAuthGuard.canActivate called')
    const result = await super.canActivate(context)
    console.log('🔐 GqlAuthGuard.canActivate result:', result)

    if (result) {
      const request = this.getRequest(context)
      console.log(
        '🔐 GqlAuthGuard.canActivate - req.user after auth:',
        request.user
      )
    }

    return result as boolean
  }

  handleRequest<TUser = unknown>(
    err: Error | null,
    user: TUser,
    info: unknown,
    context: ExecutionContext
  ): TUser {
    console.log('🔐 GqlAuthGuard.handleRequest called')
    console.log('🔐 GqlAuthGuard.handleRequest - Error:', err)
    console.log('🔐 GqlAuthGuard.handleRequest - User:', user)
    console.log('🔐 GqlAuthGuard.handleRequest - Info:', info)

    if (err || !user) {
      console.log('❌ GqlAuthGuard.handleRequest - Authentication failed')
      throw new UnauthorizedException('Authentication failed')
    }

    // Set the user in the request context
    const request = this.getRequest(context)
    request.user = user
    console.log('✅ GqlAuthGuard.handleRequest - User set in request:', user)

    return user
  }
}
