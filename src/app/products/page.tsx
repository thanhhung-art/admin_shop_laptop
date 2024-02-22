import { Box, Container, Stack, Typography } from "@mui/material";
import ListProducts from "@/components/products/ListProducts";
import SearchLaptop from "@/components/products/Search";
import { queryClient } from "@/lib/react_query/queryClient";
import { dehydrate } from "@tanstack/react-query";
import { getProductsInfinity } from "@/utils/fetch";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { GetProductsInfinity } from "@/utils/keys";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetProductsInfinity],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
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
    </ReactQueryHydrate>
  );
};

export default page;
