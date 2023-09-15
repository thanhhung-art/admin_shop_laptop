"use client";
import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import ShowImage from "@/components/products/product/selectImage";
import AddDetails from "@/components/products/product/details";
import { useRef, useState } from "react";
import { IProduct } from "@/types/product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fetch } from "@/utils/fetch";

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [stocking, setStocking] = useState("stocking");
  const productInfo = useRef<IProduct>({ configure: {}, price: 0 } as IProduct);
  const base64Image = useRef<string | ArrayBuffer | null>("");
  const [refresh, setRefresh] = useState(false);

  const addProductMutation = useMutation(
    (data: IProduct) => {
      return Fetch.post("/products", data);
    },
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["addProduct"] });
      },
    }
  );

  const spaceCaseToCamelCase = (text: string) => {
    if (text === "operating system") return "os";
    if (text === "hard disk") return "hardDisk";

    return text;
  };

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    name = spaceCaseToCamelCase(name);
    if (productInfo.current) {
      const infoLaptop = [
        "name",
        "price",
        "brand",
        "description",
        "instock",
        "img",
        "categories",
        "rating",
        "color",
        "weight",
      ];

      if (infoLaptop.includes(name)) {
        productInfo.current[name] = value;
      } else {
        productInfo.current.configure[name] = value;
      }
    }
  };

  const handleSubmit = () => {
    productInfo.current.price = Number(productInfo.current.price);
    productInfo.current.instock = stocking;
    productInfo.current.rating = 0;

    if (typeof base64Image.current === "string")
      productInfo.current.img = base64Image.current;
    addProductMutation.mutate(productInfo.current);
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
          <ShowImage base64Img={base64Image} />
          <AddDetails
            onInputChange={handleChange}
            stocking={stocking}
            setStocking={setStocking}
            refresh={refresh}
          />
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
