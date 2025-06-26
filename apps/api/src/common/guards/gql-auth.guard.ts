import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class GqlAuthGuard extends AuthGuard("jwt") {
  constructor() {
    super();
    console.log("🔐 GqlAuthGuard initialized");
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    console.log(
      "🔐 GqlAuthGuard.getRequest - Authorization header:",
      request.headers.authorization
    );
    return request;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("🔐 GqlAuthGuard.canActivate called");
    const result = await super.canActivate(context);
    console.log("🔐 GqlAuthGuard.canActivate result:", result);

    if (result) {
      const request = this.getRequest(context);
      console.log(
        "🔐 GqlAuthGuard.canActivate - req.user after auth:",
        request.user
      );
    }

    return result as boolean;
  }
}
