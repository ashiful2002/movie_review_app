import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  bgColor?: string;
  iconColor?: string;
  trend?: number;
}

export function StatCard({
  title,
  value,
  description,
  icon: Icon,
  bgColor = "bg-blue-50 dark:bg-blue-950",
  iconColor = "text-blue-600 dark:text-blue-400",
  trend,
}: StatCardProps) {
  return (
    <Card className="border-l-4 border-l-blue-500 hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <Icon className={`h-4 w-4 ${iconColor}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend !== undefined && (
          <div className={`text-xs mt-2 ${trend >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% from last month
          </div>
        )}
      </CardContent>
    </Card>
  );
}