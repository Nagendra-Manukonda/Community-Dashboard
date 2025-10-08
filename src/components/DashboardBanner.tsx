import React from "react";
import { Card, CardDescription, CardTitle } from "./ui/card";
import Image from "next/image";
import { Bannerdata } from "@/constants/constants";

export default function DashboardBanner() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 p-4">
      {Bannerdata.map((item, i) => (
        <Card key={i} className="flex flex-row items-center gap-4 p-4">
          <div className="flex justify-center items-center bg-[#5B93FF]/10 w-[60px] h-[60px] rounded-2xl">
            <Image src={item.icon} alt="icon" width={24} height={24} />
          </div>

          <div className="flex flex-col justify-center">
            <CardTitle className="font-extrabold">{item.title}</CardTitle>
            <CardDescription className="font-normal">
              {item.desc}
            </CardDescription>
          </div>
        </Card>
      ))}
    </div>
  );
}
