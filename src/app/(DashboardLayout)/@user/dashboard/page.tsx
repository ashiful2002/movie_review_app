import { UserDashboardStats } from "@/components/modules/dashboard/UserDashboardStatus";

 
const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Your Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Track your viewing activity and preferences.
        </p>
      </div>
      <UserDashboardStats />
    </div>
  );
};

export default page;