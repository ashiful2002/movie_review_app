import Link from "next/link";
import Image from "next/image";
import { getProviders } from "@/services/Providers";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const { data } = await getProviders();
  const providers = data.data;

  return (
    <div className="p-6">
      <div className="rounded-2xl border bg-background shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Restaurant</TableHead>
              {/* <TableHead>Email</TableHead> */}
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {providers?.map((provider: any) => (
              <TableRow key={provider.id}>
                {/* Logo */}
                <TableCell>
                  {provider.logo ? (
                    <div className="relative h-12 w-12">
                      <Image
                        src={provider.logo}
                        alt={provider.restaurantName}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-muted rounded-md" />
                  )}
                </TableCell>

                {/* Restaurant */}
                <TableCell className="font-medium">
                  {provider.restaurantName}
                </TableCell>

                {/* Email */}
                {/* <TableCell>{provider.user?.email}</TableCell> */}

                {/* Location */}
                <TableCell>{provider.location}</TableCell>

                {/* Status */}
                <TableCell>
                  <Badge
                    variant={provider.isApproved ? "default" : "secondary"}
                  >
                    {provider.isApproved ? "Approved" : "Pending"}
                  </Badge>
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Link href={`/dashboard/providers/${provider.id}`}>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
