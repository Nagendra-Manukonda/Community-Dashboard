"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loginpage from "./login/page";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return <Loginpage />;
}
