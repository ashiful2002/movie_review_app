import { getSingleOrder } from "@/services/orders";
import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReviewModal from "@/components/modules/reviews/ReviewModal";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const { data } = await getSingleOrder(id);

  const order = data;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-2 gap-4 text-sm">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Status:</strong>{" "}
            <Badge variant="default">{order.status}</Badge>
          </p>
          <p>
            <strong>Total Amount:</strong> ৳{order.totalAmount}
          </p>

          <p>
            <strong>Ordered At:</strong>{" "}
            {new Date(order.orderedAt).toLocaleString()}
          </p>

          <p>
            <strong>Delivered At:</strong>{" "}
            {order.deliveredAt
              ? new Date(order.deliveredAt).toLocaleString()
              : "Not delivered yet"}
          </p>
        </CardContent>
      </Card>

      {/* Delivery Information */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>Phone:</strong> {order.phone}
          </p>

          <p>
            <strong>Address:</strong> {order.street}, {order.city},{" "}
            {order.postalCode}
          </p>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        {/* Customer */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>

          <CardContent className="flex items-center gap-4">
            <Image
              src={order.customer.avatar}
              alt={order.customer.name}
              width={60}
              height={60}
              className="rounded-full"
            />

            <div>
              <p className="font-medium">{order.customer.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.customer.email}
              </p>
              <p className="text-sm">{order.customer.phone}</p>
            </div>
          </CardContent>
        </Card>

        {/* Restaurant */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Restaurant</CardTitle>
          </CardHeader>

          <CardContent className="flex  gap-4">
            <Image
              src={order.provider.logo}
              alt={order.provider.restaurantName}
              width={80}
              height={80}
              className="rounded-lg object-cover"
            />

            <div>
              <p className="font-medium">{order.provider.restaurantName}</p>
              <p className="text-sm text-muted-foreground">
                {order.provider.location}
              </p>
              <p className="text-sm">{order.provider.description}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {order.items?.map((item: any) => (
            <div key={item.id} className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <div>
                  <p>
                    <strong>Meal ID:</strong> {item.mealId}
                  </p>

                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>

                  <p>
                    <strong>Price:</strong> ৳{item.price}
                  </p>
                </div>

                {/* Review Section */}
                <div>
                  {order.status === "DELIVERED" ? (
                    <ReviewModal mealId={item.mealId}   />
                  ) : (
                    <Badge variant="outline">
                      Review available after delivery
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
