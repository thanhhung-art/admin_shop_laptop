"use client";
import { IProduct } from "@/types/product";
import { getProducts } from "@/utils/fetch";
import { Box, Card, List, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import Image from "next/image";

interface IProps {
  products: {
    _id: string;
    productId: string;
    quantity: number;
  }[];
}

type IProductInOrder = IProduct & { quantity: number };

const ListProducts = ({ products }: IProps) => {
  const { data } = useQuery(["getProducts"], getProducts);

  const productsInOrder = useMemo(() => {
    const result = [] as IProductInOrder[];
    products.forEach((p) => {
      const product = data?.data.find((item) => item._id === p.productId);
      if (product) {
        result.push({ ...product, quantity: p.quantity });
      }
    });
    return result;
  }, [products, data]);

  console.log(productsInOrder);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" component="h4" sx={{ fontSize: "20px" }}>
        List products
      </Typography>
      <List>
        {productsInOrder.map((p) => (
          <ListItem key={p._id}>
            <Card sx={{ p: 1 }}>
              <Stack direction='row' sx={{ gap: 1 }}>
                <Box>
                  <Image
                    src={p.img}
                    width={120}
                    height={60}
                    alt="laptop image"
                  />
                </Box>
                <Box>
                  <Tooltip title={p.name}>
                    <Typography fontSize={12}>{p.name.slice(0, 30)}...</Typography>
                  </Tooltip>
                  <Typography fontSize={12}>${p.price}</Typography>
                  <Typography fontSize={12}>x{p.quantity}</Typography>
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
