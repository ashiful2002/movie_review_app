"use client";

import { useEffect, useState } from "react";
import { Clock, Star, Heart, Zap } from "lucide-react";
import { StatCard } from "./StatCard";
import { PieChartComponent } from "./PieChartComponent";
import { BarChartComponent } from "./BarChartComponent";

interface UserStats {
  watchedMovies: number;
  watchlistItems: number;
  reviewsWritten: number;
  avgRating: number;
  watchingHours: Array<{ name: string; hours: number }>;
  favoriteGenres: Array<{ name: string; value: number }>;
  watchTrend: number;
  ratingTrend: number;
}

export function UserDashboardStats() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user stats
    // In a real app, this would be an API call
    const mockStats: UserStats = {
      watchedMovies: 142,
      watchlistItems: 45,
      reviewsWritten: 38,
      avgRating: 4.2,
      watchingHours: [
        { name: "Mon", hours: 2.5 },
        { name: "Tue", hours: 1.8 },
        { name: "Wed", hours: 3.2 },
        { name: "Thu", hours: 2.1 },
        { name: "Fri", hours: 4.5 },
        { name: "Sat", hours: 5.8 },
        { name: "Sun", hours: 3.5 },
      ],
      favoriteGenres: [
        { name: "Action", value: 38 },
        { name: "Drama", value: 28 },
        { name: "Sci-Fi", value: 22 },
        { name: "Comedy", value: 18 },
        { name: "Thriller", value: 36 },
      ],
      watchTrend: 15,
      ratingTrend: 8,
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
    return <div>Failed to load your statistics</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Movies Watched"
          value={stats.watchedMovies}
          description="Your viewing history"
          icon={Clock}
          bgColor="bg-cyan-50 dark:bg-cyan-950"
          iconColor="text-cyan-600 dark:text-cyan-400"
          trend={stats.watchTrend}
        />
        <StatCard
          title="Watchlist Items"
          value={stats.watchlistItems}
          description="Saved for later"
          icon={Heart}
          bgColor="bg-rose-50 dark:bg-rose-950"
          iconColor="text-rose-600 dark:text-rose-400"
          trend={6}
        />
        <StatCard
          title="Reviews Written"
          value={stats.reviewsWritten}
          description="Contributions to community"
          icon={Star}
          bgColor="bg-amber-50 dark:bg-amber-950"
          iconColor="text-amber-600 dark:text-amber-400"
          trend={stats.ratingTrend}
        />
        <StatCard
          title="Avg Rating Given"
          value={`${stats.avgRating}/5`}
          description="Your review score"
          icon={Zap}
          bgColor="bg-violet-50 dark:bg-violet-950"
          iconColor="text-violet-600 dark:text-violet-400"
          trend={3}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Weekly Watching Hours */}
        <BarChartComponent
          data={stats.watchingHours}
          dataKey="hours"
          title="Your Weekly Watch Time"
          description="Hours spent watching this week"
          xAxisKey="name"
          color="#06b6d4"
          height={320}
        />

        {/* Pie Chart - Favorite Genres */}
        <PieChartComponent
          data={stats.favoriteGenres}
          title="Your Favorite Genres"
          description="Distribution of your watched content"
          colors={["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#ef4444"]}
          height={320}
        />
      </div>

      {/* User Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 p-6 rounded-lg border border-cyan-200 dark:border-cyan-800">
          <p className="text-sm text-muted-foreground">Total Watch Time</p>
          <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">
            127 hrs
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            ~5.3 hours per day
          </p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 p-6 rounded-lg border border-rose-200 dark:border-rose-800">
          <p className="text-sm text-muted-foreground">Premium Member</p>
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-2">
            Active
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Premium access unlocked
          </p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-muted-foreground">Recommendation Score</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">
            92%
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Based on your activity
          </p>
        </div>
      </div>
    </div>
  );
}
