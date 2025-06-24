import { Role } from "../enums/roles.enum";
import { Permission } from "../enums/permissions.enum";

export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [Role.SUPER_ADMIN]: [
    // All permissions
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
    // User management (except role management)
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
    // Only own profile and basic content access
    Permission.UPDATE_OWN_PROFILE,
    Permission.READ_OWN_PROFILE,
    Permission.READ_CONTENT,
  ],
};
