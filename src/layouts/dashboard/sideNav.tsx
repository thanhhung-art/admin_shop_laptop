"use client";
import { Box, Drawer, Stack, SvgIcon, Typography } from "@mui/material";
import { Logo } from "@/icons/LogoIcon";
import Link from "next/link";
import { items } from "./config";
import { SideNavItem } from "./sideNavItem";
import useLocation from "@/hooks/useLocation";
import { useEffect } from "react";

interface IProps {
  onClose: () => void;
  open: boolean;
}

const SideNav = () => {
  const { pathname } = useLocation()
  
  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Link href="/">
          <SvgIcon fontSize="large">
            <Logo />
          </SvgIcon>
        </Link>
      </Box>
      <Box
        component="nav"
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
           component="ul"
           spacing={0.5}
           sx={{
             listStyle: 'none',
             p: 0,
             m: 0
           }}
        >
          {items.map((item) => {
              const active = item.path ? (pathname === item.path) : false;
              
              return (
                <SideNavItem
                  active={active}
                  disabled={item.disabled}
                  external={item.external}
                  icon={item.icon}
                  key={item.title}
                  path={item.path}
                  title={item.title}
                />
              );
            })}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor="left"
        onClose={() => false}
        open={true}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(28, 37, 54);",
            color: "#636763",
            width: `${280}px`,
            display: "block",
          },
        }}
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
        variant="permanent"
      >
        {content}
      </Drawer>
    </>
  );
};

export default SideNav;
