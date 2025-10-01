"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ChevronDown } from "lucide-react";
import Image from "next/image";

const orders = [
  {
    trackingNo: "#876264",
    productName: "Camera Lens",
    productImage: "/Rectangle 91.svg",
    price: "$178",
    totalOrder: 325,
    totalAmount: "$1,46,660",
  },
  {
    trackingNo: "#876368",
    productName: "Black Sleep Dress",
    productImage: "/Rectangle 90.svg",
    price: "$14",
    totalOrder: 53,
    totalAmount: "$46,660",
  },
  {
    trackingNo: "#876412",
    productName: "Argan Oil",
    productImage: "/Rectangle 111.svg",
    price: "$21",
    totalOrder: 78,
    totalAmount: "$3,46,676",
  },
  {
    trackingNo: "#876621",
    productName: "EAU DE Parfum",
    productImage: "/Rectangle 110.svg",
    price: "$32",
    totalOrder: 98,
    totalAmount: "$3,46,981",
  },
];

export function RecentOrders() {
  return (
    <div className=" bg-white p-4 text-[#030229] ">
      <Table>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="text-start">
              <div className="flex items-center justify-start gap-1">
                Tracking No.
                <ChevronDown className="w-4 h-4 text-[#030229]/40" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-start gap-1">
                Product Name
                <ChevronDown className="w-4 h-4 text-[#030229]/40" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-start gap-1">
                Price
                <ChevronDown className="w-4 h-4 text-[#030229]/40" />
              </div>
            </TableHead>
            <TableHead className="text-center">
              <div className="flex items-center justify-start gap-1">
                Total Order
                <ChevronDown className="w-4 h-4 text-[#030229]/40" />
              </div>
            </TableHead>
            <TableHead className="text-end">Total Amount</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.trackingNo} className="text-center">
              <TableCell className="text-start font-medium">
                {order.trackingNo}
              </TableCell>
              <TableCell className="text-start">
                <div className="flex gap-4">
                  <Image
                    src={order.productImage}
                    alt={order.productName}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-[10px] justify-start object-cover border"
                  />
                  <span className="text-start my-auto">
                    {order.productName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-start">{order.price}</TableCell>
              <TableCell className="text-center ">
                <p className=" rounded-[10px] w-16 h-6  font-semibold bg-[#26C0E2]/10 text-[#26C0E2]">
                  {order.totalOrder}
                </p>
              </TableCell>
              <TableCell className="text-end">{order.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
