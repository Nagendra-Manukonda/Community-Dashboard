"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DashboardMain from "@/components/DashboardMain";

export default function DashboardLayout() {
  const router = useRouter();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }

    setIsAuthChecked(true);
  }, [router]);

  if (!isAuthChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading Dashboard...
      </div>
    );
  }

  return isAuthenticated ? <DashboardMain /> : null;
}
