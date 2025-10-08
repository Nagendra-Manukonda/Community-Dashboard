import React from "react";
import { TooltipProps } from "recharts";

const formatValue = (val: number) => {
  if (val >= 1000) return (val / 1000).toFixed(2) + "k";
  return val;
};

export default function CustomToolTip({
  active,
  payload,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-md px-1 flex flex-col justify-center items-baseline align-top py-1 text-white text-xs"
        style={{ backgroundColor: "#FF8F6B" }}
      >
        {formatValue(payload[0].value as number)}
      </div>
    );
  }
  return null;
}
