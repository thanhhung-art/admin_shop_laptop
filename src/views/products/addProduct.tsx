'use client'
import {
  Box,
  Container,
  Stack,
} from "@mui/material";
import ShowImage from "@/components/products/product/selectImage";
import AddDetails from "@/components/products/product/details";
import { useState } from "react";
import { IProduct } from "@/types/product";

const AddProduct = () => {
 
  const [productInfo, setProductInfo] = useState<IProduct>()

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack direction="row" spacing={2}>
          <ShowImage />
          <AddDetails />
        </Stack>
      </Container>
    </Box>
  );
};

export default AddProduct;

