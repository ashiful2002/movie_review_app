"use client";

import { Users, Film, BarChart3, MessageSquareText, Tag } from "lucide-react";
import { StatCard } from "./StatCard";
import { BarChartComponent } from "./BarChartComponent";
import { PieChartComponent } from "./PieChartComponent";

interface DashboardStats {
  totalUsers: number;
  totalMovies: number;
  totalRevenue: number;
  activeSubscriptions: number;
  moviesByGenre: Array<{ name: string; value: number }>;
  monthlyRevenue: Array<{ name: string; revenue: number }>;
  usersTrend: number;
  revenueTrend: number;
  totalReviews: number;
  totalGenres: number;
  totalSubscriptionPlans: number;
  topReviewedMovies: string[]
}

export const SuperAdminDashboardStats = ({ statsData }: { statsData: DashboardStats }) => {


  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={statsData.totalUsers.toLocaleString()}
          description="Active platform users"
          icon={Users}
          bgColor="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Total Movies"
          value={statsData.totalMovies}
          description="Content library size"
          icon={Film}
          bgColor="bg-purple-50 dark:bg-purple-950"
          iconColor="text-purple-600 dark:text-purple-400"
        />
        <StatCard
          title="Total Reviews"
          value={statsData.totalReviews ? statsData.totalReviews : "0"}
          description="Monthly earnings"
          icon={MessageSquareText}
          bgColor="bg-green-50 dark:bg-green-950"
          iconColor="text-green-600 dark:text-green-400"
        />
        <StatCard
          title="Movie Genre"
          value={statsData.totalGenres}
          description="Total genres available"
          icon={Tag}
          bgColor="bg-amber-50 dark:bg-amber-950"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Subscription Plans"
          value={statsData.totalSubscriptionPlans}
          description="Current subscribers"
          icon={BarChart3}
          bgColor="bg-amber-50 dark:bg-amber-950"
          iconColor="text-amber-600 dark:text-amber-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Monthly Revenue */}
        <BarChartComponent
          data={statsData.topReviewedMovies}
          dataKey="reviews"
          title="Top 5 Most Reviewed Movies"
          description="Movies with the highest number of user reviews"
          color="#8b5cf6"
          height={320}
        />

        {/* Pie Chart - Movies by Genre */}
        <PieChartComponent
          data={statsData?.moviesByGenre}
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
    </div>
  );
};
