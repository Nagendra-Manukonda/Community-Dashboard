"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AnalyticsChartdata } from "@/constants/constants";

export default function AnalyticsChart() {
  const totalReal = AnalyticsChartdata.filter(
    (entry) => entry.name !== "Empty"
  ).reduce((sum, entry) => sum + entry.value, 0);

  const percentage = Math.round(
    (AnalyticsChartdata[0].value / totalReal) * 185
  );

  const legendData = AnalyticsChartdata.filter(
    (entry) => entry.name !== "Empty"
  );

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={AnalyticsChartdata}
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
              {AnalyticsChartdata.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-[#030229]">
            {percentage}%
          </span>
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
