"use client";

import {
  useGetUsersQuery,
  useCreateUserMutation,
  useRemoveUserMutation,
} from "@/generated/graphql";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";
import { useRBAC, Permission } from "@/hooks/use-rbac";
import {
  RoleBasedComponent,
  UserManagementOnly,
} from "@/components/RoleBasedComponent";

export function UsersList() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { hasPermission } = useRBAC();
  const { data: users, loading, error, refetch } = useGetUsersQuery();
  const [createUser, { loading: creating }] = useCreateUserMutation();
  const [removeUser, { loading: removing }] = useRemoveUserMutation();

  const handleCreateUser = async () => {
    if (!hasPermission(Permission.CREATE_USER)) {
      toast.error("You don't have permission to create users");
      return;
    }

    try {
      await createUser({
        variables: {
          createUserInput: {
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            password: "defaultPassword123", // In real app, add password field
          },
        },
      });

      setNewUser({ firstName: "", lastName: "", email: "" });
      refetch();
      toast.success("User created successfully!");
    } catch (error) {
      toast.error("Failed to create user");
      console.error(error);
    }
  };

  const handleRemoveUser = async (id: string) => {
    if (!hasPermission(Permission.DELETE_USER)) {
      toast.error("You don't have permission to delete users");
      return;
    }

    try {
      await removeUser({
        variables: { id },
      });
      refetch();
      toast.success("User removed successfully!");
    } catch (error) {
      toast.error("Failed to remove user");
      console.error(error);
    }
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div className="space-y-6">
      <UserManagementOnly>
        <Card>
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
            </div>
            <Button onClick={handleCreateUser} disabled={creating}>
              {creating ? "Creating..." : "Create User"}
            </Button>
          </CardContent>
        </Card>
      </UserManagementOnly>

      <RoleBasedComponent
        permissions={Permission.READ_ALL_USERS}
        fallback={
          <Card>
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You don't have permission to view the users list.
              </p>
            </CardContent>
          </Card>
        }
      >
        <Card>
          <CardHeader>
            <CardTitle>Users ({users?.users?.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users?.users?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">
                        {user.firstName} {user.lastName}
                      </h3>
                      <Badge variant="secondary">{user.role || "user"}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <RoleBasedComponent permissions={Permission.DELETE_USER}>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRemoveUser(user.id)}
                        disabled={removing}
                      >
                        Remove
                      </Button>
                    </RoleBasedComponent>
                  </div>
                </div>
              ))}
              {(!users?.users || users.users.length === 0) && (
                <p className="text-center text-gray-500">No users found</p>
              )}
            </div>
          </CardContent>
        </Card>
      </RoleBasedComponent>
    </div>
  );
}
