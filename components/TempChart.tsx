"use client";
import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

function generateRandomData(samples = 50) {
  const now = new Date();
  return Array.from({ length: samples }, (_, i) => ({
    date: new Date(now.getTime() - (samples - i) * 60000).toISOString(),
    temp: Math.floor(Math.random() * 15) + 20,
    humidity: Math.floor(Math.random() * 50) + 30,
  }));
}

export function TempChart() {
  const [data, setData] = useState(generateRandomData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(generateRandomData());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const chartConfig = {
    temp: {
      label: "دما",
      color: "var(--chart-1)",
    },
    humidity: {
      label: "رطوبت",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;

  return (
    <div className="h-[250px] w-full">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="fillTemp" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-temp)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-temp)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-humidity)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-humidity)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid vertical={false} opacity={0.3} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleTimeString("fa-IR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              }}
            />
            <YAxis
              tick={{
                fill: "hsl(var(--muted-foreground))",
                fontSize: 12,
                dx: -10,
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelFormatter={(value) =>
                    new Date(value).toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                />
              }
            />
            <Area
              dataKey="humidity"
              type="monotone"
              stroke="var(--color-humidity)"
              fill="url(#fillHumidity)"
              name="رطوبت"
            />
            <Area
              dataKey="temp"
              type="monotone"
              stroke="var(--color-temp)"
              fill="url(#fillTemp)"
              name="دما"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
