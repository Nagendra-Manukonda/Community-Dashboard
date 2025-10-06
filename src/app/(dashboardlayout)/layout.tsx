"use client";

import { useState, useEffect } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token"); // ✅ Use cookie here

    if (!token) {
      router.push("/login");
    } else {
      setIsLoading(false); // ✅ Only allow render when token is confirmed
    }
  }, [router]);

  if (isLoading) return null; // ✅ Prevent flicker

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
