import React from "react";
import { useRBAC, Role, Permission } from "../hooks/use-rbac";

interface RoleBasedComponentProps {
  children: React.ReactNode;
  roles?: Role | Role[];
  permissions?: Permission | Permission[];
  fallback?: React.ReactNode;
  requireAllPermissions?: boolean;
}

export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  children,
  roles,
  permissions,
  fallback = null,
  requireAllPermissions = false,
}) => {
  const { hasRole, hasPermission } = useRBAC();

  // Check roles if specified
  if (roles) {
    if (!hasRole(roles)) {
      return <>{fallback}</>;
    }
  }

  // Check permissions if specified
  if (permissions) {
    if (requireAllPermissions) {
      // Require all permissions
      if (!hasPermission(permissions)) {
        return <>{fallback}</>;
      }
    } else {
      // Require any permission
      const permissionArray = Array.isArray(permissions)
        ? permissions
        : [permissions];
      const hasAnyPermission = permissionArray.some((permission) =>
        hasPermission(permission)
      );
      if (!hasAnyPermission) {
        return <>{fallback}</>;
      }
    }
  }

  return <>{children}</>;
};

// Convenience components for common use cases
export const AdminOnly: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => (
  <RoleBasedComponent
    roles={[Role.SUPER_ADMIN, Role.ADMIN]}
    fallback={fallback}
  >
    {children}
  </RoleBasedComponent>
);

export const SuperAdminOnly: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => (
  <RoleBasedComponent roles={Role.SUPER_ADMIN} fallback={fallback}>
    {children}
  </RoleBasedComponent>
);

export const UserManagementOnly: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ children, fallback }) => (
  <RoleBasedComponent
    permissions={[
      Permission.CREATE_USER,
      Permission.READ_USER,
      Permission.UPDATE_USER,
      Permission.DELETE_USER,
    ]}
    fallback={fallback}
  >
    {children}
  </RoleBasedComponent>
);
