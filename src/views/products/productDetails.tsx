"use client";
import ShowImage from "@/components/products/product/selectImage";
import { Box, Button, CircularProgress, Container, Stack } from "@mui/material";
import AddDetails from "@/components/products/product/details";
import { Fetch, getProduct } from "@/utils/fetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IGetProduct, IProduct } from "@/types/product";
import { ChangeEvent, useEffect, useRef, useState } from "react";

const ProductDetails = ({ param }: { param: string }) => {
  const queryClient = useQueryClient();
  const [stocking, setStocking] = useState("stocking");
  const [featured, setFeatured] = useState(false);
  const productInfo = useRef<IProduct>({ configure: {} } as IProduct);
  const base64Image = useRef<string | ArrayBuffer | null>("");

  const { data, isLoading, isError, isSuccess } = useQuery<IGetProduct>(
    ["getProduct"],
    () => getProduct(param)
  );

  const uploadEditedProduct = useMutation(
    (data: IProduct) => Fetch.put(`/products/${param}`, productInfo.current),
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

  const handleChange = ({ name, value }: { name: string; value: string }) => {
    const key = spaceCaseToCamelCase(name);
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
    if (productInfo.current && data) {
      if (infoLaptop.includes(name)) {
        productInfo.current[key as keyof typeof productInfo.current] = value;
      } else {
        productInfo.current.configure[
          key as keyof typeof productInfo.current.configure
        ] = value;
      }
    }
  };

  const handleSubmit = () => {
    productInfo.current.instock = stocking;
    // add properties if it hadn't edited yet
    if (!productInfo.current.name && data?.data.name)
      productInfo.current.name = data.data.name;
    if (!productInfo.current.price && data?.data.price)
      productInfo.current.price = data.data.price;
    if (!productInfo.current.img && data?.data.img)
      productInfo.current.img = data.data.img;

    uploadEditedProduct.mutate(productInfo.current);
  };

  const handleEnableFeaturedProduct = (e: ChangeEvent<HTMLInputElement>) => {
    setFeatured(e.target.checked);
    productInfo.current.featured = e.target.checked;
  };

  useEffect(() => {
    // add configure to product info variable
    if (isSuccess) {
      const { _id, ...rest } = data.data.configure;
      productInfo.current.configure = rest;
    }
  }, [isSuccess, data?.data.configure]);

  useEffect(() => {
    if (data) {
      if (data.data.featured) setFeatured(data.data.featured);
    }
  }, [data]);

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
          <AddDetails
            data={data?.data}
            onInputChange={handleChange}
            stocking={stocking}
            setStocking={setStocking}
            handleEnableFeaturedProduct={handleEnableFeaturedProduct}
            featured={featured}
          />
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
