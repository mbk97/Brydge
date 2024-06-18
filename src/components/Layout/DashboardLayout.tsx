"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";

interface IProps {
  children: any;
  user: string;
}

const DashboardLayout = ({ children, user }: IProps) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="h-auto">
      <div className="flex">
        <div
          className={`${
            openMenu ? "sideBarWrapper active" : "sideBarWrapper"
          }  border-r h-screen shadow-lg bg-[#ffffff]`}
        >
          <Sidebar handleCloseMenu={handleOpenMenu} />
        </div>
        <div className={`${openMenu ? "layout show" : "layout"} p-5 w-[100%]`}>
          <Navbar handleOpenMenu={handleOpenMenu} user={user} />
          <div className="h-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
