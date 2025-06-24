"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useRBAC, Permission } from "@/hooks/use-rbac";
import { RoleBasedComponent } from "@/components/RoleBasedComponent";

export function UserProfile() {
  const { user, hasPermission } = useRBAC();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });

  const handleSave = async () => {
    if (!hasPermission(Permission.UPDATE_OWN_PROFILE)) {
      toast.error("You don't have permission to update your profile");
      return;
    }

    try {
      // TODO: Implement updateOwnProfile mutation
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">
                {user.firstName} {user.lastName}
              </h3>
              <Badge variant="outline">{user.role}</Badge>
            </div>
            <RoleBasedComponent permissions={Permission.UPDATE_OWN_PROFILE}>
              <Button
                variant={isEditing ? "outline" : "default"}
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </Button>
            </RoleBasedComponent>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              {isEditing ? (
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      firstName: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">{user.firstName}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              {isEditing ? (
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      lastName: e.target.value,
                    }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">{user.lastName}</p>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              ) : (
                <p className="text-sm text-gray-600">{user.email}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label>Email Verified</Label>
              <p className="text-gray-600">
                {user.isEmailVerified ? "Yes" : "No"}
              </p>
            </div>
            <div>
              <Label>Member Since</Label>
              <p className="text-gray-600">
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RoleBasedComponent permissions={Permission.VIEW_ANALYTICS}>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have access to view analytics and system data.
            </p>
          </CardContent>
        </Card>
      </RoleBasedComponent>

      <RoleBasedComponent permissions={Permission.MANAGE_ROLES}>
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You have permission to manage user roles and permissions.
            </p>
          </CardContent>
        </Card>
      </RoleBasedComponent>
    </div>
  );
}
