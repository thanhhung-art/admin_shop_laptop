import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getReviewsInfinity } from "@/utils/fetch";
import { GetReviewsInfinity } from "@/utils/keys";
import ReviewPage from "@/views/reviews";
import { Box, CircularProgress } from "@mui/material";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetReviewsInfinity],
    ({ pageParam = 0 }) => getReviewsInfinity(pageParam)
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
        <ReviewPage />
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
