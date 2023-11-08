import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getOrders, getProductsInfinity } from "@/utils/fetch";
import Home from "@/views/Home";
import { dehydrate } from "@tanstack/react-query";

export default async function page() {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    ["getProductsInfinity"],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam)
  );
  await queryClientLocal.prefetchQuery(["getOrders"], () => getOrders('latest'))
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Home />;
    </ReactQueryHydrate>
  );
}
