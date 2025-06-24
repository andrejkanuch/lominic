import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";
import { Permission } from "../enums/permissions.enum";
import { ROLE_PERMISSIONS } from "../constants/role-permissions";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredPermissions) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext();

    if (!user) {
      return false;
    }

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );
  }
}
