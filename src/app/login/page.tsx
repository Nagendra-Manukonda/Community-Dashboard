"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function Loginpage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      // If there's a token, do not render this page; redirect in handle or by middleware
      router.push("/dashboard");
    } else {
      // No token means we should render login page
      setCanRender(true);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    // Still checking, render nothing
    return null;
  }

  if (!canRender) {
    // If we determined it's not for this page (user is already authenticated), render nothing
    return null;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "admin@test.com" && password === "123456") {
      const token = "my-secret-token";

      Cookies.set("token", token, { expires: rememberMe ? 7 : undefined });
      Cookies.set("user", JSON.stringify({ email, rememberMe }), {
        expires: rememberMe ? 7 : undefined,
      });

      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
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
            <h1 className="font-semibold text-xl text-[#000000]">Log in</h1>
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
              <span className="flex-1 h-px bg-gray-200" />
              Or
              <span className="flex-1 h-px bg-gray-200" />
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md text-[#030229]/70 font-normal"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-8 rounded-md border w-full text-[#030229]/50"
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

              <div className="flex justify-between items-center">
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
                <span
                  onClick={() => router.push("/recover-password")}
                  className="text-sm text-[#605BFF] hover:underline cursor-pointer"
                >
                  Reset Password?
                </span>
              </div>

              <Button
                type="submit"
                className="bg-[#605BFF] hover:bg-blue-600 cursor-pointer text-white font-semibold rounded-lg"
              >
                Log in
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center mt-4">
            <p className="text-sm">
              Don't have an account yet?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-[#605BFF] hover:underline cursor-pointer"
              >
                New Account
              </span>
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
