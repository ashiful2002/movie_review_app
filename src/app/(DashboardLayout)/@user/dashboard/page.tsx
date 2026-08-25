import { UserDashboardStats } from "@/components/modules/dashboard/UserDashboardStatus";
import getStats from "@/services/stats";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
};
const UserDashboard = async () => {
  const statsData = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Your Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Track your viewing activity and preferences.
        </p>
      </div>
      <UserDashboardStats data={statsData.data} />
    </div>
  );
};

export default UserDashboard;
