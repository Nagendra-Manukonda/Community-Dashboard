"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Analytics } from "@/types/analytics";
import { defaultData } from "@/constants/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Camera,
  ChevronDown,
  EllipsisVertical,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  Plus,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  RadialBar,
  PolarAngleAxis,
  RadialBarChart,
} from "recharts";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import CustomToolTip from "./Analytics/CustomToolTip";
import CircleBar from "./Analytics/CircleBar";

export default function AnalyticsMain() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isCustomerDrawerOpen, setIsCustomerDrawerOpen] = useState(false);

  const data = [
    { month: "Jan", value: 1423 },
    { month: "Feb", value: 2333 },
    { month: "Mar", value: 4303 },
    { month: "Apr", value: 3358 },
    { month: "May", value: 6245 },
    { month: "Jun", value: 8238 },
  ];

  const column: ColumnDef<Analytics>[] = [
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-2">
          <span className="font-normal text-xs text-[#030229]">Name</span>
          <ChevronDown className="w-3 h-3 items-center fill-[#030229]" />
        </div>
      ),
      cell: ({ row }) => {
        const { name, image } = row.original;
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-2">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={30}
                height={30}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-semibold text-purple-700">
                {initials}
              </div>
            )}
            <span className="text-sm font-normal text-[#030229]">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="flex items-center gap-2">
          <span className="font-normal text-xs text-[#030229]">Email</span>
          <ChevronDown className="w-3 h-3 items-center fill-[#030229]" />
        </div>
      ),
      cell: ({ row }) => (
        <span className="text-sm text-gray-700">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "moblie",
      header: () => (
        <div className="flex items-center gap-2">
          <span className="font-normal text-xs text-[#030229]">
            Phone number
          </span>
          <ChevronDown className="w-3 h-3 items-center fill-[#030229] " />
        </div>
      ),
      cell: ({ row }) => (
        <span className="text-sm  text-gray-700">{row.original.moblie}</span>
      ),
    },
    {
      accessorKey: "gender",
      header: () => (
        <div className="flex items-center gap-2">
          <span className="font-normal text-xs text-[#030229]">Gender</span>
          <ChevronDown className="w-3 h-3 items-center fill-[#030229]" />
        </div>
      ),
      cell: ({ row }) => {
        const gender = row.original.gender;
        const isMale = gender.toLowerCase() === "male";
        const bgColor = isMale ? "bg-[#5B93FF]/10" : "bg-[#FF8F6B]/10";
        const textColor = isMale ? "text-[#5B93FF]" : "text-[#FF8F6B]";

        return (
          <span
            className={`px-3 py-1 text-xs font-medium rounded-full ${bgColor} ${textColor}`}
          >
            {gender}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const isOpen = openMenuId === row.original.id;

        return (
          <div className="relative flex justify-center">
            <MoreHorizontal
              className="w-5 h-5 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setOpenMenuId(isOpen ? null : row.original.id)}
            />
            {isOpen && (
              <div className="absolute z-10 top-6 right-0 w-28 bg-white border border-gray-200 shadow-md rounded-md py-1">
                <Button
                  onClick={() => {
                    alert(`Edit ${row.original.name}`);
                    setOpenMenuId(null);
                  }}
                  className="w-full text-left px-3 bg-[#5B93FF]/5 flex gap-2 items-center hover:bg-[#5B93FF]/10 py-2 text-sm text-[#5B93FF]"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    alert(`Delete ${row.original.name}`);
                    setOpenMenuId(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm items-center flex gap-2 hover:bg-[#E71D36]/10 bg-[#E71D36]/5 text-[#E71D36]"
                >
                  <Trash className="w-4 h-4" />
                  Delete
                </Button>
              </div>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: defaultData,
    columns: column,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex w-full ">
      <div className="w-11/12 p-6 flex flex-col rounded-xl bg-white justify-start">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-lg text-[#030229]">Customer List</h1>
          <Button
            className="bg-[#605BFF]/90 hover:bg-[#605BFF] flex items-center gap-1 text-white"
            onClick={() => setIsCustomerDrawerOpen(true)}
          >
            <Plus className="w-4 h-4" />
            Add Customer
          </Button>
          {isCustomerDrawerOpen && (
            <div className="fixed inset-0 z-50 flex justify-end ease-in-out h-full ">
              <div className="w-[330px] h-full bg-background border-l p-6 relative rounded-xl overflow-y-auto">
                <Button
                  className="absolute top-4 right-4 text-gray-500 items-center hover:bg-[#605BFF]/70 hover:text-white text-lg"
                  onClick={() => setIsCustomerDrawerOpen(false)}
                  aria-label="Close"
                >
                  x
                </Button>

                <h2 className="text-xl font-semibold mb-6 text-[#030229]">
                  Add Customer
                </h2>

                <div className="flex justify-center mb-6">
                  <Avatar className="w-24 h-24">
                    <AvatarImage
                      src="/assets/placeholder-avatar.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>
                      <Camera className="fill-[#030229]/70 text-white" />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <form className="flex flex-col gap-4 text-sm">
                  <div className="flex flex-col gap-3">
                    <label className="text-[#030229] text-sm">First Name</label>
                    <Input placeholder="John " />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[#030229] text-sm">Last Name</label>
                    <Input placeholder="Deo" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[#030229] text-sm">Email</label>
                    <Input type="email" placeholder="Enter email address" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-[#030229] text-sm">Phone</label>
                    <Input type="tel" placeholder="33757005467" />
                  </div>
                  <div className="flex flex-col gap-3 text-[#030229]/50">
                    <label className="text-[#030229] text-sm">Gender</label>
                    <select className="border rounded-[10px] px-3 py-2 text-sm  bg-[#030229]/5">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="mt-4 bg-[#605BFF] hover:bg-[#4e4ae6] h-12 text-white"
                  >
                    Add Customer
                  </Button>
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-md mt-8 ">
          <table className="min-w-full text-sm  text-left">
            <thead className=" bg-gray-100  text-gray-600 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="mt-3.5 ">
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-4 py-2 font-medium">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="border-t transition-transform duration-200 rounded-[10px] hover:-translate-y-3 hover:shadow-lg shadow-[#605BFF]/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-4 ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="w-1/4 p-3 flex h-full items-center justify-center mt-8 rounded-xl bg-gray-50">
        <Card className="w-[320px] p-3 h-full flex flex-col items-center text-center gap-4">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/assets/image.svg" alt="John Deo" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center">
            <span className="font-semibold text-xl text-[#030229]">
              John Deo
            </span>
            <span className="text-sm text-[#030229]/70">UI/UX Designer</span>
          </div>
          <Separator className="w-full my-2" />
          <div className="flex flex-col justify-start items-start text-sm text-[#030229]/80 space-y-6">
            <CardTitle className="text-base items-start text-[#030229] ">
              Contact Info
            </CardTitle>
            <CardDescription className="flex flex-row items-center gap-1.5">
              <Mail className="w-4 h-4" />
              kajope5182@ummoh.com
            </CardDescription>
            <CardDescription className="flex flex-row items-center mr-20 gap-1.5">
              <Phone className="w-4 h-4" />
              33757005467
            </CardDescription>
            <CardDescription className="flex flex-row items-center mr-6 gap-1.5">
              <MapPin className="w-4 h-4" />
              2239 Hog Camp Road <br />
              Schaumburg
            </CardDescription>
          </div>
          <Card className="mt-6 w-full">
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between font-semibold text-lg text-[#030229] items-center">
                Performance
                <EllipsisVertical className="text-[#030229]/30" />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[160px] px-2">
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={data}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-gray-200"
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<CustomToolTip />}
                    cursor={{ fill: "rgba(0,0,0,0.05)" }}
                  />
                  <Bar
                    dataKey="value"
                    className="fill-[#FF8F6B]/50  cursor-pointer hover:fill-[#FF8F6B] text-[#030229]/70 font-normal text-xs"
                    radius={[6, 6, 0, 0]}
                    barSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <div className="flex justify-around w-full mt-4">
              <CircleBar value={70} color="#FFD66B" />
              <CircleBar value={60} color="#5B93FF" />
            </div>
          </Card>
        </Card>
      </div>
    </div>
  );
}
