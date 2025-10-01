"use client";

import React, { useState, useMemo } from "react";
import { Input } from "./ui/input";
import {
  Plus,
  Search,
  Mail,
  Calendar,
  ChevronDown,
  Trash2,
  MoreHorizontal,
  Star,
  Pen,
  Pencil,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import Image from "next/image";

interface Invoice {
  id: string;
  name: string;
  image: string;
  email: string;
  date: string;
  status: "Complete" | "Pending" | "Cancel";
}

const defaultData: Invoice[] = [
  {
    id: "#876364",
    image: "/Group 465.svg",
    name: "Arrora gaur",
    email: "arroragaur@gmail.com",
    date: "12 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#876123",
    image: "/Group 466.svg",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
  },
  {
    id: "#876213",
    image: "/Group 469.svg",
    name: "Robert Bacins",
    email: "robertbacins@gmail.com",
    date: "09 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#876987",
    image: "/Group 472.svg",
    name: "Bethany Jackson",
    email: "bethanyjackson@gmail.com",
    date: "09 Dec, 2020",
    status: "Cancel",
  },
  {
    id: "#871345",
    image: "/Group 475.svg",
    name: "Anne Jacob",
    email: "annejacob@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#872345",
    image: "/Group 478.svg",
    name: "Bethany jackson",
    email: "bethanyjackson@gmail.com",
    date: "10 Dec, 2020",
    status: "Pending",
  },
  {
    id: "#872346",
    image: "/Group 481.svg",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "10 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#873245",
    image: "/Group 484.svg",
    name: "Jhon Deo",
    email: "jhondeo@gmail.com",
    date: "08 Dec, 2020",
    status: "Complete",
  },
  {
    id: "#876364",
    name: "Bethany jackson",
    image: "/Group 487.svg",
    email: "bethanyjackson@gmail.com",
    date: "02 Dec, 2020",
    status: "Cancel",
  },
  {
    id: "#878769",
    image: "/Group 490.svg",
    name: "James Mullican",
    email: "jamesmullican@gmail.com",
    date: "01 Dec, 2020",
    status: "Pending",
  },
];

export default function InvoiceMain() {
  const [data] = useState(() => [...defaultData]);
  const [search, setSearch] = useState("");
  const [starredIds, setStarredIds] = useState<Set<string>>(new Set());
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const toggleStar = (id: string) => {
    setStarredIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter((item) =>
      [item.id, item.name, item.email, item.status]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  const columns: ColumnDef<Invoice>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      ),
    },
    {
      accessorKey: "id",
      header: () => (
        <div className="flex items-center gap-3">
          <span>Invoice ID</span>
          <ChevronDown className="w-3 h-3 items-center text-[#030229]/50" />
        </div>
      ),
      cell: ({ row }) => (
        <span className="font-medium text-gray-800 text-sm">
          {row.original.id}
        </span>
      ),
    },
    {
      accessorKey: "name",
      header: () => (
        <div className="flex items-center gap-3">
          <span>Name</span>
          <ChevronDown className="w-3 h-3 items-center text-[#030229]/50" />
        </div>
      ),
      cell: ({ row }) => {
        const { name, image, id } = row.original;
        const initials = name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase();
        const isStarred = starredIds.has(id);

        return (
          <div className="flex items-center gap-4">
            {image ? (
              <Image
                src={image}
                alt={name}
                width={36}
                height={36}
                className="w-9 h-9 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-xs font-semibold text-purple-700">
                {initials}
              </div>
            )}
            <span className="text-sm font-medium text-gray-800">{name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => (
        <div className="flex items-center gap-3">
          <span>Email</span>
          <ChevronDown className="w-3 h-3 items-center text-[#030229]/50" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Mail className="w-4 h-4 text-[#3A974C]" />
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "date",
      header: () => (
        <div className="flex items-center gap-3">
          <span>Date</span>
          <ChevronDown className="w-3 h-3 items-center text-[#030229]/50" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-blue-500" />
          {row.original.date}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => (
        <div className="flex items-center gap-3">
          <span>Status</span>
          <ChevronDown className="w-3 h-3 items-center text-[#030229]/70" />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.status;
        const baseStyle =
          "px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap";
        let statusClass = "";

        if (status === "Complete") {
          statusClass = "bg-[#3A974C]/10  text-[#3A974C]";
        } else if (status === "Pending") {
          statusClass = "bg-[#F29339]/10 text-[#F29339]";
        } else if (status === "Cancel") {
          statusClass = "bg-[#D11A2A]/10 text-[#D11A2A]";
        }

        return (
          <span
            className={`${baseStyle} ${statusClass} items-center flex justify-center `}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "star",
      header: () => <span className="sr-only">Star</span>,
      cell: ({ row }) => {
        const isStarred = starredIds.has(row.original.id);
        return (
          <div title={isStarred ? "Unstar" : "Star"}>
            <Star
              className={`w-5 h-5 cursor-pointer transition-colors ${
                isStarred ? "text-gray-200 " : "text-[#FFD66B] fill-[#FFD66B]"
              }`}
              onClick={() => toggleStar(row.original.id)}
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => (
        <div className="flex justify-center">
          <Trash2 className="w-4 h-4 text-gray-500" />
        </div>
      ),
      cell: ({ row }) => {
        const isOpen = openMenuId === row.original.id;

        return (
          <div className="relative flex justify-center">
            <MoreHorizontal
              className="w-5 h-5 text-gray-400  cursor-pointer hover:text-gray-600"
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
                  <Pencil className="w-6 h-3 fill-[#5B93FF] text-white" />
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    alert(`Delete ${row.original.name}`);
                    setOpenMenuId(null);
                  }}
                  className="w-full text-left px-3 py-2 text-sm  items-center flex gap-2 hover:bg-[#E71D36]/10 bg-[#E71D36]/5 text-[#E71D36]"
                >
                  <Trash className="w-3 h-3" />
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
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <header className="flex h-[var(--header-height)] items-center mt-7 px-4 bg-white">
        <div className="flex flex-1 justify-between items-center">
          <h1 className="font-bold text-lg">Invoice List</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search"
                className="font-normal text-base text-[#000000]/50 pr-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="text-[#000000]/50 absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4" />
            </div>
            <Button className="bg-[#605BFF]/90 hover:bg-[#605BFF] flex items-center gap-1 text-white">
              <Plus className="w-4 h-4" />
              Add New
            </Button>
          </div>
        </div>
      </header>

      <div className="p-3 mt-6 overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-normal text-[#030229]/70 whitespace-nowrap"
                  >
                    {!header.isPlaceholder &&
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 transition-transform  duration-300"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
