import { Badge } from "@/components/ui/badge";
import { Star, Eye, DollarSign, Crown } from "lucide-react";

// Status Badge - Shows movie status with color coding
export const StatusBadge = ({
  status,
}: {
  status: "released" | "upcoming" | "archived";
}) => {
  const statusConfig = {
    released: {
      variant: "default" as const,
      label: "Released",
    },
    upcoming: {
      variant: "secondary" as const,
      label: "Upcoming",
    },
    archived: {
      variant: "outline" as const,
      label: "Archived",
    },
  };

  const config = statusConfig[status];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};

// Rating Badge - Shows IMDB-style rating with stars
export const RatingBadge = ({ rating }: { rating: number }) => {
  const getColor = (rating: number) => {
    if (rating >= 8) return "text-green-600";
    if (rating >= 6) return "text-yellow-600";
    return "text-orange-600";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1">
        <Star className={`w-4 h-4 fill-current ${getColor(rating)}`} />
        <span className={`font-semibold text-sm ${getColor(rating)}`}>
          {rating.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

// Premium Badge - Shows if movie is premium
export const PremiumBadge = ({ isPremium }: { isPremium: boolean }) => {
  if (!isPremium) return null;

  return (
    <Badge variant="default" className="gap-1">
      <Crown className="w-3 h-3" />
      Premium
    </Badge>
  );
};

// Price Card - Shows price with premium indicator
export const PriceCard = ({
  price,
  isPremium,
}: {
  price: number;
  isPremium: boolean;
}) => {
  return (
    <div className="flex items-center gap-2">
      <DollarSign className="w-4 h-4 text-muted-foreground" />
      <span className="font-semibold text-sm">{price.toFixed(2)}</span>
      {isPremium && <Crown className="w-4 h-4 text-yellow-600" />}
    </div>
  );
};

// Views Card - Shows view count with formatting
export const ViewsCard = ({ views }: { views: number }) => {
  const formatViews = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <div className="flex items-center gap-2">
      <Eye className="w-4 h-4 text-muted-foreground" />
      <span className="font-medium text-sm">{formatViews(views)}</span>
    </div>
  );
};

// Duration Card - Shows formatted duration
export const DurationCard = ({ duration }: { duration: number }) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <span className="text-sm text-muted-foreground">
      {hours > 0 && `${hours}h `}
      {minutes}m
    </span>
  );
};

// Featured Badge - Shows if movie is featured
export const FeaturedBadge = ({ isFeatured }: { isFeatured: boolean }) => {
  if (!isFeatured) return null;

  return <Badge className="bg-amber-500 hover:bg-amber-600">Featured</Badge>;
};

// Genre Chip - Shows genre tags
export const GenreChips = ({ genres }: { genres: any[] }) => {
  if (!genres || genres.length === 0) return null;

  return (
    <div className="flex gap-1 flex-wrap">
      {genres.slice(0, 2).map((genre) => (
        <Badge key={genre.id || genre.name} variant="secondary" className="text-xs">
          {genre.name}
        </Badge>
      ))}
      {genres.length > 2 && (
        <Badge variant="outline" className="text-xs">
          +{genres.length - 2}
        </Badge>
      )}
    </div>
  );
};

// Language Badge - Shows language support
export const LanguageBadge = ({ language }: { language: string }) => {
  return (
    <Badge variant="outline" className="text-xs">
      {language}
    </Badge>
  );
};

// Age Rating Badge - Shows age rating with color
export const AgeRatingBadge = ({ ageRating }: { ageRating: string }) => {
  const getAgeRatingColor = (rating: string) => {
    const ratingMap: Record<string, string> = {
      "G": "bg-green-100 text-green-800",
      "PG": "bg-blue-100 text-blue-800",
      "PG-13": "bg-yellow-100 text-yellow-800",
      "R": "bg-orange-100 text-orange-800",
      "NC-17": "bg-red-100 text-red-800",
    };
    return ratingMap[rating] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${getAgeRatingColor(ageRating)}`}>
      {ageRating}
    </div>
  );
};

// Date Badge - Shows formatted date
export const DateBadge = ({ date }: { date: string }) => {
  const formatted = new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return <span className="text-sm text-muted-foreground">{formatted}</span>;
};
