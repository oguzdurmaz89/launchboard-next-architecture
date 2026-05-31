import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";
import { requireCurrentUser } from "@/lib/auth/get-current-user";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await requireCurrentUser();

  const userName = user.name ?? user.email ?? "Signed-in user";

  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardSidebar />

      <div className="md:pl-64">
        <DashboardHeader userName={userName} />
        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
