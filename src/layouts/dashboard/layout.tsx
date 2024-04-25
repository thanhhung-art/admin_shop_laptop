"use client";

import { ReactNode, useEffect, useState } from "react";
import TopNav from "./topNav";
import SideNav from "./sideNav";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { checkauth } from "@/utils/fetch";

interface IProps {
  children: ReactNode;
  authtoken?: string;
}
const DashBoardLayout = ({ children, authtoken }: IProps) => {
  const [validate, setValidate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authencation = async function () {
      let data = { isadmin: false };
      data = await checkauth(authtoken);
      if (!data.isadmin) {
        return router.push("/auth/signIn");
      }
      setValidate(true);
    };

    authencation();
  }, [authtoken, router]);

  return (
    <>
      <TopNav />
      <SideNav />
      <Box
        sx={{
          paddingLeft: `${280}px`,
        }}
      >
        {validate ? (
          children
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default DashBoardLayout;
