import { UsersList } from "@/components/UsersList";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function UsersPage() {
  return (
    <ProtectedRoute adminOnly>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Users Management</h1>
        <UsersList />
      </div>
    </ProtectedRoute>
  );
}
