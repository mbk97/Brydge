import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

interface IProps {
  open: boolean;
  handleClose: () => void;
  children: any;
}

const CustomModal = ({ open, handleClose, children }: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const drawerWidth = isMobile ? "100vw" : 400;
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      anchor="right"
      style={{ width: drawerWidth }}
    >
      <div className="md:w-[400px] p-4 w-[100vw]">{children}</div>
    </Drawer>
  );
};

export default CustomModal;
