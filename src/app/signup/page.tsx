"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { SignUpFormValues, signUpSchema } from "../Validation/signUpSchema";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const handleSignup = (data: SignUpFormValues) => {
    const token = "my-secret-token";

    Cookies.set("token", token, {
      expires: data.rememberMe ? 7 : undefined,
    });

    Cookies.set("user", JSON.stringify({ email: data.email }), {
      expires: data.rememberMe ? 7 : undefined,
    });

    router.push("/dashboard");
  };

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#F9F9FF]">
      <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:ml-10 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col justify-center items-center mb-4">
            <Image
              src="/assets/art.svg"
              alt="community-icon"
              width={96}
              height={96}
              className="mb-4"
            />
            <h1 className="font-semibold text-xl text-[#000000]">
              Create Account
            </h1>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Button className="flex-1 bg-white border border-gray-300 text-[#030229] rounded-md hover:bg-gray-100">
                <Image
                  src="/assets/google.png"
                  alt="google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </Button>
              <Button className="flex-1 bg-white border border-gray-300 text-[#030229] rounded-md hover:bg-gray-100">
                <Image
                  src="/assets/facebook.png"
                  alt="facebook"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Facebook
              </Button>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <span className="flex-1 h-px bg-gray-200" />
              Or
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name")}
                  className="rounded-md w-full text-[#030229]/70 border font-normal"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  {...register("email")}
                  className="rounded-md w-full text-[#030229]/70 border font-normal"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...register("username")}
                  className="rounded-md w-full text-[#030229]/70 border font-normal"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="pr-8 w-full rounded-md border text-[#030229]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 justify-center cursor-pointer font-semibold -translate-y-1/2 text-[#030229]/50"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Controller
                name="rememberMe"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex w-full justify-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={!!value}
                      onCheckedChange={(checked) => onChange(!!checked)}
                      className="h-4 w-4 border border-[#030229]/70 cursor-pointer bg-white text-[#030229] focus:ring-0 mt-1"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="font-normal w-80 h-11 text-[#030229]"
                    >
                      By creating an account you agree to the <br />
                      <Link
                        href="/terms"
                        className="text-[#605BFF] hover:underline"
                      >
                        terms of use
                      </Link>{" "}
                      and our{" "}
                      <Link
                        href="/privacy"
                        className="text-[#605BFF] hover:underline"
                      >
                        privacy policy.
                      </Link>
                    </label>
                  </div>
                )}
              />

              <Button
                type="submit"
                className="bg-[#4a44ff] w-full cursor-pointer hover:bg-[#05009e] rounded-[10px] font-semibold"
              >
                Create account
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm">
              Already have an account?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-[#605BFF] hover:underline cursor-pointer"
              >
                Log in
              </span>
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/assets/Illustration.svg"
          alt="Illustration"
          width={447}
          height={402}
          className="max-w-[90%] md:max-w-lg lg:max-w-md"
        />
      </div>
    </div>
  );
}
