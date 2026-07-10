"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartData {
  name: string;
  [key: string]: string | number;
}

interface BarChartComponentProps {
  data: ChartData[];
  dataKey: string;
  title: string;
  description?: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
}

export function BarChartComponent({
  data,
  dataKey,
  title,
  description,
  xAxisKey = "name",
  color = "#3b82f6",
  height = 320,
}: BarChartComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription>{description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />

            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              interval={0}
            />

            <YAxis tick={{ fontSize: 12 }} />

            <Tooltip
              cursor={{ fill: "rgba(59,130,246,0.08)" }}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                backgroundColor: "hsl(var(--background))",
              }}
              formatter={(value) => [`${value} Reviews`, "Reviews"]}
            />

            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}