import { useStore } from "@/store/strore";
import React from "react";
import { MdMenu } from "react-icons/md";

type IProps = {
  handleOpenMenu: () => void;
  user: any;
};

const Navbar = ({ handleOpenMenu, user }: IProps) => {
  const userName = user?.email?.split("@")[0];
  const { setOpenModal } = useStore();

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <h2 className="font-medium text-[1.4rem]">Hello, {userName} 👋</h2>
        <div className="flex items-center">
          <button
            type={"submit"}
            className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[150px] font-semibold  hidden lg:flex  justify-center items-center gap-3 `}
            onClick={handleOpenModal}
          >
            Create Budget
          </button>
          <div className="block lg:hidden">
            <MdMenu
              size={30}
              className="cursor-pointer"
              onClick={handleOpenMenu}
            />
          </div>
        </div>
      </div>
      <div className="flex w-[100%] justify-end mt-10">
        <button
          type={"submit"}
          className={`button text-white bg-[#7c4be6] h-[45px]  cursor-pointer  rounded-[10px] w-[150px] font-semibold  block lg:hidden  justify-center items-center gap-3 `}
          onClick={handleOpenModal}
        >
          Create Budget
        </button>
      </div>
    </>
  );
};

export default Navbar;
