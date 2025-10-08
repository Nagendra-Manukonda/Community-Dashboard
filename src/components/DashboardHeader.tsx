"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DashboardHeader() {
  const [startDate, setStartDate] = React.useState<Date | undefined>();
  const [endDate, setEndDate] = React.useState<Date | undefined>();

  return (
    <header className="flex h-[var(--header-height)] shrink-0 items-center mt-7 px-4 bg-white">
      <div className="flex flex-1 flex-row justify-between items-center">
        <h1
          className={`font-bold text-lg leading-[100%] {geistMono.className}`}
        >
          Dashboard
        </h1>

        <div className="flex items-center gap-3 text-[#030229]/70 hover:text-[#030229]/70">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex h-10 items-center font-semibold hover:text-[#030229]/70 cursor-pointer gap-2 text-sm"
              >
                <CalendarIcon size={12} />
                {startDate ? format(startDate, "dd-MM-yyyy") : "10-06-2021"}
                <ChevronDown size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
              />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex h-10 items-center font-semibold hover:text-[#030229]/70 cursor-pointer gap-2 text-sm"
              >
                <CalendarIcon size={12} />
                {endDate ? format(endDate, "dd-MM-yyyy") : "10-10-2021"}
                <ChevronDown size={14} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" align="end">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
}
