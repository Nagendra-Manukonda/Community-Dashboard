"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RecoverPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRecover = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    alert("Password successfully reset!");

    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9FF]">
      <Card className="w-full max-w-xl p-6">
        <CardHeader className="flex flex-col justify-center items-center mb-4">
          <Image
            src="/assets/art.svg"
            alt="community-icon"
            width={96}
            height={96}
            className="mb-4"
          />
          <h1 className="font-semibold text-xl text-[#000000]">Recover</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRecover} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-[50px] pr-8 rounded-[10px]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-[50px] rounded-[10px]"
              />
            </div>
            <Button
              type="submit"
              className=" bg-[#605BFF] hover:bg-blue-600 text-white font-semibold rounded-[10px]"
            >
              Reset Your Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
