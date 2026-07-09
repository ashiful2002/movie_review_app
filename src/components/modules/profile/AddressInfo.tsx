import { Building2, MapPin, MapPinned } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/app/(DashboardLayout)/@user/dashboard/profile/types";
 
interface AddressInfoProps {
  user: UserProfile;
}

const AddressInfo = ({ user }: AddressInfoProps) => {
  const hasAddress =
    user.street || user.city || user.postalCode;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Address Information</CardTitle>
      </CardHeader>

      <CardContent>
        {hasAddress ? (
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 rounded-lg border p-4">
              <Building2 className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Street</p>
                <p className="font-medium">
                  {user.street || (
                    <span className="italic text-muted-foreground">
                      Not provided
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">
                  {user.city || (
                    <span className="italic text-muted-foreground">
                      Not provided
                    </span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-lg border p-4">
              <MapPinned className="mt-0.5 h-5 w-5 text-primary" />

              <div>
                <p className="text-sm text-muted-foreground">Postal Code</p>
                <p className="font-medium">
                  {user.postalCode || (
                    <span className="italic text-muted-foreground">
                      Not provided
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="italic text-muted-foreground">
            No address information added yet.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default AddressInfo;