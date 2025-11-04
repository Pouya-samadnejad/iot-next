"use client";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateChartData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    const formattedTime = time.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    data.push({
      time: formattedTime,
      messages: Math.floor(Math.random() * (200 - 50 + 1)) + 50,
    });
  }
  return data;
};

const chartConfig = {
  messages: {
    label: "پیام‌ها",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function TraficChart() {
  const [chartData, setChartData] = useState(generateChartData());

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(generateChartData());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[250px] w-full"
    >
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 20,
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="messages" fill="var(--color-messages)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
