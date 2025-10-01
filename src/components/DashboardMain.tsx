import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Ellipsis } from "lucide-react";
import SalesChart from "./SalesChart";
import AnalyticsChart from "./AnalyticsChart";
import { RecentOrders } from "./RecentOrders";
import { TopSellingProducts } from "./TopSellingProducts";
import DashboardHeader from "./DashboardHeader";
import DashboardBanner from "./DashboardBanner";

export default function DashboardMain() {
  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <DashboardBanner />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div>
              <CardTitle className=" flex justify-between text-[#030229]/70">
                <h1 className="font-bold text-lg"> Reports</h1>
                <Ellipsis className=" opacity-30 " />
              </CardTitle>
            </div>
            <CardContent className="h-96 w-full">
              <SalesChart />
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <div>
              <CardTitle className=" flex justify-between text-[#030229]/70">
                <h1 className="font-bold text-lg"> Analytics</h1>
                <Ellipsis className=" opacity-30 " />
              </CardTitle>
            </div>
            <CardContent className="h-96 w-full">
              <AnalyticsChart />
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div>
              <CardTitle className=" flex justify-between text-[#030229]/70">
                <h1 className="font-bold text-lg"> Recent Orders</h1>
                <Ellipsis className=" opacity-30 " />
              </CardTitle>
            </div>
            <CardContent className="h-96 w-full">
              <RecentOrders />
            </CardContent>
          </CardHeader>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <div>
              <CardTitle className=" flex justify-between text-[#030229]/70">
                <h1 className="font-bold text-lg"> Top Selling Products</h1>
                <Ellipsis className=" opacity-30 " />
              </CardTitle>
            </div>
            <CardContent className="h-96 w-full">
              <TopSellingProducts />
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
