import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    console.log("🔐 JwtAuthGuard - canActivate called");

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log("🔐 JwtAuthGuard - isPublic:", isPublic);

    if (isPublic) {
      console.log("🔐 JwtAuthGuard - Skipping authentication for public route");
      return true;
    }

    console.log("🔐 JwtAuthGuard - Proceeding with authentication");
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    console.log("🔐 JwtAuthGuard - handleRequest called");
    console.log("🔐 JwtAuthGuard - Error:", err);
    console.log("🔐 JwtAuthGuard - User:", user);
    console.log("🔐 JwtAuthGuard - Info:", info);

    // Don't throw an error if authentication fails
    // Just return the user (which might be undefined)
    return user;
  }
}
