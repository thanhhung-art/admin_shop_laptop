import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getOrders } from "@/utils/fetch";
import { GetOrders } from "@/utils/keys";
import Orders from "@/views/orders";
import { Box, CircularProgress } from "@mui/material";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetOrders], () => getOrders("all"));
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
        <Orders />;
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
