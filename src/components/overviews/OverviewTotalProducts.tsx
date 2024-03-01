"use client";
import { getAmountProducts } from "@/utils/fetch";
import { GetAmountProducts } from "@/utils/keys";
import CubeIcon from "@heroicons/react/24/solid/esm/CubeIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  Typography,
  SvgIcon,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

interface IProps {
  difference: number;
  positive: boolean;
  sx: object;
  value: string;
}

const OverviewTotalProducts = ({
  difference,
  positive = false,
  sx,
  value,
}: IProps) => {
  const { data } = useQuery([GetAmountProducts], getAmountProducts)

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
              <Typography
                color="text.secondary"
                variant="overline"
                fontWeight={900}
              >
                Total products
              </Typography>
              <Typography variant="h4">{data?.data}</Typography>
            </Stack>
            <Avatar sx={{ background: red[500], padding: 3 }}>
              <SvgIcon>
                <CubeIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default OverviewTotalProducts;
