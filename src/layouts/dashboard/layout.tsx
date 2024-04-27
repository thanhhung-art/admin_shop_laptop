import { ReactNode } from "react";
import TopNav from "./topNav";
import SideNav from "./sideNav";
import { Box } from "@mui/material";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
interface IProps {
  children: ReactNode;
}

const DashBoardLayout = async ({ children }: IProps) => {
  const session = await getSession();

  if (!session.authtoken || !session.isLoggedIn) {
    redirect("/auth/signIn");
  }

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
