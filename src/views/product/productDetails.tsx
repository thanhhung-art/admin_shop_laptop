"use client";
import ShowImage from "@/components/products/product/selectImage";
import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import AddDetails from "@/components/products/product/details";
import { Fetch, getProduct } from "@/utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IGetProduct, IUpdateProduct } from "@/types/product";
import { useRef } from "react";
import { GetProduct } from "@/utils/keys";
import { configure } from "@/utils/global";

type TColors = { color: string; quantity: number}[]
type TValue = string | string[] | boolean | TColors;
export type TOnInputChange = (name: string, value: TValue) => void

const ProductDetails = ({ param }: { param: string }) => {
  const queryClient = useQueryClient();
  const productInfo = useRef<IUpdateProduct>({} as IUpdateProduct);
  const base64Image = useRef<string | ArrayBuffer | null>("");

  const { data, isLoading, isError } = useQuery<IGetProduct>(
    [GetProduct, param],
    () => getProduct(param)
  );

  const uploadEditedProduct = useMutation(
    (data: IUpdateProduct) => Fetch.put(`/products/${param}`, data),
    {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["editProduct"] });
      },
    }
  );

  const spaceCaseToCamelCase = (text: string) => {
    if (text === "operating system") return "os";
    if (text === "hard disk") return "hardDisk";

    return text;
  };

  const handleChange = (name: string, value: TValue) => {
    const key = spaceCaseToCamelCase(name);

    if (configure.includes(key)) {
      if (productInfo.current.configure) {
        productInfo.current.configure[key] = value
      } else {
        productInfo.current.configure = {}
        productInfo.current.configure[key] = value
      }
      return
    }
    
    productInfo.current[key] = value
  };

  const handleSubmit = () => {
    uploadEditedProduct.mutate(productInfo.current);
  };

  if (isLoading) return <div>loading</div>;

  if (isError) {
    return <div></div>;
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
        <Stack direction="row" spacing={4}>
          <ShowImage base64Img={base64Image} img={data.data.img} />
          <AddDetails data={data?.data} onInputChange={handleChange} />
        </Stack>
        <Button
          sx={{ float: "right", width: "132.5px" }}
          variant="contained"
          onClick={handleSubmit}
        >
          {uploadEditedProduct.isLoading ? (
            <CircularProgress color="inherit" size={26} />
          ) : (
            "edit product"
          )}
        </Button>
      </Container>
    </Box>
  );
};

export default ProductDetails;
