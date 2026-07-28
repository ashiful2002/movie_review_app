import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactInfo from "./ContactInfo";
import AddressInfo from "./AddressInfo";
import AccountInfo from "./AccountInfo";
import ProfileActions from "./ProfileActions";
import { UserProfile } from "@/app/(DashboardLayout)/@user/dashboard/profile/types";

interface ProfileCardProps {
  user: UserProfile;
}

const ROLE_COLORS: Record<string, string> = {
  USER: "bg-yellow-400 ",
  ADMIN: "bg-red-500 hover:bg-red-500",
  PROVIDER: "bg-emerald-500 hover:bg-emerald-500",
  SUPER_ADMIN: "bg-violet-500 hover:bg-violet-500",
};

const ProfileCard = ({ user }: ProfileCardProps) => {
  if (!user) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <p className="text-muted-foreground">User not found.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <Card className="overflow-hidden rounded-2xl shadow-lg">
        <CardHeader className="border-b bg-muted/30">
          <div className="flex flex-col items-center gap-4 text-center">
            <Avatar className="h-28 w-28 border-4 border-background shadow-md">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-3xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle className="text-3xl">{user.name}</CardTitle>

              <p className="mt-1 text-muted-foreground">{user.email}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              <Badge
                className={
                  ROLE_COLORS[user.role] ??
                  "bg-gray-500 hover:bg-gray-500 text-white"
                }
              >
                {user.role}
              </Badge>

              <Badge variant={user.emailVerified ? "default" : "secondary"}>
                {user.emailVerified ? "Email Verified" : "Email Not Verified"}
              </Badge>

              {user.isPremium && (
                <Badge className="bg-yellow-500 text-black hover:bg-yellow-500">
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <ContactInfo user={user} />

          {/* <AddressInfo user={user} /> */}

          <AccountInfo user={user} />

          <ProfileActions user={user} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileCard;
