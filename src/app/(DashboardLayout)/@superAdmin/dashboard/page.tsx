import { SuperAdminDashboardStats } from "@/components/modules/dashboard/AdminDashboardStatas";
import getStats from "@/services/stats";


const SuperAdminDashboardPage = async () => {

    const statsData = await getStats();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight"> Super Admin Dashboard</h2>
                <p className="text-muted-foreground mt-2">
                    Welcome back! Here&apos;s your platform overview.
                </p>
            </div>
            <SuperAdminDashboardStats statsData={statsData.data} />
        </div>
    );
};

export default SuperAdminDashboardPage;