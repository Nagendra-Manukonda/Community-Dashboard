"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }

    setCheckingAuth(false);
  }, [router]);

  if (checkingAuth) {
    return <div className="h-screen w-screen bg-white" />; // Blank screen while checking
  }

  if (!isAuthenticated) return null;

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
