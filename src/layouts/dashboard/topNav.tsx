"use client";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  alpha,
} from "@mui/material";
import { useEffect, useState } from "react";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import useMobile from "@/hooks/isMobile";

const TopNav = () => {
  const { isMobile } = useMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div></div>;

  return (
    <Box
      component="header"
      sx={{
        backdropFilter: "blur(6px)",
        backgroundColor: (theme) =>
          alpha(theme.palette.background.default, 0.8),
        color: "black",
        padding: "12px",
        position: "sticky",
        left: {
          lg: `${280}px`,
        },
        top: 0,
        width: {
          lg: `calc(100% - ${280}px)`,
        },
        zIndex: (theme) => theme.zIndex.drawer + 1,
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          minHeight: `${64}px`,
        }}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          {isMobile && (
            <IconButton>
              <SvgIcon fontSize="small">
                <Bars3Icon />
              </SvgIcon>
            </IconButton>
          )}
          <Tooltip title="search">
            <IconButton>
              <SvgIcon fontSize="small">
                <MagnifyingGlassIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
        </Stack>
        <Stack alignItems="center" direction="row" spacing={2}>
          <Tooltip title="Contacts">
            <IconButton>
              <SvgIcon fontSize="small">
                <UsersIcon />
              </SvgIcon>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton>
              <Badge badgeContent={4} color="success" variant="dot">
                <SvgIcon fontSize="small">
                  <BellIcon />
                </SvgIcon>
              </Badge>
            </IconButton>
          </Tooltip>
          <Avatar
            sx={{
              cursor: "pointer",
              height: 40,
              width: 40,
            }}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default TopNav;
