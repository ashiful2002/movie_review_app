import Link from "next/link";
import { getOrders } from "@/services/orders";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FormattedDate from "@/components/Shared/FormattedDate";

const Page = async () => {
  const result = await getOrders();
  const orders = result?.data?.data || [];

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle>Customer Orders</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Ordered At</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    {order.id.slice(0, 8)}...
                  </TableCell>

                  <TableCell>৳{order.totalAmount}</TableCell>

                  <TableCell>
                    <Badge>{order.status}</Badge>
                  </TableCell>

                  <TableCell>
                    {order.street}, {order.city} {order.postalCode}
                  </TableCell>

                  <TableCell>{order.phone}</TableCell>

                  <TableCell>
                    <FormattedDate date={order.orderedAt} showTime />

                    {/* {new Date(order.orderAt).toLocaleDateString()} */}
                  </TableCell>

                  <TableCell className="text-right">
                    <Link href={`/dashboard/orders/${order.id}`}>
                      <Button size="sm">Details</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}

              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-6">
                    No orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
