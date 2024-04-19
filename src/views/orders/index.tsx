"use client";
import {
  Box,
  Button,
  Container,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import EnhancedTable from "@/components/orders/table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrders, updateOrder } from "@/utils/fetch";
import { useMemo, useState } from "react";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import { IOrder, IOrderUpdate } from "@/types/order";
import Details from "@/components/orders/Details";
import ListProducts from "@/components/orders/ListProducts";
import { GetOrders } from "@/utils/keys";

const Orders = () => {
  const { data, refetch } = useQuery([GetOrders], () => getOrders("all"));
  const orderSorted = useMemo(() => {
    return data?.data.sort((a, b) => {
      const dateA = Date.parse(a.createdAt);
      const dateB = Date.parse(b.createdAt);

      return dateA - dateB;
    });
  }, [data]);
  const [open, setOpen] = useState(false);
  const [currOrder, setCurrOrder] = useState<IOrder>();
  const updateOrderStatusMutation = useMutation(
    (dataToUPdate: IOrderUpdate<IOrder>) => {
      return updateOrder(currOrder?._id || "", dataToUPdate);
    }
  );

  const handleCloseDrawer = () => setOpen(false);
  const handleToggleDrawer = (thisOrderId: string) => {
    if (open && thisOrderId === currOrder?._id) {
      setOpen(false);
      return;
    }
    setOpen(true);
  };

  const handleChangeStatusInOrdersArr = (status: string) => {
    if (currOrder) {
      const index = data?.data.findIndex(
        (order) => order._id === currOrder._id
      );
      if (data && index) {
        data.data[index].status = status;
      }
    }
  };

  const handleApproveOrder = () => {
    updateOrderStatusMutation.mutate({ status: "shipped" });
    if (currOrder) {
      handleChangeStatusInOrdersArr("shipped");
      setCurrOrder({ ...currOrder, status: "shipped" });
    }
  };

  const handleRejectOrder = () => {
    updateOrderStatusMutation.mutate({ status: "cancelled" });
    if (currOrder) {
      handleChangeStatusInOrdersArr("cancelled");
      setCurrOrder({ ...currOrder, status: "cancelled" });
    }
  };

  if (!orderSorted) return <div></div>;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Orders
        </Typography>
        <EnhancedTable
          orders={orderSorted}
          handleToggleDrawer={handleToggleDrawer}
          setCurrOrderId={setCurrOrder}
          refetchFunc={refetch}
        />
      </Container>
      <Drawer
        sx={{
          top: 0,
          width: 400,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 400,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <Box sx={{ px: 1, pt: 12, pb: 1 }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h6" component="h2" sx={{ fontSize: "16px" }}>
              {currOrder?._id}
            </Typography>
            <SvgIcon
              fontSize="medium"
              style={{ cursor: "pointer" }}
              onClick={handleCloseDrawer}
            >
              <CloseIcon />
            </SvgIcon>
          </Stack>
          {currOrder && (
            <Details
              id={currOrder._id}
              customerName={currOrder.username}
              date={currOrder.createdAt}
              totalAmount={currOrder.totalPrice}
              status={currOrder.status}
              payment={currOrder.payment}
              phone={currOrder.phone}
              address={currOrder.address}
              address2={currOrder.address2}
              note={currOrder.note}
              email={currOrder.email}
            />
          )}

          <Stack direction="row" justifyContent="flex-end">
            <Button
              onClick={handleApproveOrder}
              color="primary"
              variant="contained"
              sx={{ mr: 2, borderRadius: 10 }}
              disabled={currOrder?.status !== "pending"}
            >
              Approve
            </Button>
            <Button
              onClick={handleRejectOrder}
              color="secondary"
              variant="outlined"
              sx={{ borderRadius: 10 }}
              disabled={currOrder?.status !== "pending"}
            >
              Reject
            </Button>
          </Stack>
          {open && currOrder && (
            <ListProducts products={currOrder ? currOrder.products : []} />
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Orders;
