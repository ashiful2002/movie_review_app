"use client";

import {
  Star,
  Heart,
  List,
  Users,
  ThumbsUp,
  MessageSquare,
} from "lucide-react";
import { StatCard } from "./StatCard";
import { PieChartComponent } from "./PieChartComponent";
import { RecentReviewsList } from "./RecentReviewsList";

interface RecentReview {
  id: string;
  rating: number;
  createdAt: string;
  movie: {
    title: string;
    thumbnail: string | null;
  };
}

interface UserStats {
  totalReviews: number;
  totalWatchlist: number;
  totalFavourites: number;
  totalComments: number;
  totalFollowers: number;
  totalFollowing: number;
  likesReceived: number;
  isPremium: boolean;
  hasActiveSubscription: boolean;
  moviesByGenre: Array<{ name: string; value: number }>;
  recentReviews: RecentReview[];
}

interface UserDashboardStatsProps {
  data: UserStats;
}

export function UserDashboardStats({ data }: UserDashboardStatsProps) {
  if (!data) {
    return <div>Failed to load your statistics</div>;
  }

  const avgRating =
    data?.recentReviews?.length > 0
      ? (
          data.recentReviews.reduce((sum, r) => sum + r.rating, 0) /
          data.recentReviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Reviews Written"
          value={data.totalReviews}
          description="Your contributions"
          icon={Star}
          bgColor="bg-amber-50 dark:bg-amber-950"
          iconColor="text-amber-600 dark:text-amber-400"
        />
        <StatCard
          title="Watchlist Items"
          value={data.totalWatchlist}
          description="Saved for later"
          icon={List}
          bgColor="bg-cyan-50 dark:bg-cyan-950"
          iconColor="text-cyan-600 dark:text-cyan-400"
        />
        <StatCard
          title="Favourites"
          value={data.totalFavourites}
          description="Movies you loved"
          icon={Heart}
          bgColor="bg-rose-50 dark:bg-rose-950"
          iconColor="text-rose-600 dark:text-rose-400"
        />
        <StatCard
          title="Likes Received"
          value={data.likesReceived}
          description="On your reviews"
          icon={ThumbsUp}
          bgColor="bg-violet-50 dark:bg-violet-950"
          iconColor="text-violet-600 dark:text-violet-400"
        />
      </div>

      {/* Secondary Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Comments"
          value={data.totalComments}
          description="Your discussion activity"
          icon={MessageSquare}
          bgColor="bg-blue-50 dark:bg-blue-950"
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Followers"
          value={data.totalFollowers}
          description="People following you"
          icon={Users}
          bgColor="bg-emerald-50 dark:bg-emerald-950"
          iconColor="text-emerald-600 dark:text-emerald-400"
        />
        <StatCard
          title="Following"
          value={data.totalFollowing}
          description="People you follow"
          icon={Users}
          bgColor="bg-indigo-50 dark:bg-indigo-950"
          iconColor="text-indigo-600 dark:text-indigo-400"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reviews List */}
        <RecentReviewsList reviews={data.recentReviews} />

        {/* Pie Chart - Favorite Genres */}
        <PieChartComponent
          data={data.moviesByGenre}
          title="Your Favorite Genres"
          description="Based on movies you've reviewed"
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

      {/* User Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
          <p className="text-sm text-muted-foreground">Avg Rating Given</p>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-2">
            {avgRating}/10
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Based on your recent reviews
          </p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950 dark:to-pink-950 p-6 rounded-lg border border-rose-200 dark:border-rose-800">
          <p className="text-sm text-muted-foreground">Premium Member</p>
          <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-2">
            {data.isPremium ? "Active" : "Inactive"}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            {data.isPremium
              ? "Premium access unlocked"
              : "Upgrade for premium content"}
          </p>
        </div>
        <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 p-6 rounded-lg border border-cyan-200 dark:border-cyan-800">
          <p className="text-sm text-muted-foreground">Subscription</p>
          <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mt-2">
            {data.hasActiveSubscription ? "Active" : "None"}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            {data.hasActiveSubscription
              ? "Your plan is currently active"
              : "No active subscription plan"}
          </p>
        </div>
      </div>
    </div>
  );
}
