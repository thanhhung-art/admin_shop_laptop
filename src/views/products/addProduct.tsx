'use client'
import {
  Box,
  Button,
  Container,
  Stack,
} from "@mui/material";
import ShowImage from "@/components/products/product/selectImage";
import AddDetails from "@/components/products/product/details";
import { ChangeEvent, useRef, useState } from "react";
import { IProduct } from "@/types/product";

const AddProduct = () => {

  const productInfo = useRef<IProduct>({} as IProduct)

  const handleChange = ({ name, value }: { name: string, value: string }) => {
    if (productInfo.current) {
      if (name === 'name') {
        productInfo.current[name]
      } else {
        productInfo.current.configure
      }
    }
  }

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
          <AddDetails onInputChange={handleChange} />
        </Stack>
        <Box>
          <Button variant="contained" sx={{ float: "right" }}>add product</Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AddProduct;

