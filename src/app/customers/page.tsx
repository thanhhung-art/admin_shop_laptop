import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getUsers } from "@/utils/fetch";
import { GetCustomers } from "@/utils/keys";
import Customers from "@/views/customers";
import { Box, CircularProgress } from "@mui/material";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetCustomers], getUsers);
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
        <Customers />
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
