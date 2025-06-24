import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "../../entities/user.entity";

export interface GraphQLContext {
  req: any;
  user?: User;
}

@Injectable()
export class GraphQLContextFactory {
  create(context: ExecutionContext): GraphQLContext {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    return {
      req,
      user: req.user,
    };
  }
}
