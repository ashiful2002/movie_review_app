import { getProfile } from "@/app/(DashboardLayout)/@user/dashboard/profile/_actions";
import ProfileCard from "@/components/modules/profile/ProfileCard";

const ProfilePage = async () => {
  const { data } = await getProfile();
  console.log(data, "user ");

  return <ProfileCard user={data?.user} />;
};

export default ProfilePage;
