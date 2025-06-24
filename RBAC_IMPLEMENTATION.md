# RBAC (Role-Based Access Control) Implementation

This document describes the comprehensive RBAC system implemented for the NestJS + GraphQL + TypeORM backend and React frontend.

## Overview

The RBAC system provides three user roles with different permission levels:

- **Super Admin**: Full system access
- **Admin**: User management and content access
- **User**: Basic profile management and content viewing

## Backend Implementation

### Core Components

#### 1. Enums and Types

- `Role` enum: Defines the three user roles
- `Permission` enum: Defines all possible permissions
- `ROLE_PERMISSIONS`: Maps roles to their allowed permissions

#### 2. Guards

- `RolesGuard`: Checks if user has required roles
- `PermissionsGuard`: Checks if user has required permissions

#### 3. Decorators

- `@Roles()`: Mark endpoints with required roles
- `@RequirePermissions()`: Mark endpoints with required permissions
- `@CurrentUser()`: Extract current user from context

#### 4. Database Schema

- User entity updated with Role enum
- Migration created for role enum support

### Permission Matrix

| Permission         | Super Admin | Admin | User |
| ------------------ | ----------- | ----- | ---- |
| CREATE_USER        | ✅          | ✅    | ❌   |
| READ_USER          | ✅          | ✅    | ❌   |
| UPDATE_USER        | ✅          | ✅    | ❌   |
| DELETE_USER        | ✅          | ✅    | ❌   |
| READ_ALL_USERS     | ✅          | ✅    | ❌   |
| UPDATE_OWN_PROFILE | ✅          | ✅    | ✅   |
| READ_OWN_PROFILE   | ✅          | ✅    | ✅   |
| MANAGE_ROLES       | ✅          | ❌    | ❌   |
| MANAGE_PERMISSIONS | ✅          | ❌    | ❌   |
| SYSTEM_SETTINGS    | ✅          | ❌    | ❌   |
| CREATE_CONTENT     | ✅          | ✅    | ❌   |
| READ_CONTENT       | ✅          | ✅    | ✅   |
| UPDATE_CONTENT     | ✅          | ✅    | ❌   |
| DELETE_CONTENT     | ✅          | ✅    | ❌   |
| VIEW_ANALYTICS     | ✅          | ✅    | ❌   |
| EXPORT_DATA        | ✅          | ✅    | ❌   |

### Usage Examples

#### Protecting Resolvers

```typescript
@Resolver(() => User)
@UseGuards(RolesGuard, PermissionsGuard)
export class UsersResolver {
  @Query(() => [User])
  @RequirePermissions(Permission.READ_ALL_USERS)
  async users(@CurrentUser() currentUser: User): Promise<User[]> {
    return this.usersService.findAllUsers(currentUser);
  }

  @Mutation(() => User)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @RequirePermissions(Permission.CREATE_USER)
  async createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
    @CurrentUser() currentUser: User
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }
}
```

#### Service-Level Permission Checks

```typescript
async updateUser(id: string, updateUserInput: UpdateUserInput, currentUser: User): Promise<User> {
  const user = await this.findOneUser(id, currentUser);

  // Users can only update their own profile unless they have UPDATE_USER permission
  if (currentUser.id !== id && !userPermissions.includes(Permission.UPDATE_USER)) {
    throw new ForbiddenException('Insufficient permissions to update this user');
  }

  // Only super admins can change roles
  if (updateUserInput.role && currentUser.role !== Role.SUPER_ADMIN) {
    throw new ForbiddenException('Only super admins can change user roles');
  }

  Object.assign(user, updateUserInput);
  return this.usersRepository.save(user);
}
```

## Frontend Implementation

### Core Components

#### 1. RBAC Hook (`useRBAC`)

Provides role and permission checking functionality:

```typescript
const { user, hasRole, hasPermission, isAdmin, isSuperAdmin } = useRBAC();
```

#### 2. Role-Based Components

- `RoleBasedComponent`: Generic wrapper for conditional rendering
- `AdminOnly`: Shows content only to admins
- `SuperAdminOnly`: Shows content only to super admins
- `UserManagementOnly`: Shows content only to users with user management permissions

### Usage Examples

#### Conditional Rendering

```typescript
<RoleBasedComponent permissions={Permission.READ_ALL_USERS}>
  <UsersList />
</RoleBasedComponent>

<AdminOnly>
  <AdminDashboard />
</AdminOnly>

<SuperAdminOnly>
  <RoleManagement />
</SuperAdminOnly>
```

#### Permission Checks in Components

```typescript
const handleCreateUser = async () => {
  if (!hasPermission(Permission.CREATE_USER)) {
    toast.error("You don't have permission to create users");
    return;
  }
  // ... create user logic
};
```

#### Navigation Guards

```typescript
const { isAdmin, canViewAnalytics } = useRBAC();

const navigationItems = [
  { label: "Dashboard", href: "/dashboard" },
  ...(isAdmin ? [{ label: "Users", href: "/users" }] : []),
  ...(canViewAnalytics ? [{ label: "Analytics", href: "/analytics" }] : []),
];
```

## Security Features

### Backend Security

1. **JWT Token Validation**: All requests validated through JWT strategy
2. **Role-Based Guards**: Global guards check roles and permissions
3. **Service-Level Validation**: Additional checks in service methods
4. **Context Injection**: User context automatically injected into GraphQL resolvers

### Frontend Security

1. **Client-Side Permission Checks**: UI elements hidden based on permissions
2. **API Error Handling**: Graceful handling of permission denied errors
3. **Route Protection**: Navigation items filtered by permissions
4. **Toast Notifications**: User-friendly error messages for permission issues

## Database Migration

Run the migration to update the user table:

```bash
npm run migration:run
```

This will:

- Create the role enum type
- Update the role column to use the enum
- Set default role to 'user'

## Testing the Implementation

### Creating Test Users

1. **Super Admin**: Register normally, then manually update role in database
2. **Admin**: Use the createUser mutation (requires admin permissions)
3. **User**: Default role for new registrations

### Testing Permissions

1. **User Management**: Try accessing `/users` page with different roles
2. **Profile Updates**: Test updating own profile vs other users
3. **Role Changes**: Verify only super admins can change roles
4. **Content Access**: Test content creation/editing permissions

## Best Practices

### Backend

1. Always use guards and decorators for endpoint protection
2. Implement service-level permission checks for complex logic
3. Use the `@CurrentUser()` decorator to access user context
4. Throw `ForbiddenException` for permission violations

### Frontend

1. Use the `useRBAC` hook for permission checks
2. Wrap sensitive components with `RoleBasedComponent`
3. Provide fallback UI for unauthorized access
4. Handle API errors gracefully with user-friendly messages

## Future Enhancements

1. **Dynamic Permissions**: Database-driven permission system
2. **Permission Groups**: Group permissions for easier management
3. **Audit Logging**: Track permission usage and violations
4. **Fine-Grained Permissions**: More granular permission controls
5. **Role Inheritance**: Hierarchical role system
