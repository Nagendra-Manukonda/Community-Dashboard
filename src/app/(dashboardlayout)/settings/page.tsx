"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Calendar as CalendarIcon,
} from "lucide-react";
import React, { useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function Settingspage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<
    "List" | "Board" | "Timeline"
  >("Timeline");

  type TaskType = {
    time: number;
    label: string;
    color: string;
    priority: "Low" | "Medium" | "High";
  };

  const [tasksByDate] = useState<Record<string, TaskType[]>>({
    [new Date().toDateString()]: [
      {
        time: 9,
        label: "Graphic Design",
        color: "bg-white border",
        priority: "Low",
      },
      {
        time: 11,
        label: "Dashboard Design",
        color: "bg-white border",
        priority: "High",
      },
      {
        time: 13,
        label: "Logo Design",
        color: "bg-white border",
        priority: "High",
      },
      {
        time: 16,
        label: "Web Design",
        color: "bg-white border",
        priority: "High",
      },
    ],
  });

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const monthYear = currentDate.toLocaleDateString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className=" h-fit">
      <header className="flex items-center justify-between mt-1 px-4 pb-2 bg-white rounded-xs">
        <div className="flex flex-col gap-4 justify-between py-2 items-start">
          <h1 className="font-bold text-lg text-[#030229]">Task Preview</h1>
          <div className=" border ">
            {["List", "Board", "Timeline"].map((view, index) => (
              <Button
                key={view}
                className={`h-11 font-semibold text-xs ${
                  index === 0
                    ? "rounded-l-[5px] rounded-r-none"
                    : index === 2
                    ? "rounded-r-[5px] rounded-l-none"
                    : "rounded-none"
                } ${
                  selectedView === view
                    ? "bg-[#605BFF] text-white"
                    : "text-[#030229] hover:bg-[#605BFF] hover:text-white"
                }`}
                onClick={() =>
                  setSelectedView(view as "List" | "Board" | "Timeline")
                }
              >
                {view}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center items-end gap-3">
          <Button className="bg-[#605BFF]/90 hover:bg-[#605BFF] h-11 gap-1 text-white">
            <Plus className="w-4 h-4" />
            Add New
          </Button>

          <div className="flex items-center border rounded-md px-3 py-2 text-sm font-semibold text-[#030229]/70 bg-white">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handlePrevMonth}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="mx-2">{monthYear}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={handleNextMonth}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                  <CalendarIcon className="w-4 h-4 text-[#030229]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Calendar
                  mode="single"
                  selected={currentDate}
                  onSelect={(date) => date && setCurrentDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-48 p-4 flex flex-col gap-3">
          {["To Do", "Doing", "Done"].map((status) => (
            <Button
              key={status}
              className={`
              text-left px-3 py-2 justify-between rounded-md font-medium
              ${
                status === "To Do"
                  ? "bg-[#605BFF] text-white"
                  : "bg-[#605BFF]/5 text-[#030229]"
              }
            `}
            >
              {status}
              <ChevronRight
                className={`w-5 h-5 ${
                  status === "To Do"
                    ? "fill-[#FAFAFB]/60 text-[#FAFAFB]/5"
                    : "fill-[#030229]/30 text-[#030229]/5"
                }`}
              />
            </Button>
          ))}
        </aside>

        <div className="flex-1 bg-white mt-2 mx-4 p-2 overflow-auto">
          <div className="flex items-center border-b border-[#030229]/5 ml-16 h-12 mb-2">
            {Array.from({ length: 13 }).map((_, i) => {
              const date = new Date(currentDate);
              date.setDate(date.getDate() + i);
              const dayNumber = date.getDate();
              const isToday = i === 0;

              return (
                <div
                  key={i}
                  className={`flex-1 text-center py-3 h-[50px] cursor-pointer ${
                    isToday ? "bg-[#605BFF] text-white" : "hover:bg-[#f0f0f0]"
                  }`}
                  onClick={() => setCurrentDate(date)}
                >
                  <span className="text-sm font-medium">{dayNumber}</span>
                </div>
              );
            })}
          </div>

          {Array.from({ length: 9 }, (_, i) => i + 9).map((hour, index) => {
            const tasks = tasksByDate[currentDate.toDateString()] || [];
            const taskAtThisHour = tasks.find((t) => t.time === hour);
            const hour12 = hour % 12 === 0 ? 12 : hour % 12;
            const ampm = hour < 12 ? "AM" : "PM";

            return (
              <div
                key={hour}
                className="flex items-start border-b border-[#030229]/5 h-16 relative"
              >
                <div className="w-20 text-xs text-gray-500 pt-2 text-right pr-3">
                  {hour12}:00 {ampm}
                </div>
                <div className="flex-1">
                  {taskAtThisHour && (
                    <div
                      className={`p-3 border flex w-fit h-16 items-center gap-5 rounded-[10px] ${
                        taskAtThisHour.color
                      } ${index % 4 === 0 ? "ml-10" : "ml-[30%]"}`}
                    >
                      <Checkbox className="w-4 h-4 rounded-full border-gray-400 text-[#605BFF] focus:ring-[#605BFF]" />
                      <span className="font-medium text-sm">
                        {taskAtThisHour.label}
                      </span>
                      <div className="flex ml-10 gap-4">
                        <span className="flex -space-x-2.5">
                          <Avatar className="w-6 h-6 rounded-full">
                            <AvatarImage src="Group 466.svg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <Avatar className="w-6 h-6 rounded-full">
                            <AvatarImage src="Group 469.svg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <Avatar className="w-6 h-6 rounded-full">
                            <AvatarImage src="Group 472.svg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <Avatar className="w-6 h-6 rounded-full">
                            <AvatarImage src="Group 475.svg" alt="User" />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                          <Button className="w-5 h-5 relative rounded-full m-auto text-white bg-[#26C0E2]">
                            <Plus className="w-3 h-3" />
                          </Button>
                        </span>

                        <span
                          className={`text-white text-xs px-4 py-1 rounded-full ${
                            taskAtThisHour.priority === "Low"
                              ? "bg-[#FF6A77]"
                              : taskAtThisHour.priority === "High"
                              ? "bg-[#26C0E2] text-[#030229]"
                              : "bg-gray-400"
                          }`}
                        >
                          {taskAtThisHour.priority}
                        </span>
                        <span className="bg-[#FFD66B] text-[#030229] text-xs px-3 py-1 rounded-3xl">
                          On Track
                        </span>
                        <span>
                          <MoreHorizontal className="text-[#030229]/30 cursor-pointer" />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
