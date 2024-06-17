"use client";
import React, { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import CustomModal from "../base/CustomModal/CustomModal";
import CreateBudget from "../CreateBudget/CreateBudget";

interface IProps {
  children: any;
}

const DashboardLayout = ({ children }: IProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
          <Navbar
            handleOpenMenu={handleOpenMenu}
            handleOpenModal={handleOpenModal}
          />
          <div className="h-auto">{children}</div>
        </div>
      </div>
      <CustomModal open={openModal} handleClose={handleCloseModal}>
        <CreateBudget />
      </CustomModal>
    </div>
  );
};

export default DashboardLayout;
