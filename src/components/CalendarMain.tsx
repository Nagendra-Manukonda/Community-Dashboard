"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, MapPin, Plus, Search, User } from "lucide-react";
import React, { useState } from "react";
import { events } from "@/constants/constants";

export default function CalendarMain() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [displayMonth, setDisplayMonth] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month" | "year">("month");

  return (
    <div className="bg-[#605BFF]/10 h-fit">
      <header className="flex items-center justify-between mt-1 px-4 pb-2 bg-white rounded-xs">
        <div className="flex flex-1 justify-between py-2 items-center">
          <h1 className="font-bold text-lg text-[#030229]">Calendar</h1>
          <div className="flex gap-2.5 font-semibold text-[14px]">
            {["day", "week", "month", "year"].map((v) => (
              <Button
                key={v}
                className={cn(
                  "border flex items-center",
                  view === v
                    ? "bg-[#605BFF]/90 text-white"
                    : "bg-[#605BFF]/5 text-[#030229]/70",
                  "hover:bg-[#605BFF] hover:text-white"
                )}
                onClick={() => setView(v as typeof view)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-2 mt-4">
        <Card className="p-4 col-span-4 ml-1">
          <CardHeader>
            <Button
              className="bg-[#605BFF]/90 hover:bg-[#605BFF] h-11 gap-2 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="w-5 h-5" /> Create Schedule
            </Button>
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center  bg-[#030229]/20 z-50">
                <div className="bg-white rounded-lg w-[466px] h-[566px] p-6 relative">
                  <Button
                    className="absolute top-3 right-3 text-gray-400  bg-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    ✕
                  </Button>
                  <h2 className="font-semibold text-xl text-[#030229] mb-12">
                    Create an Event
                  </h2>
                  <div className="flex gap-2 mb-5">
                    <Button className="bg-[#FF8F6B] hover:bg-[#FF8F6B] hover:text-white text-white px-4 py-1 rounded-[10px]">
                      Event
                    </Button>
                    <Button className="bg-gray-200 hover:bg-[#FF8F6B] hover:text-white text-gray-600 px-4 py-1 rounded-[10px]">
                      Reminder
                    </Button>
                    <Button className="bg-gray-200 hover:bg-[#FF8F6B] hover:text-white text-gray-600 px-4 py-1 rounded-[10px]">
                      Task
                    </Button>
                  </div>

                  <Input
                    type="text"
                    placeholder="Add title"
                    className="w-full border rounded-md px-3 py-2 mb-8 text-sm"
                  />

                  <div className="mb-8 text-sm">
                    <div className="flex items-center gap-4 mb-1 text-gray-600 ">
                      <Clock className="w-4 h-4 text-[#FF8F6B]" />
                      <div className="flex flex-col font-normal">
                        <h1 className="gap-4 flex text-sm">
                          Thursday, December 5{" "}
                          <span className="">12:00pm - 1:00pm</span>
                        </h1>
                        <span className="text-[#030229]/50 text-xs ">
                          Time zone-Does not repeat
                        </span>
                      </div>
                    </div>
                    <p className="text-orange-400 cursor-pointer mt-2.5">
                      Find a time
                    </p>
                  </div>

                  <div className="flex gap-2 mb-8">
                    <Button className="bg-[#605BFF] text-white px-3 py-1 flex items-center gap-1">
                      <User />
                      Add People
                    </Button>
                    <Button className="border border-gray-300 px-3 py-1 flex items-center gap-1 text-[#605BFF]">
                      <MapPin />
                      Add location
                    </Button>
                  </div>

                  <div className="flex  items-center gap-4 mb-10 text-sm text-gray-700">
                    <CalendarDays className="text-[#FF8F6B]" />
                    <div className="flex flex-col">
                      <h1>John Deo </h1>
                      <span>
                        {" "}
                        Busy - Default visibility - notify 30 minutes before
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button
                      className="border h-10 w-24 border-gray-300 text-[#030229]  px-4 py-2 hover:bg-gray-100"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Close
                    </Button>
                    <Button className="bg-blue-600 text-white h-10 w-24  px-4 py-2 hover:bg-blue-700">
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            )}
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
                  if (!date) return <td {...props} />;

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
            <CardTitle className="text-left w-full mb-2 pl-6">People</CardTitle>

            <div className="relative mt-4 mb-6">
              <Search className="absolute w-5 h-5 top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for People"
                className="pl-10 pr-3 h-11 w-58 text-sm"
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

        <Card className="p-4 mx-2  col-span-8 overflow-auto">
          {view === "day" && (
            <Card className="w-full h-full p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">
                  {date?.toLocaleDateString("default", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </h2>
              </div>

              <div className="border-t border-b divide-y divide-gray-200 h-[90vh] overflow-y-auto">
                {Array.from({ length: 24 }, (_, hour) => {
                  const exampleEvents = [
                    { time: 9, label: "Friend Meeting", color: "bg-blue-200" },
                    {
                      time: 11,
                      label: "Client Meeting",
                      color: "bg-green-200",
                    },
                    { time: 14, label: "Project Work", color: "bg-purple-200" },
                    {
                      time: 16,
                      label: "Call with Team",
                      color: "bg-orange-200",
                    },
                  ];

                  const eventAtThisHour = exampleEvents.find(
                    (e) => e.time === hour
                  );

                  return (
                    <div
                      key={hour}
                      className="relative h-12 flex items-center border-b px-2"
                    >
                      <div className="w-12 text-right pr-2 text-xs text-gray-500">
                        {hour}:00
                      </div>

                      <div className="flex-1">
                        {eventAtThisHour && (
                          <div
                            className={cn(
                              "px-2 py-1 rounded text-[12px] text-white",
                              eventAtThisHour.color
                            )}
                          >
                            {eventAtThisHour.label}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {view === "week" && (
            <Calendar
              mode="single"
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              className="w-full h-full"
            />
          )}

          {view === "month" && (
            <Calendar
              mode="single"
              month={displayMonth}
              onMonthChange={setDisplayMonth}
              className="w-full h-full"
              components={{
                Day: ({
                  day,
                  ...props
                }: {
                  day: { date: Date };
                } & React.HTMLAttributes<HTMLTableCellElement>) => {
                  const dayKey = `${day.date.getFullYear()}-${(
                    day.date.getMonth() + 1
                  )
                    .toString()
                    .padStart(2, "0")}-${day.date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`;
                  const dayEvents = events[dayKey] || [];
                  const isToday =
                    day.date.toDateString() === new Date().toDateString();

                  return (
                    <td
                      {...props}
                      className={cn(
                        "align-top w-full h-40 p-1 text-xs border",
                        isToday && "bg-[#605BFF]/20 border-[#605BFF]",
                        dayEvents.length > 0 && "bg-red-50"
                      )}
                    >
                      <div className="font-semibold text-sm">
                        {day.date.getDate()}
                      </div>
                      <div className="flex flex-col gap-0.5 mt-1 w-full">
                        {dayEvents.slice(0, 2).map((event, i) => (
                          <span
                            key={i}
                            className={cn(
                              "px-1 py-0.5 rounded-[3px] text-center text-[10px] truncate",
                              event.color
                            )}
                          >
                            {event.label}
                          </span>
                        ))}
                        {dayEvents.length > 2 && (
                          <span className="text-[10px] text-gray-500">
                            + More
                          </span>
                        )}
                      </div>
                    </td>
                  );
                },
              }}
            />
          )}

          {view === "year" && (
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 12 }, (_, i) => {
                const monthDate = new Date(displayMonth.getFullYear(), i, 1);
                return (
                  <Card key={i} className="p-2 border">
                    <Calendar
                      mode="single"
                      month={monthDate}
                      onMonthChange={setDisplayMonth}
                      className="w-full h-full"
                      components={{
                        Day: (
                          props: {
                            day?: { date: Date };
                          } & React.HTMLAttributes<HTMLDivElement>
                        ) => {
                          const dayDate: Date = props.day?.date || new Date();
                          const isToday =
                            dayDate.toDateString() ===
                            new Date().toDateString();

                          return (
                            <div
                              {...props}
                              className={cn(
                                "flex flex-1 items-center justify-center text-[10px] mb-0.5",
                                isToday && "bg-[#605BFF]/20"
                              )}
                            >
                              {dayDate.getDate()}
                            </div>
                          );
                        },
                      }}
                    />
                  </Card>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
