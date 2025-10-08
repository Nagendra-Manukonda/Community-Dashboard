"use client";

import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  MapPin,
  ChevronDown,
  CalendarIcon,
  Clock,
} from "lucide-react";
import { Schedule } from "@/types/schedule";
import { scheduleData } from "@/constants/constants";

const columns: ColumnDef<Schedule>[] = [
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-[#000000]/60  font-semibold">
        <CalendarIcon size={16} className="text-[#605BFF]" />
        {getValue() as string}
      </div>
    ),
  },
  {
    header: "Time",
    accessorKey: "time",
    cell: ({ getValue }) => (
      <div className="flex items-center gap-2 text-[#000000] font-semibold">
        <Clock size={16} className="text-[#030229]/60" />
        {getValue() as string}
      </div>
    ),
  },
  {
    header: "Location",
    accessorKey: "location",
    cell: ({ getValue }) => (
      <div className="bg-[#605BFF]/10 text-[#605BFF] px-3 py-1 w-full h-11 rounded-full text-sm flex items-center gap-2">
        <MapPin size={14} />
        {getValue() as string}
      </div>
    ),
  },
  {
    header: "",
    id: "actions",
    cell: () => (
      <div className="flex gap-3 justify-center">
        <Button className="text-[#FFD66B] w-10 h-10 bg-[#FFD66B]/10 flex justify-center items-center rounded-full hover:bg-[#FFD66B]/10">
          <Pencil size={16} />
        </Button>
        <Button className="text-[#D11A2A] w-10 h-10 bg-[#DF6F79]/10 rounded-full flex justify-center items-center hover:bg-[#DF6F79]/10">
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];

export default function ScheduleListMain() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [data] = useState(() => [...scheduleData]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="bg-[#605BFF]/10 h-fit">
      <header className="flex items-center justify-between mt-1 px-4 pb-2 bg-white rounded-xs">
        <div className="flex flex-1 justify-between py-2 items-center">
          <h1 className="font-bold text-lg text-[#030229]">Schedule List</h1>
          <Button className="bg-[#605BFF]/90 hover:bg-[#605BFF] flex items-center gap-1 text-white">
            <Plus className="w-4 h-4" />
            Add New
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-2 mt-4">
        <Card className="p-4 col-span-4 ml-1">
          <CardHeader>
            <Button className="bg-[#605BFF]/90 hover:bg-[#605BFF] h-11 gap-2 text-white">
              <Plus className="w-5 h-5" />
              Create Schedule
            </Button>
          </CardHeader>

          <div className="p-4 max-w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full rounded-lg border"
              components={{
                Day: ({
                  date,
                  ...props
                }: { date?: Date } & React.HTMLAttributes<HTMLDivElement>) => {
                  if (!date) return <div {...props} />;

                  const isToday =
                    date.toDateString() === new Date().toDateString();

                  return (
                    <div
                      {...props}
                      className={cn(
                        "flex items-center justify-center w-9 h-9 rounded-full cursor-pointer",
                        isToday
                          ? "bg-[#605BFF] text-white"
                          : "hover:bg-gray-100"
                      )}
                    >
                      {date.getDate()}
                    </div>
                  );
                },
              }}
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-6 w-full">
            <CardTitle className="text-left w-full mb-2 pl-6">
              People PRIMODAY
            </CardTitle>

            <div className="relative mt-4 mb-6">
              <Search className="absolute w-5 h-5 top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for People"
                className="pl-10 pr-3 h-11 w-52 text-sm"
              />
            </div>

            <div className="flex flex-col gap-6 items-center w-full pl-6">
              {[
                {
                  name: "Eddie Lobanovskiy",
                  email: "laboanovskiy@gmail.com",
                  img: "/assets/Group 481.svg",
                },
                {
                  name: "Alexey Stave",
                  email: "alexeyst@gmail.com",
                  img: "/assets/image.svg",
                },
                {
                  name: "Anton Tkacheve",
                  email: "tkacheveanton@gmail.com",
                  img: "/assets/Group 490.svg",
                },
              ].map((person, index) => (
                <div
                  key={index}
                  className="flex flex-row gap-3 border-b w-[200px] pb-3"
                >
                  <Avatar>
                    <AvatarImage src={person.img} alt={person.name} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col text-sm">
                    <span className="text-[#030229] font-medium">
                      {person.name}
                    </span>
                    <span className="text-xs text-[#030229]/50">
                      {person.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <CardFooter className="mt-32 w-full flex justify-center">
              <Button className="border bg-white hover:bg-gray-300/50 w-full h-11 text-[#605BFF]">
                My Schedule
              </Button>
            </CardFooter>
          </div>
        </Card>

        <Card className="p-2 mr-8 col-span-8  overflow-auto">
          <div className="overflow-auto w-full">
            <table className="min-w-full h-20  text-sm text-left">
              <thead className="text-gray-500 border-b">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th className="px-4 py-8">
                      <Input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                        onChange={(e) => {
                          const checked = e.target.checked;
                          document
                            .querySelectorAll<HTMLInputElement>(
                              'tbody input[type="checkbox"]'
                            )
                            .forEach((cb) => (cb.checked = checked));
                        }}
                      />
                    </th>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-8 font-semibold">
                        <div className="flex items-center gap-1">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.id !== "actions" && (
                            <ChevronDown size={14} className="fill-[#030229]" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-t transition-transform duration-200 rounded-[10px] hover:-translate-y-3 hover:shadow-lg shadow-[#605BFF]/40"
                  >
                    <td className="px-4 py-8">
                      <Input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer"
                      />
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
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
        </Card>
      </div>
    </div>
  );
}
