import DashboardComponent from "@/components/Dashboard/DashboardComponent";
import { createClient } from "@/utils/supabase/server";
import React, { useEffect } from "react";

const Dashboard = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <DashboardComponent user={user} />
    </div>
  );
};

export default Dashboard;
