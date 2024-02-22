import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getOrders } from "@/utils/fetch";
import { GetOrders } from "@/utils/keys";
import Orders from "@/views/orders";
import { dehydrate } from "@tanstack/react-query";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetOrders], () =>
    getOrders()
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Orders />;
    </ReactQueryHydrate>
  );
};

export default page;
