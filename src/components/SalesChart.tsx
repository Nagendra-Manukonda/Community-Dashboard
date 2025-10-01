"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  DotProps,
} from "recharts";

const data = [
  { time: "10am", value: 55, sales: 2400 },
  { time: "11am", value: 30, sales: 1800 },
  { time: "12pm", value: 60, sales: 2000 },
  { time: "01pm", value: 37, sales: 2200 },
  { time: "02am", value: 22, sales: 1500 },
  { time: "03am", value: 50, sales: 2678 },
  { time: "04am", value: 15, sales: 1200 },
  { time: "05am", value: 30, sales: 1800 },
  { time: "06am", value: 65, sales: 3000 },
  { time: "07am", value: 58, sales: 3100 },
  { time: "    ", value: 75, sales: 3313 },
];

interface CustomDotProps extends DotProps {
  index?: number;
  payload?: { time: string; value: number; sales: number };
}

const CustomDot = ({ cx, cy, index, payload }: CustomDotProps) => {
  if (typeof index !== "number") return null;
  if (index < 2 || index > data.length - 3) return null;
  if (payload?.time === "02am" || payload?.time === "04am") return null;

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

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F0F2D] w-20 h-12 font-normal leading-[100%]  text-[#FFFFFF]/80 px-3 py-1.5 flex-col flex justify-center items-center rounded-[10px] shadow-md text-xs">
        Sales
        <h1 className="font-semibold text-sm text-[#FFFFFF] leading-[100%]">
          {payload[0].payload.sales.toLocaleString()}
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
        <LineChart data={data}>
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
