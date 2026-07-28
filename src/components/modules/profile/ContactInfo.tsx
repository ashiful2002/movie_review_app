import { Mail, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserProfile } from "@/app/(DashboardLayout)/@user/dashboard/profile/types";

interface ContactInfoProps {
  user: UserProfile;
}

const ContactInfo = ({ user }: ContactInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Contact Information</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="rounded-full bg-primary/10 p-3">
            <Mail className="h-5 w-5 text-primary" />
          </div>

          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">Email Address</p>

            <p className="truncate font-medium">{user.email}</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
          <div className="rounded-full bg-primary/10 p-3">
            <Phone className="h-5 w-5 text-primary" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Phone Number</p>

            <p className="font-medium">
              {user.phone ? (
                user.phone
              ) : (
                <span className="italic text-muted-foreground">
                  Not provided
                </span>
              )}
            </p>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
