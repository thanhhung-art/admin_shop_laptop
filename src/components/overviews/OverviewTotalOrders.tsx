"use client";
import { getAmountOrders } from "@/utils/fetch";
import { GetAmountOrders } from "@/utils/keys";
import ShoppingCartIcon from "@heroicons/react/24/outline/esm/ShoppingCartIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

interface IProps {
  difference: number;
  positive: boolean;
  sx: object;
  value: string;
}

const OverviewTotalOrders = ({
  difference,
  positive = false,
  sx,
  value,
}: IProps) => {
  const { data } = useQuery([GetAmountOrders], () => getAmountOrders());

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
                Total orders
              </Typography>
              <Typography variant="h4">{data?.data}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "success.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <ShoppingCartIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default OverviewTotalOrders;
