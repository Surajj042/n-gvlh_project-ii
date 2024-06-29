import User from "@/database/user.modal";
import { checkAdmin } from "@/lib/admin";
import { redirect } from "next/navigation";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const AdminPage = async () => {
  const admin = await checkAdmin();
  if (!admin) redirect("/not-found");
  // Fetch user data from API or database
  const userData = await User.find();

  return (
    <div className="p-6">
      <div className="flex w-full items-start gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">Admin Panel</h1>
      </div>
      <DataTable columns={columns} data={userData} />
    </div>
  );
};

export default AdminPage;
