"use client";
import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import ShowImage from "@/components/products/product/selectImage";
import AddDetails from "@/components/products/product/details";
import { useRef, useState } from "react";
import { IProduct, IUpdateProduct } from "@/types/product";
import { useMutation } from "@tanstack/react-query";
import { Fetch } from "@/utils/fetch";
import { configure, spaceCaseToCamelCase } from "@/utils/global";

const AddProduct = () => {
  const productInfo = useRef<IUpdateProduct>({} as IUpdateProduct);
  const base64Image = useRef<string | ArrayBuffer | null>("");
  const [refresh, setRefresh] = useState(false);

  const addProductMutation = useMutation(
    (data: IUpdateProduct) => {
      return Fetch.post("/products", data);
    },
    {
      onSuccess() {
        //queryClient.invalidateQueries({ queryKey: ["addProduct"] });
      },
    }
  );

  const handleChange = (
    name: string,
    value: string | string[] | { color: string; quantity: number }[] | boolean
  ) => {
    const key = spaceCaseToCamelCase(name);
    if (productInfo.current) {
      if (configure.includes(key)) {
        if (productInfo.current.configure) {
          productInfo.current.configure[key] = value;
        } else {
          productInfo.current.configure = { key: value };
        }
      } else {
        productInfo.current[key] = value;
      }
    }
  };

  const handleSubmit = () => {
    productInfo.current.price = Number(productInfo.current.price);
    productInfo.current.rating = 0;

    if (typeof base64Image.current === "string")
      productInfo.current.img = base64Image.current;
    addProductMutation.mutate(productInfo.current);
    console.log(productInfo.current.price);
  };

  const handleRefresh = () => {
    productInfo.current = { configure: {}, price: 0 } as IProduct;
    setRefresh(!refresh);
  };

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
          <ShowImage base64Img={base64Image} refresh={refresh} />
          <AddDetails onInputChange={handleChange} refresh={refresh} />
        </Stack>
        <Box>
          <Stack direction="row" justifyContent="left" spacing={2}>
            <Button
              variant="outlined"
              sx={{ ml: "auto" }}
              onClick={handleRefresh}
            >
              refresh
            </Button>
            <Button
              variant="contained"
              sx={{ width: "135px" }}
              onClick={handleSubmit}
              disabled={addProductMutation.isLoading}
            >
              {addProductMutation.isLoading ? (
                <CircularProgress color="inherit" size={26} />
              ) : (
                "add product"
              )}
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default AddProduct;
