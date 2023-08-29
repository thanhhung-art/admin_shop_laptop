'use client'
import ShowImage from "@/components/products/product/selectImage"
import { Box, Container, Stack } from "@mui/material"
import AddDetails from "@/components/products/product/details"
import { getProduct } from "@/utils/fetch"
import { useQuery } from "@tanstack/react-query"
import { IGetProduct, IProduct } from "@/types/product"
import { useRef, useState } from "react"

const ProductDetails = ({ param }: { param: string }) => {
  const [stocking, setStocking] = useState("stocking");
  const productInfo = useRef<IProduct>({ configure: {}, price: 0 } as IProduct);
  const base64Image = useRef<string | ArrayBuffer | null>("");

  const { data, isLoading, isError } = useQuery<IGetProduct>(
    ["getProduct"],
    () => getProduct(param)
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

  if (isLoading) return <div>loading</div>

  if (isError) {
    return <div></div>
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
          <AddDetails data={data?.data} onInputChange={handleChange} stocking={stocking} setStocking={setStocking} />
        </Stack>
      </Container>
    </Box>
  )
}

export default ProductDetails