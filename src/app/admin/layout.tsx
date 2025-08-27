import { AdminNavBar } from "@/components/layout/AdminNavBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavBar />
      <main className="pt-20">{children}</main>
    </div>
  );
}