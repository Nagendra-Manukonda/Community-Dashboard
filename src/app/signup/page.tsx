"use client";

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

export default function SignInpage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
      router.push("/dashboard");
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  if (isAuthenticated === null) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      Cookies.set("token", "my-secret-token", {
        expires: rememberMe ? 7 : undefined,
      });
      Cookies.set("user", JSON.stringify({ email }), {
        expires: rememberMe ? 7 : undefined,
      });

      router.push("/dashboard");
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#F9F9FF]">
      <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:ml-10 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col justify-center items-center mb-4">
            <Image
              src="/art.png"
              alt="community-icon"
              width={96}
              height={96}
              className="mb-4"
            />
            <h1 className="font-semibold text-xl text-[#000000]">Sign In</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-3">
              <Button className="flex-1 bg-white border border-gray-300 text-[#030229] rounded-md hover:bg-gray-100">
                <Image
                  src="/google.png"
                  alt="google"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Google
              </Button>
              <Button className="flex-1 bg-white border border-gray-300 text-[#030229] rounded-md hover:bg-gray-100">
                <Image
                  src="/facebook.png"
                  alt="facebook"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                Facebook
              </Button>
            </div>

            <div className="flex items-center gap-3 text-gray-400">
              <span className="flex-1 h-px bg-gray-200" /> Or{" "}
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-3">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="rounded-md text-[#030229]/70 border font-normal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md text-[#030229]/70 border font-normal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="Username">Username</Label>
                <Input
                  id="Username"
                  type="text"
                  placeholder="Enter your username"
                  required
                  className="rounded-md text-[#030229]/70 border font-normal"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-8 rounded-md border text-[#030229]/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 justify-center cursor-pointer font-semibold -translate-y-1/2 text-[#030229]/50"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
              </div>

              {/* ADDED REMEMBER ME CHECKBOX */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(checked as boolean)
                  }
                  className="h-4 w-4 border border-[#030229]/70 bg-white cursor-pointer focus:ring-0"
                />
                <Label htmlFor="remember" className="text-sm">
                  Remember me
                </Label>
              </div>

              <div className="flex w-full justify-center space-x-2">
                <Checkbox
                  id="terms"
                  className="h-4 w-4 border border-[#030229]/70 cursor-pointer bg-white text-[#030229] focus:ring-0 mt-1"
                />
                <label
                  htmlFor="terms"
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

              <Button className="bg-[#605BFF] cursor-pointer hover:bg-blue-700 rounded-[10px] font-semibold">
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
              </span>{" "}
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="w-full md:w-1/2 flex justify-center">
        <Image
          src="/Illustration.svg"
          alt="Illustration"
          width={447}
          height={402}
          className="max-w-[90%] md:max-w-lg lg:max-w-md"
        />
      </div>
    </div>
  );
}
