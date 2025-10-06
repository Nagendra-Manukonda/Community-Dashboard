"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import DashboardMain from "@/components/DashboardMain";

export default function DashboardLayout() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setCheckedAuth(true);
  }, [router]);

  if (!checkedAuth) return null;

  return isAuthenticated ? <DashboardMain /> : null;
}
