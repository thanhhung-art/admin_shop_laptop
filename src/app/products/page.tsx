import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import ImageLaptop from "@/images/71+1lOl1Y1L._AC_SX466_.jpg";
import { IPropduct } from "@/types/product";
import ListProducts from "@/components/products/ListProducts";
import SearchLaptop from "@/components/products/Search";

const data = [] as IPropduct[];
let currId = "id";
for (let i = 0; i < 10; i++) {
  data.push({
    id: currId + i,
    image: ImageLaptop,
    name: "Laptop Acer Swift 3 SF314-512-52MZ - Intel Core i5 - 1240P ",
    rating: 5,
  });
}

const page = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <Typography variant="h4">Products</Typography>
          <SearchLaptop />
          <ListProducts />
        </Stack>
      </Container>
    </Box>
  );
};

export default page;
