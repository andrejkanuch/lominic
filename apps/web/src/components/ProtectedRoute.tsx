"use client";

import { useEffect } from "react";
import { useRBAC } from "@/hooks/use-rbac";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  adminOnly = false,
}) => {
  const { isAuthenticated, isAdmin, loading } = useRBAC();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = "/login";
    }
  }, [isAuthenticated, loading]);

  if (loading || !isAuthenticated) {
    return <div className="p-4">Loading...</div>;
  }

  if (adminOnly && !isAdmin) {
    return <div className="p-4">Access denied</div>;
  }

  return <>{children}</>;
};
