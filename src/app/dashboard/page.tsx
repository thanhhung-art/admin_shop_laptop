import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import Home from "@/views/Home";
import { dehydrate } from "@tanstack/react-query";

export default async function page() {
  const queryClientLocal = queryClient();
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <Home />;
    </ReactQueryHydrate>
  );
}
