import { SuperAdminDashboardStats } from "@/components/modules/dashboard/AdminDashboardStatas";
import getStats from "@/services/stats";

const page = async () => {
  const { data: statsData } = await getStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s your platform overview.
        </p>
      </div>
      <SuperAdminDashboardStats statsData={statsData} />
    </div>
  );
};

export default page;
