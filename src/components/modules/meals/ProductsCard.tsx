"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Eye, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function ProductCard({ product }: any) {
  const router = useRouter();

  const handleAddToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const alreadyExists = existingCart.find(
      (item: any) => item.id === product.id
    );

    if (alreadyExists) {
      alreadyExists.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
      toast.success("Added to cart");
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    router.push("/dashboard/cart"); // navigate to cart page
  };
  return (
    <div className="flex items-center justify-center bg-muted/40 rounded">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.02 }}
        className="w-full max-w-sm"
      >
        <Card className="overflow-hidden rounded-2xl shadow-xl border-0">
          <CardHeader className="p-0 relative">
            <div className="relative h-56 w-full">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    product.isAvailable
                      ? " bg-yellow-400/90"
                      : "bg-red-500 hover:bg-red-500"
                  }`}
                >
                  {product.isAvailable ? "Available" : "Out of Stock"}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                <Eye className="w-4 h-4" />
                {product.views}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold leading-tight">
                {product.name}
              </h3>
              <p className="text-lg font-bold border-2 px-2 rounded-xl">
                ${product.price}
              </p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-yellow-500" />
                <span className="text-sm font-medium text-foreground">
                  {product?.averageRating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({product.totalReviews} reviews)
                </span>
              </div>
            </div>

            <div className="pt-3 border-t space-y-1">
              <p className="text-sm font-medium">
                {product.provider?.restaurantName}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {product.provider.location}
              </div>
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="p-5 pt-0 flex flex-wrap gap-3 justify-end">
            <Link href={`/meals/${product.id}`}>
              <Button
                size={"xs"}
                variant={"outline"}
                className="cursor-pointer w-full rounded-xl text-base font-semibold"
              >
                Order Now
              </Button>
            </Link>

            <Button
              onClick={() => handleAddToCart(product)}
              size={"xs"}
              className="cursor-pointer w-full rounded-xl text-base font-semibold"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
