"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "NIKE Shoes Black Pattern",
    price: "$87",
    image: "/Rectangle 53.svg",
    rating: 4,
  },
  {
    id: 2,
    name: "iPhone 12",
    price: "$987",
    image: "/iPhone-12-2-removebg-preview 1.svg",
    rating: 4,
  },
];

export function TopSellingProducts() {
  return (
    <div className="flex flex-col mt-10">
      <div className="space-y-9">
        {products.map((product) => (
          <div key={product.id} className="flex items-start gap-5">
            <div className="relative h-24 w-24 rounded-lg  bg-gray-100 flex-shrink-0">
              <Image
                src={product.image}
                alt={product.name}
                width={96}
                height={96}
                className="object-contain p-2 bg-[#297FB2]/20 rounded-3xl"
              />
            </div>

            <div className="flex flex-col flex-1 gap-4n">
              <p className=" w-full font-normal text-xs text-[#030229]/90">
                {product.name}
              </p>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${
                      i < product.rating
                        ? "fill-[#FFD66B] text-[#FFD66B]"
                        : "fill-[#FFD66B]/40 text-[#FFD66B]/40"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-bold text-[#030229]">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
