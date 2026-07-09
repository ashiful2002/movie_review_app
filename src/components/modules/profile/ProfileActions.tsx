import { UserProfile } from "@/app/(DashboardLayout)/@user/dashboard/profile/types";
import LogOut from "@/components/Buttons/Logout";
import UpdateProfileModal from "@/components/modules/customers/UpdateProfileModal";
 
interface ProfileActionsProps {
  user: UserProfile;
}

const ProfileActions = ({ user }: ProfileActionsProps) => {
  return (
    <div className="flex flex-col justify-end gap-3 border-t pt-6 sm:flex-row">
      <UpdateProfileModal user={user} />
      <LogOut />
    </div>
  );
};

export default ProfileActions;