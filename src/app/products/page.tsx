import { Box, CircularProgress } from "@mui/material";
import { queryClient } from "@/lib/react_query/queryClient";
import { dehydrate } from "@tanstack/react-query";
import { getProductsInfinity } from "@/utils/fetch";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { GetProductsInfinity } from "@/utils/keys";
import ProductsPage from "@/views/products";
import { Suspense } from "react";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetProductsInfinity],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Suspense
        fallback={
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        }
      >
        <ProductsPage />
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
