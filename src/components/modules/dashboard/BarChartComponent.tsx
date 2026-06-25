"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  height = 300,
}: BarChartComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey={xAxisKey} className="text-xs" />
            <YAxis className="text-xs" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--background))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill={color} radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
