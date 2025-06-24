import { UsersList } from "@/components/UsersList";

export default function UsersPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>
      <UsersList />
    </div>
  );
}
