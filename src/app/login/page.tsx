"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, ChevronLeft } from "lucide-react";
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
import {
  LoginFormValues,
  loginSignupSchema,
} from "../Validation/loginSignupSchema";
import { STEP, LoginPageProps } from "@/types/login";

export default function LoginPage({ initialStep }: LoginPageProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [showStep, setShowStep] = useState<STEP>(initialStep || STEP.EMAIL);
  const [isUserRegistered, setIsUserRegistered] = useState<boolean>(false);
  const [isLoaderFormSubmit, setIsLoaderFormSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSignupSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const checkEmailRegistered = async (email: string) => {
    return email === "admin@test.com";
  };

  const handleEmailCheck = async () => {
    setIsLoaderFormSubmit(true);
    const registered = await checkEmailRegistered(getValues("email"));
    setIsUserRegistered(registered);
    setShowStep(registered ? STEP.PASSWORD : STEP.FORGOT_PASSWORD);
    setIsLoaderFormSubmit(false);
  };

  const onSubmit = (data: LoginFormValues) => {
    if (data.email === "admin@test.com" && data.password === "123456") {
      const token = "my-secret-token";
      Cookies.set("token", token, { expires: data.rememberMe ? 7 : undefined });
      Cookies.set(
        "user",
        JSON.stringify({ email: data.email, rememberMe: data.rememberMe }),
        { expires: data.rememberMe ? 7 : undefined }
      );
      router.push("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#F9F9FF]">
      <div className="w-full md:w-1/2 flex justify-center md:justify-start mb-10 md:ml-10 px-4">
        <Card className="w-full max-w-md" data-registered={isUserRegistered}>
          <CardHeader className="flex flex-col justify-center items-center mb-4">
            <Image
              src="/assets/art.svg"
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

            {showStep === STEP.EMAIL && (
              <form className="space-y-4" onSubmit={handleEmailCheck}>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@gmail.com"
                    {...register("email")}
                    className="rounded-md w-full text-[#030229]/70 font-normal"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="bg-[#605BFF] w-full hover:bg-[#3833c6] cursor-pointer text-white font-semibold rounded-lg"
                  disabled={isLoaderFormSubmit}
                >
                  Continue
                </Button>
              </form>
            )}

            {showStep === STEP.PASSWORD && (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      {...register("password")}
                      className="pr-8 rounded-md w-full border text-[#030229]/50"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Controller
                      control={control}
                      name="rememberMe"
                      render={({ field }) => (
                        <Checkbox
                          id="remember"
                          checked={!!field.value}
                          onCheckedChange={(val: boolean) =>
                            field.onChange(val)
                          }
                          onBlur={field.onBlur}
                        />
                      )}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <span
                    onClick={() => setShowStep(STEP.FORGOT_PASSWORD)}
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
            )}

            {showStep === STEP.FORGOT_PASSWORD && (
              <div className=" flex space-y-2 gap-3">
                <Button
                  className="bg-[#605BFF] hover:bg-[#3b36d7] text-white"
                  onClick={() => alert("Reset code sent!")}
                >
                  Get reset code
                </Button>
                <Button
                  className="bg-[#605BFF] text-white  hover:bg-[#403bc6]"
                  onClick={() => setShowStep(STEP.EMAIL)}
                >
                  <span className="inline-flex  items-center">
                    <ChevronLeft size={18} /> Back
                  </span>
                </Button>
              </div>
            )}
          </CardContent>

          <CardFooter className="flex justify-center mt-4">
            <p className="text-sm">
              {"Don't have an account yet? "}
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
          src="/assets/Illustration (3).svg"
          alt="Illustration"
          width={447}
          height={402}
          className="max-w-[90%] md:max-w-lg lg:max-w-md"
        />
      </div>
    </div>
  );
}
