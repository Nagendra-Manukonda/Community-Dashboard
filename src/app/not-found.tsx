"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9FF] text-center px-4">
      <Image
        src="/assets/5060703_2668387.jpg"
        alt="404 Not Found"
        width={500}
        height={500}
        className="mb-8"
      />
      <h1 className="text-4xl font-bold  text-[#030229] mb-4">
        Page Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/dashboard">
        <Button className="bg-[#605BFF] h-11  hover:bg-[#4a48d8] text-white rounded-md">
          Go to Dashboard
        </Button>
      </Link>
    </div>
  );
}
