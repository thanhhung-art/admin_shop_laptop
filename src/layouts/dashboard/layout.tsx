"use client";

import { ReactNode } from "react";
import TopNav from "./topNav";
import SideNav from "./sideNav";
import { Box } from "@mui/material";
interface IProps {
  children: ReactNode;
  authtoken?: string;
}
const DashBoardLayout = ({ children }: IProps) => {
  return (
    <>
      <TopNav />
      <SideNav />
      <Box
        sx={{
          paddingLeft: `${280}px`,
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DashBoardLayout;
