import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

type IProps = {
  handleCloseMenu: () => void;
};

const Sidebar = ({ handleCloseMenu }: IProps) => {
  const router = useRouter();
  const supabase = createClient();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
  };
  return (
    <div>
      <div className="px-5 pt-5 mb-8">
        <h1 className="text-[#7c4be6] mb-3 text-[1.6rem] font-semibold">
          Brydge
        </h1>
      </div>
      <div className="h-[80vh] flex justify-between flex-col">
        <div className="bg-[#7c4be6] pl-4 py-2 flex items-center mb-3">
          <MdSpaceDashboard className="text-[#ffffff] mr-3" size={18} />
          <p className=" text-[#ffffff] font-medium text-[18px]">Dashboard</p>
        </div>
        <div
          className="pl-4 py-2 flex items-center mb-3 cursor-pointer"
          onClick={handleLogout}
        >
          <CiLogout className="text-[#7c4be6] mr-3" size={18} />
          <p className=" text-[#7c4be6] font-medium text-[18px]">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
