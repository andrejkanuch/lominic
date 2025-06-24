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

    console.log(
      "🔍 PermissionsGuard - Required permissions:",
      requiredPermissions
    );
    console.log("🔍 PermissionsGuard - User:", user);
    console.log("🔍 PermissionsGuard - User role:", user?.role);

    if (!user) {
      console.log("❌ PermissionsGuard - No user found");
      return false;
    }

    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    console.log("🔍 PermissionsGuard - User permissions:", userPermissions);

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission)
    );

    console.log("🔍 PermissionsGuard - Has permission:", hasPermission);
    return hasPermission;
  }
}
