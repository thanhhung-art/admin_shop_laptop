import React, { ReactNode } from "react";
import TopNav from "./topNav";
import SideNav from "./sideNav";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import { checkauth } from "@/utils/fetch";
import { redirect } from "next/navigation";
interface IProps {
  children: ReactNode;
}

const DashBoardLayout = async ({ children }: IProps) => {
  const cookieStore = await cookies();
  const authtoken = cookieStore.get("authtoken");

  let data = { isadmin: false };
  data = await checkauth(authtoken?.value);
  if (!data.isadmin) redirect("/auth/signIn");

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
