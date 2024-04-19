"use client";
import { getRevenue } from "@/utils/fetch";
import { GetRevenue } from "@/utils/keys";
import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

interface IProps {
  sx: object;
  value: number;
}

const OverviewTotalRevenue = ({ sx, value }: IProps) => {
  const { data } = useQuery([GetRevenue], getRevenue);

  return (
    <>
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
                Total revenue
              </Typography>
              <Typography variant="h4">${data?.data}</Typography>
            </Stack>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <CurrencyDollarIcon />
              </SvgIcon>
            </Avatar>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default OverviewTotalRevenue;
