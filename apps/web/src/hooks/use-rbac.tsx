import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { GetCurrentUserDocument } from "../generated/graphql";

export enum Role {
  SUPER_ADMIN = "super_admin",
  ADMIN = "admin",
  USER = "user",
}

export enum Permission {
  // User management
  CREATE_USER = "create_user",
  READ_USER = "read_user",
  UPDATE_USER = "update_user",
  DELETE_USER = "delete_user",
  READ_ALL_USERS = "read_all_users",

  // Profile management
  UPDATE_OWN_PROFILE = "update_own_profile",
  READ_OWN_PROFILE = "read_own_profile",

  // Admin operations
  MANAGE_ROLES = "manage_roles",
  MANAGE_PERMISSIONS = "manage_permissions",
  SYSTEM_SETTINGS = "system_settings",

  // Content management
  CREATE_CONTENT = "create_content",
  READ_CONTENT = "read_content",
  UPDATE_CONTENT = "update_content",
  DELETE_CONTENT = "delete_content",

  // Analytics
  VIEW_ANALYTICS = "view_analytics",
  EXPORT_DATA = "export_data",
}

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.READ_ALL_USERS,
    Permission.UPDATE_OWN_PROFILE,
    Permission.READ_OWN_PROFILE,
    Permission.MANAGE_ROLES,
    Permission.MANAGE_PERMISSIONS,
    Permission.SYSTEM_SETTINGS,
    Permission.CREATE_CONTENT,
    Permission.READ_CONTENT,
    Permission.UPDATE_CONTENT,
    Permission.DELETE_CONTENT,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
  ],

  [Role.ADMIN]: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.READ_ALL_USERS,
    Permission.UPDATE_OWN_PROFILE,
    Permission.READ_OWN_PROFILE,
    Permission.CREATE_CONTENT,
    Permission.READ_CONTENT,
    Permission.UPDATE_CONTENT,
    Permission.DELETE_CONTENT,
    Permission.VIEW_ANALYTICS,
    Permission.EXPORT_DATA,
  ],

  [Role.USER]: [
    Permission.UPDATE_OWN_PROFILE,
    Permission.READ_OWN_PROFILE,
    Permission.READ_CONTENT,
  ],
};

export const useRBAC = () => {
  const { data, loading, error } = useQuery(GetCurrentUserDocument);

  const user = data?.me;
  const userRole = user?.role as Role;

  const hasRole = useMemo(() => {
    return (role: Role | Role[]) => {
      if (!userRole) return false;
      if (Array.isArray(role)) {
        return role.includes(userRole);
      }
      return userRole === role;
    };
  }, [userRole]);

  const hasPermission = useMemo(() => {
    return (permission: Permission | Permission[]) => {
      if (!userRole) return false;

      const userPermissions = ROLE_PERMISSIONS[userRole] || [];

      if (Array.isArray(permission)) {
        return permission.every((perm) => userPermissions.includes(perm));
      }

      return userPermissions.includes(permission);
    };
  }, [userRole]);

  const canManageUsers = useMemo(() => {
    return hasPermission([
      Permission.CREATE_USER,
      Permission.READ_USER,
      Permission.UPDATE_USER,
      Permission.DELETE_USER,
    ]);
  }, [hasPermission]);

  const canViewAllUsers = useMemo(() => {
    return hasPermission(Permission.READ_ALL_USERS);
  }, [hasPermission]);

  const canManageRoles = useMemo(() => {
    return hasPermission(Permission.MANAGE_ROLES);
  }, [hasPermission]);

  const canViewAnalytics = useMemo(() => {
    return hasPermission(Permission.VIEW_ANALYTICS);
  }, [hasPermission]);

  return {
    user,
    userRole,
    loading,
    error,
    hasRole,
    hasPermission,
    canManageUsers,
    canViewAllUsers,
    canManageRoles,
    canViewAnalytics,
    isAuthenticated: !!user,
    isSuperAdmin: hasRole(Role.SUPER_ADMIN),
    isAdmin: hasRole([Role.SUPER_ADMIN, Role.ADMIN]),
  };
};
