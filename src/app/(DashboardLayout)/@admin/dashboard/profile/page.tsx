import ProfileCard from "@/components/modules/profile/ProfileCard";
import { getProfile } from "./_actions";

const ProfilePage = async () => {
  const response = await getProfile();

  return <ProfileCard user={response?.data} />;
};

export default ProfilePage;
