import { AdminDashboardStats } from "@/components/modules/dashboard/AdminDashboardStatas";

 
const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here&apos;s your platform overview.
        </p>
      </div>
      <AdminDashboardStats />
    </div>
  );
};

export default page;