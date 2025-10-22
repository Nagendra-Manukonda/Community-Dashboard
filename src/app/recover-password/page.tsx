"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";

interface RecoverFormValues {
  password: string;
  confirmPassword: string;
}

export default function RecoverPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RecoverFormValues>({
    mode: "onChange",
  });

  const passwordValue = watch("password");

  const handleRecover = (data: RecoverFormValues) => {
    if (data.password !== data.confirmPassword) {
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
          <form onSubmit={handleSubmit(handleRecover)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`h-[50px] pr-8 w-full rounded-[10px] border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2` top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="  space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className=" relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === passwordValue || "Passwords do not match",
                  })}
                  className={`h-[50px] w-full rounded-[10px] border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="bg-[#605BFF] hover:bg-blue-600 text-white font-semibold rounded-[10px] w-full"
            >
              Reset Your Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
