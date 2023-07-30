import React, { ReactNode } from "react";
import TopNav from "./topNav";
import SideNav from "./sideNav";
import { Box } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

interface IProps {
  children: ReactNode;
}

const DashBoardLayout = ({ children }: IProps) => {
  return (
    <>
      <TopNav  />
      <SideNav />
      <Box
        sx={{
          paddingLeft: `${280}px`
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default DashBoardLayout;
