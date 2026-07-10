import { CalendarDays, Clock3, Crown, Shield, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormattedDate from "@/components/Shared/FormattedDate";
import { UserProfile } from "@/app/(DashboardLayout)/@user/dashboard/profile/types";

interface AccountInfoProps {
  user: UserProfile;
}

const AccountInfo = ({ user }: AccountInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Account Information</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Shield className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">{user.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-4">
          <BadgeCheck className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">Email Status</p>
            <p className="font-medium">
              {user.emailVerified ? "Verified" : "Not Verified"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-4">
          <CalendarDays className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">Joined</p>
            <p className="font-medium">
              <FormattedDate date={user.createdAt} />
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border p-4">
          <Clock3 className="h-5 w-5 text-primary" />

          <div>
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-medium">
              <FormattedDate date={user.updatedAt} />
            </p>
          </div>
        </div>

        {user.isPremium && (
          <div className="flex items-center gap-3 rounded-lg border p-4 md:col-span-2">
            <Crown className="h-5 w-5 text-yellow-500" />

            <div>
              <p className="text-sm text-muted-foreground">Subscription</p>

              <p className="font-semibold text-yellow-600">Premium Member</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
