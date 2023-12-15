import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getUsers } from "@/utils/fetch";
import Customers from "@/views/customers";
import { dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

const page = async () => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery(["getCustomers"], getUsers);
  const dehydratedState = dehydrate(queryClientLocal);
  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Suspense fallback={<div>loading</div>}>
        <Customers />
      </Suspense>
    </ReactQueryHydrate>
  );
};

export default page;
