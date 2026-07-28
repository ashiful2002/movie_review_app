import ProfileCard from "@/components/modules/profile/ProfileCard";
import { getProfile } from "./_actions";

const ProfilePage = async () => {
  const { data } = await getProfile();
  console.log(data, "user ");

  return <ProfileCard user={data?.user} />;
};

export default ProfilePage;
