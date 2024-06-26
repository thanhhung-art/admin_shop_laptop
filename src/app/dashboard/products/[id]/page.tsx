import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getProduct } from "@/utils/fetch";
import { GetProduct } from "@/utils/keys";
import ProductDetails from "@/views/product/productDetails";
import { Box, CircularProgress } from "@mui/material";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetProduct, params.id], () =>
    getProduct(params.id)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Suspense
        fallback={
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        }
      >
        <ProductDetails param={params.id} />
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
