import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import ListProducts from "@/components/products/ListProducts";
import SearchLaptop from "@/components/products/Search";

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
