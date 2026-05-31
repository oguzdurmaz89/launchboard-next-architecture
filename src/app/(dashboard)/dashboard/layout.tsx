import type { ReactNode } from "react";
import { DashboardHeader } from "@/components/layout/dashboard-header";
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-100">
      <DashboardSidebar />

      <div className="md:pl-64">
        <DashboardHeader />
        <main className="px-6 py-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
