import ListProducts from "@/components/products/ListProducts"
import SearchLaptop from "@/components/products/Search"
import { Box, Container, Stack, Typography } from "@mui/material"

const ProductsPage = () => {
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
  )
}

export default ProductsPage