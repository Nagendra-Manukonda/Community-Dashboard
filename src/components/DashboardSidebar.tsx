"use client";

import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  CalendarDays,
  ChartNoAxesColumn,
  ClipboardList,
  LayoutGrid,
  MessageSquareDot,
  ReceiptIndianRupee,
  Settings,
  ArrowRight,
  ArrowLeft,
  LogOutIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import cookie from "js-cookie";

export default function DashboardSidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  const pathname = usePathname();

  const handleLogoutIcon = () => {
    window.location.href = "/login";
    console.log("Logout clicked");
    cookie.remove("token");
    cookie.remove("user");
  };

  const menuButtonClass = (href: string) =>
    `${
      collapsed
        ? "justify-center w-10 h-10"
        : "w-full flex items-center gap-2 px-2 py-2"
    } 
     rounded-md transition-colors
     ${
       pathname === href
         ? "bg-[#605BFF]/10 text-[#605BFF] font-semibold"
         : "hover:bg-gray-200 text-gray-700"
     }`;

  return (
    <Sidebar
      className={`transition-all duration-700 ease-in-out flex flex-col
        ${collapsed ? "w-20" : "w-56"} 
        bg-white rounded-[10px] shadow-md h-screen relative`}
    >
      <SidebarHeader className="flex relative items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/art.svg"
            alt="Logo"
            width={32}
            height={32}
            className="shrink-0"
          />
          {!collapsed && (
            <h1 className="font-semibold text-lg text-[#030229]">Base</h1>
          )}
        </div>

        <Button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-2 -right-3 p-1 rounded-md cursor-pointer hover:bg-transparent  
            text-[#605BFF] w-6 h-6 bg-transparent transition-all duration-500 ease-in-out"
        >
          {collapsed ? <ArrowRight size={18} /> : <ArrowLeft size={18} />}
        </Button>
      </SidebarHeader>

      <SidebarGroupContent
        className={`flex-1 overflow-y-auto sidebar-scroll transition-all duration-500 ${
          collapsed ? "px-1" : "px-2"
        }`}
      >
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <Link href="/dashboard">
              <SidebarMenuButton className={menuButtonClass("/dashboard")}>
                <LayoutGrid />
                {!collapsed && <h1>Dashboard</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/analytics">
              <SidebarMenuButton className={menuButtonClass("/analytics")}>
                <ChartNoAxesColumn />
                {!collapsed && <h1>Analytics</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/invoice">
              <SidebarMenuButton className={menuButtonClass("/invoice")}>
                <ReceiptIndianRupee />
                {!collapsed && <h1>Invoice</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/schedule">
              <SidebarMenuButton className={menuButtonClass("/schedule")}>
                <ClipboardList />
                {!collapsed && <h1>Schedule</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/calendar">
              <SidebarMenuButton className={menuButtonClass("/calendar")}>
                <CalendarDays />
                {!collapsed && <h1>Calendar</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/messages">
              <SidebarMenuButton
                className={`${
                  collapsed
                    ? "justify-center w-10 h-10"
                    : "w-full flex justify-between items-center px-2 py-2"
                } rounded-md transition-colors ${
                  pathname === "/messages"
                    ? "bg-[#605BFF]/10 text-[#605BFF] font-semibold"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquareDot className="w-4 h-4 " />
                  {!collapsed && <h1>Messages</h1>}
                </div>
                {!collapsed && (
                  <span className="text-[10px] font-semibold bg-[#D11A2A]/10 text-[#D11A2A] rounded-full px-2 py-0.5">
                    49
                  </span>
                )}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/notifications">
              <SidebarMenuButton className={menuButtonClass("/notifications")}>
                <Bell />
                {!collapsed && <h1>Notification</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Link href="/settings">
              <SidebarMenuButton className={menuButtonClass("/settings")}>
                <Settings />
                {!collapsed && <h1>Settings</h1>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>

        {!collapsed && (
          <div className="flex flex-col items-center gap-2 mt-6">
            <Image
              src="/assets/Illustration (2).svg"
              alt="Upgrade"
              width={90}
              height={90}
              className="opacity-90 mt-32"
            />
          </div>
        )}

        <SidebarMenu>
          <SidebarContent>
            <div
              className={`mt-6 rounded-[10px] p-2 transition-all duration-500 ${
                collapsed
                  ? "flex flex-col  gap-2 h-auto"
                  : "flex flex-row items-center justify-between"
              }`}
            >
              <div
                className={`flex ${
                  collapsed ? "flex-col mt-20 " : "items-center gap-3"
                }`}
              >
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage src="/assets/Profile photo.svg" alt="User" />
                  <AvatarFallback>EA</AvatarFallback>
                </Avatar>
                {!collapsed && (
                  <div className="flex flex-col">
                    <h1 className="text-sm font-semibold text-[#030229]">
                      Easin Arafat
                    </h1>
                    <p className="text-xs font-normal text-[#000000]/50">
                      Free Account
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={handleLogoutIcon}
                className={`p-1 text-[#030229]/50 cursor-pointer hover:text-red-500 ${
                  collapsed ? "mt-2" : ""
                }`}
              >
                <LogOutIcon size={18} />
              </button>
            </div>
          </SidebarContent>
        </SidebarMenu>
      </SidebarGroupContent>
    </Sidebar>
  );
}
