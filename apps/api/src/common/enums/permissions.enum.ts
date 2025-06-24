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
