import { NavBar } from "@/components/layout/NavBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-transparent">
      <NavBar />
      <main>{children}</main>
    </div>
  );
}
