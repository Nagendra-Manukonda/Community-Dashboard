"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <div
          className={`${
            collapsed ? "w-20" : "w-56"
          } transition-all duration-500`}
        >
          <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-2">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
