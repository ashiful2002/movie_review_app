import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const ManageAdminsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="group w-52 flex items-center gap-2 px-4 py-2 rounded-lg border  transition-colors duration-500"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:scale-110" />{" "}
          Back to Dashboard
        </Link>
      </div>
      Manage Admins page
    </div>
  );
};

export default ManageAdminsPage;
