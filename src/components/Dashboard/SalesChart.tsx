"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  DotProps,
  TooltipProps,
} from "recharts";
import { Salesdata } from "@/constants/constants";
import { CustomDotProps } from "@/types/sales";

const CustomDot = ({ cx, cy, index, payload }: CustomDotProps) => {
  if (typeof index !== "number" || cx == null || cy == null) return null;
  if (index < 2 || index > Salesdata.length - 3) return null;
  if (payload?.time === "02pm" || payload?.time === "04pm") return null;

  return (
    <circle
      cx={cx}
      cy={cy}
      r={6}
      fill="#fff"
      stroke="#AE8FF7"
      strokeWidth={3}
    />
  );
};

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const sales = payload[0].payload?.sales;
    return (
      <div className="bg-[#0F0F2D] w-20 h-12 font-normal text-[#FFFFFF]/80 px-3 py-1.5 flex flex-col justify-center items-center rounded-[10px] shadow-md text-xs">
        Sales
        <h1 className="font-semibold text-sm text-[#FFFFFF]">
          {sales?.toLocaleString()}
        </h1>
      </div>
    );
  }
  return null;
};
export default function SalesChart() {
  const colorFrom = "#5BC4FF";
  const colorTo = "#FF5BEF";

  return (
    <div className="w-full h-[350px] bg-white rounded-xl p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={Salesdata}>
          <defs>
            <linearGradient id="lineGradient" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={colorFrom} />
              <stop offset="100%" stopColor={colorTo} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="time"
            interval={0}
            tick={{ fontSize: 12, fill: "#888" }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 20, 40, 60, 80, 100]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#888" }}
            tickMargin={30}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "#E0E0E0", strokeDasharray: "3 3" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="url(#lineGradient)"
            strokeWidth={3}
            activeDot={{
              r: 0,
              fill: "#fff",
              stroke: "#AE8FF7",
              strokeWidth: 0,
            }}
            dot={<CustomDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
