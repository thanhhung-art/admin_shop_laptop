"use client";
import { IProduct } from "@/types/product";
import { getProduct } from "@/utils/fetch";
import {
  Box,
  Card,
  List,
  ListItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import { useMemo } from "react";
import Image from "next/image";

interface IProps {
  products: {
    _id: string;
    productId: string;
    quantity: number;
  }[];
}

const ListProducts = ({ products }: IProps) => {
  const promises = useMemo(() => {
    return products.map((p) => ({
      queryKey: ["getProduct", p._id],
      queryFn: () => getProduct(p.productId),
    }));
  }, [products]);
  const data = useQueries({
    queries: promises,
  });

  const productsInOrder = useMemo(
    () =>
      data.map((p) => {
        if (!p.data) return null
        const quantity =
          products[
            products.findIndex(
              (product) => product.productId === p.data?.data._id
            )
          ].quantity;
        return { ...p.data.data, quantity };
      }),
    [data, products]
  );

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" component="h4" sx={{ fontSize: "20px" }}>
        List products
      </Typography>
      <List>
        {productsInOrder.map((p, i) => (
          <ListItem key={p?._id || i}>
            <Card sx={{ p: 1 }}>
              <Stack direction="row" sx={{ gap: 1 }}>
                <Box>
                  <Box sx={{ position: "relative", height: 40, width: 80 }}>
                    {p?.img && (
                      <Image
                        src={p.img}
                        fill
                        alt="laptop image"
                        style={{ objectFit: "contain" }}
                      />
                    )}
                  </Box>
                </Box>
                <Box>
                  <Tooltip title={p?.name}>
                    <Typography fontSize={12}>
                      {p?.name?.slice(0, 30) || ""}...
                    </Typography>
                  </Tooltip>
                  <Typography fontSize={12}>${p?.price || 0}</Typography>
                  <Typography fontSize={12}>x{p?.quantity || 0}</Typography>
                </Box>
              </Stack>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ListProducts;
