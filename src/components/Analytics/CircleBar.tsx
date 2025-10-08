import React from "react";
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
interface CircleBarprops {
  value: number;
  color: string;
}

export default function CircleBar({ value, color }: CircleBarprops) {
  const circleData = [{ name: "Progress", value }];
  return (
    <div className="relative flex items-center justify-center">
      <ResponsiveContainer width={120} height={120}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="70%"
          outerRadius="100%"
          barSize={12}
          data={circleData}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background
            dataKey="value"
            fill={color}
            cornerRadius={20}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <span className="absolute font-semibold text-[#030229]">{value}%</span>
    </div>
  );
}
