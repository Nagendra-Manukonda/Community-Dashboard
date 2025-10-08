"use client";
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Plus,
  MoreHorizontal,
  Phone,
  Video,
  Paperclip,
  Smile,
  Send,
} from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Contact } from "@/types/messages";
import { contacts } from "@/constants/constants";
import { colors } from "@/constants/constants";
import { Message } from "@/types/messages";
import { initialMessages } from "@/constants/constants";

export default function MessagesMainMock() {
  const [filter, setFilter] = useState("");
  const [tab, setTab] = useState<"All" | "Personal" | "Teams">("Personal");
  const [selected, setSelected] = useState<Contact>(contacts[2]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, selected]);

  const filtered = contacts.filter((c) =>
    (c.name + c.last).toLowerCase().includes(filter.toLowerCase())
  );

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `m${Date.now()}`,
        fromMe: true,
        text: input.trim(),
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setInput("");
  };

  return (
    <div className="flex h-screen bg-white">
      <Card className="w-1/3">
        <aside className="w-96 border-r border-gray-100 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-[#030229]">Message</h3>
            <Button className="bg-[#605BFF] rounded-full h-9 w-9 p-0 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="relative mb-4">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search"
              className="pl-10 h-11 rounded-md w-full"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#030229]/30 w-4 h-4" />
          </div>

          <div className="flex items-center justify-between text-sm font-semibold border-b pb-2 mb-3">
            <div className="flex space-x-16">
              {(["All", "Personal", "Teams"] as const).map((t) => (
                <Button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 rounded-none ${
                    tab === t
                      ? "text-[#605BFF] border-b-3 border-[#605BFF]"
                      : "text-[#9AA0A6]"
                  }`}
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-auto pr-2">
            <div className="space-y-1">
              {filtered.map((c, index) => {
                const isSelected = selected.id === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={`flex items-center gap-3 p-3 rounded-md cursor-pointer transition ${
                      isSelected
                        ? "bg-[#F3F6FF] ring-1 ring-[#9FB0FF]/40 border-l-2 border-[#605BFF]/30"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="relative">
                      <Avatar
                        className="w-[60px] h-[60px]"
                        style={{
                          backgroundColor: colors[index % colors.length],
                        }}
                      >
                        <AvatarImage src={c.image} alt={c.name} />
                        <AvatarFallback>{c.name[0]}</AvatarFallback>
                      </Avatar>

                      <span
                        className={`absolute bottom-0 right-0.5 w-2.5 h-2.5 border border-white rounded-full ${
                          c.online ? "bg-[#2CC84A]" : "bg-[#FF8F6B]"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="text-[16px] font-normal text-[#030229] truncate max-w-[60%]">
                          {c.name}
                        </div>
                        <div className="text-[10px] font-normal text-[#000000]/40">
                          {c.time}
                        </div>
                      </div>
                      <div className="text-xs text-[#030229]/60 font-normal  whitespace-normal break-words max-w-[190px]">
                        {c.last}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </Card>

      <main className="flex-1 bg-[#FAFAFB]  m-8 flex flex-col">
        <div className="flex items-center justify-between pb-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={selected.image} alt={selected.name} />
              <AvatarFallback>{selected.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold text-[#030229]">
                {selected.name}
              </div>
              <div className="text-xs text-gray-500">Online</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className=" p-2">
              <Phone className="w-5 h-5 text-[#000000]/10 fill-[#000000]/40 cursor-pointer" />
            </button>
            <button className=" p-2 ">
              <Video className="w-5 h-5 text-[#000000]/10 fill-[#000000]/40 cursor-pointer" />
            </button>
            <button className=" p-2">
              <MoreHorizontal className="w-6 h-6 text-[#000000]/30 cursor-pointer" />
            </button>
          </div>
        </div>

        <div ref={listRef} className="flex-1 overflow-auto py-6 px-4">
          <div className="space-y-6 max-w-4xl mx-auto">
            {messages.map((m) => {
              if (m.fromMe) {
                return (
                  <div key={m.id} className="flex justify-end items-end gap-3">
                    <div className="text-right">
                      <div className="flex justify-end gap-4 items-center">
                        <MoreHorizontal className="text-[#030299]/40" />

                        {m.text && (
                          <div className="inline-block bg-[#5B93FF] text-white p-3 rounded-xl rounded-tr-none max-w-[60%]">
                            <div className="text-sm">{m.text}</div>
                          </div>
                        )}
                      </div>
                      {m.image && (
                        <Image
                          src={m.image}
                          alt="attachment"
                          width={200}
                          height={100}
                          className="inline-block rounded-xl max-w-[240px]"
                        />
                      )}
                      <div className="text-xs text-gray-400 mt-1">{m.time}</div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={m.id} className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selected.image} alt={selected.name} />
                    <AvatarFallback>{selected.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex justify-start gap-4 items-center">
                      {m.text && (
                        <div className="bg-white p-3 rounded-xl rounded-bl-none shadow-md max-w-[60%]">
                          <div className="text-sm text-[#030229]">{m.text}</div>
                        </div>
                      )}
                      <MoreHorizontal className="text-[#030299]/40" />
                    </div>
                    {m.image && (
                      <div className="flex gap-3 mt-2">
                        <Image
                          src={m.image}
                          alt="attachment"
                          width={220}
                          height={100}
                          className="rounded-lg w-[220px] h-auto object-cover shadow-sm"
                        />
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">{m.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t pt-2 -bottom-10 relative">
          <div className="max-w-4xl relative mx-auto flex items-center gap-3 bg-white p-3 rounded-xl">
            <button className="p-2 absolute rounded-full ml-4 cursor-pointer hover:bg-gray-100">
              <Paperclip className="w-7 h-7 text-gray-500" />
            </button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              placeholder="Type a message..."
              className="flex-1 h-[60px] pl-16 border border-[#030299]/30"
            />
            <button className="p-2 absolute right-16 rounded-full cursor-pointer hover:bg-gray-100">
              <Smile className="w-6 h-6 text-gray-500" />
            </button>
            <button
              onClick={send}
              className=" absolute right-5 p-2 rounded-full cursor-pointer  "
            >
              <Send className=" w-7 h-7 fill-[#605BFF] text-[#605BFF]" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
