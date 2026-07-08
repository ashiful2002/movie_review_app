import UserTable from "@/components/modules/admin/UsersTable";
import { getAAllUsers } from "@/services/users";

const Page = async () => {
  const { data: users } = await getAAllUsers();

  const admins = users?.filter((user: any) => user.role === "ADMIN");
  const customers = users?.filter((user: any) => user.role === "CUSTOMER");
  const providers = users?.filter((user: any) => user.role === "PROVIDER");

  return (
    <div className="space-y-10 ml-5">
      <UserTable title="Admins" users={admins} />
      <UserTable title="Providers" users={providers} />
      <UserTable title="Customers" users={customers} />
    </div>
  );
};

export default Page;
