"use client";
import { getAmountOrdersPending } from "@/utils/fetch";
import { GetOrdersPending } from "@/utils/keys";
import Square3Stack3DIcon from "@heroicons/react/24/solid/esm/Square3Stack3DIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";

interface IProps {
  sx: object;
}

const OverviewOrdersPending = ({ sx }: IProps) => {
  const { data } = useQuery([GetOrdersPending], getAmountOrdersPending);

  return (
    <Suspense fallback={<div>loading</div>}>
      <Card sx={sx}>
        <CardContent>
          <Stack
            alignItems="flex-start"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                orders pending
              </Typography>
              <Typography variant="h4">{data?.data}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <Square3Stack3DIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </Suspense>
  );
};
export default OverviewOrdersPending;
