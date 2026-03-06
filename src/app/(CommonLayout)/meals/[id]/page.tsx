import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Eye, MapPin, Clock, Utensils } from "lucide-react";
import { getSingleMeal } from "@/services/meals";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getSingleMeal(id);
  return (
    <div className="min-h-screen bg-muted/40 p-6 md:p-10 flex justify-center">
      <div
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.4 }}
        className="w-full max-w-5xl"
      >
        <Card className="rounded-2xl overflow-hidden shadow-2xl border-0">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-[350px] md:h-full w-full">
              {data?.image ? (
                <Image
                  src={data.image}
                  alt={data.name || "meal image"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <span className="text-sm text-muted-foreground">
                    No image available
                  </span>
                </div>
              )}
              <div className="absolute top-4 left-4">
                <Badge
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    data?.isAvailable
                      ? "bg-green-500 hover:bg-green-500"
                      : "bg-red-500 hover:bg-red-500"
                  }`}
                >
                  {data?.isAvailable ? "Available" : "Out of Stock"}
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-6 md:p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                      {data?.name}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      {data?.description}
                    </p>
                  </div>

                  <div className="text-2xl font-extrabold">${data?.price}</div>
                </div>

                {/* Rating & Views */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-yellow-500" />
                    <span className="font-medium text-foreground">
                      {data?.averageRating?.toFixed(1) || "0.0"}
                    </span>
                    <span className="text-muted-foreground">
                      ({data?.totalReviews || 0} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye className="w-4 h-4" />
                    {data?.views || 0} views
                  </div>
                </div>

                <Separator />

                {/* Provider Info */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <Utensils className="w-4 h-4" />
                    {data?.provider?.restaurantName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {data?.provider?.location}
                  </div>
                </div>

                <Separator />

                {/* Extra Info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Added: {new Date(data?.createdAt).toLocaleDateString()}
                  </div>
                  <div>Category ID: {data?.categoryId}</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                <Button
                  className="w-full rounded-xl text-base font-semibold"
                  disabled={!data?.isAvailable}
                >
                  {data?.isAvailable ? "Order Now" : "Currently Unavailable"}
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
