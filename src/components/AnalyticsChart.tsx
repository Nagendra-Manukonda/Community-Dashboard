"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Sale", value: 35.15, color: "#5B93FF" },
  { name: "Distribute", value: 20.07, color: "#FFD66B" },
  { name: "Return", value: 25.76, color: "#FF8F6B" },
  { name: "Empty", value: 20, color: "transparent" },
];

export default function AnalyticsChart() {
  const totalReal = data
    .filter((entry) => entry.name !== "Empty")
    .reduce((sum, entry) => sum + entry.value, 0);

  // const percentage = Math.round((data[0].value / totalReal) * 100);

  const legendData = data.filter((entry) => entry.name !== "Empty");

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              startAngle={-200}
              paddingAngle={-10}
              cornerRadius={31}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-[#030229]">{80}%</span>
          <span className="text-xs text-[#030229]/70">Transactions</span>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-6 text-sm">
        {legendData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-[5px]"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="text-[#030229]/70">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
