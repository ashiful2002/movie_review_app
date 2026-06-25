"use client";

import { useEffect, useState } from "react";
import { Users, Film, TrendingUp, BarChart3 } from "lucide-react";
import { StatCard } from "./StatCard";
import { BarChartComponent } from "./BarChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import { getAAllUsers } from "@/services/users";

interface DashboardStats {
  totalUsers: number;
  totalMovies: number;
  totalRevenue: number;
  activeSubscriptions: number;
  moviesByGenre: Array<{ name: string; value: number }>;
  monthlyRevenue: Array<{ name: string; revenue: number }>;
  usersTrend: number;
  revenueTrend: number;
}

export const AdminDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  // const allUsers = await getAAllUsers();

  useEffect(() => {
    // Simulate fetching dashboard stats
    // In a real app, this would be an API call
    const mockStats: DashboardStats = {
      totalUsers: 1247,
      totalMovies: 356,
      totalRevenue: 45230,
      activeSubscriptions: 823,
      moviesByGenre: [
        { name: "Action", value: 89 },
        { name: "Drama", value: 72 },
        { name: "Comedy", value: 65 },
        { name: "Sci-Fi", value: 58 },
        { name: "Horror", value: 42 },
        { name: "Romance", value: 30 },
      ],
      monthlyRevenue: [
        { name: "Jan", revenue: 2400 },
        { name: "Feb", revenue: 3210 },
        { name: "Mar", revenue: 2290 },
        { name: "Apr", revenue: 2000 },
        { name: "May", revenue: 2181 },
        { name: "Jun", revenue: 2500 },
        { name: "Jul", revenue: 3490 },
        { name: "Aug", revenue: 2100 },
        { name: "Sep", revenue: 2800 },
        { name: "Oct", revenue: 3200 },
        { name: "Nov", revenue: 3500 },
        { name: "Dec", revenue: 4430 },
      ],
      usersTrend: 12,
      revenueTrend: 18,
    };

    // Simulate API delay
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return <div>Failed to load statistics</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          description="Active platform users"
          icon={Users}
          bgColor="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600 dark:text-blue-400"
          trend={stats.usersTrend}
        />
        <StatCard
          title="Total Movies"
          value={stats.totalMovies}
          description="Content library size"
          icon={Film}
          bgColor="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600 dark:text-purple-400"
          trend={8}
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          description="Monthly earnings"
          icon={TrendingUp}
          bgColor="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600 dark:text-green-400"
          trend={stats.revenueTrend}
        />
        <StatCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          description="Current subscribers"
          icon={BarChart3}
          bgColor="bg-amber-50 dark:bg-amber-950"
          iconColor="text-amber-600 dark:text-amber-400"
          trend={14}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Monthly Revenue */}
        <BarChartComponent
          data={stats.monthlyRevenue}
          dataKey="revenue"
          title="Monthly Revenue Trend"
          description="Revenue performance over the year"
          xAxisKey="name"
          color="#10b981"
          height={320}
        />

        {/* Pie Chart - Movies by Genre */}
        <PieChartComponent
          data={stats.moviesByGenre}
          title="Movies Distribution by Genre"
          description="Content breakdown across categories"
          colors={[
            "#3b82f6",
            "#8b5cf6",
            "#ec4899",
            "#f59e0b",
            "#10b981",
            "#06b6d4",
          ]}
          height={320}
        />
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-muted-foreground">Avg. User Engagement</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            4.5/5
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Based on ratings & reviews
          </p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
          <p className="text-sm text-muted-foreground">Subscription Growth</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-2">
            +23%
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Quarter-over-quarter
          </p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 p-6 rounded-lg border border-emerald-200 dark:border-emerald-800">
          <p className="text-sm text-muted-foreground">Platform Uptime</p>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
            99.9%
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            System availability
          </p>
        </div>
      </div>
    </div>
  );
};
