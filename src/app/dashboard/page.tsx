import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getOrders, getProductsInfinity } from "@/utils/fetch";
import { GetOrders, GetProductsInfinity } from "@/utils/keys";
import Home from "@/views/Home";
import { dehydrate } from "@tanstack/react-query";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
  const cookieStore = cookies();
  if (!cookieStore.get("authtoken")) {
    redirect("/auth/signIn");
  }
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchInfiniteQuery(
    [GetProductsInfinity],
    ({ pageParam = 0 }) => getProductsInfinity(pageParam)
  );
  await queryClientLocal.prefetchQuery([GetOrders], () => getOrders("all"));
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Home />;
    </ReactQueryHydrate>
  );
}
