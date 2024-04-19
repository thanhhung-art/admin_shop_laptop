"use client";
import { getOrders } from "@/utils/fetch";
import { GetOrdersLatest } from "@/utils/keys";
import ArrowRightIcon from "@heroicons/react/24/solid/ArrowRightIcon";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CircularProgress,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface IProps {
  sx: object;
}

export const OverviewLatestOrders = ({ sx }: IProps) => {
  const { data, isLoading } = useQuery([GetOrdersLatest], () =>
    getOrders("latest")
  );
  const router = useRouter();

  if (isLoading)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <Card sx={sx}>
      <CardHeader title="Latest Orders" />
      <Box sx={{ minWidth: 800 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell sortDirection="desc">Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data.map((order) => {
              const dateObj = new Date(order.createdAt);
              const hours = dateObj.getHours();
              const minutes = dateObj.getMinutes();
              const dateReformated = dateObj.toLocaleDateString(
                navigator.language,
                {
                  year: "numeric",
                  day: "2-digit",
                  month: "2-digit",
                }
              );

              return (
                <TableRow hover key={order._id}>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>{order.username}</TableCell>
                  <TableCell>{`${hours}: ${minutes} - ${dateReformated}`}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>

      <Divider />
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => router.push("/orders")}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};
