import { queryClient } from "@/lib/react_query/queryClient";
import { ReactQueryHydrate } from "@/lib/react_query/reactQueryHydrate";
import { getProduct } from "@/utils/fetch";
import { GetProduct } from "@/utils/keys";
import ProductDetails from "@/views/products/productDetails";
import { dehydrate } from "@tanstack/react-query";

const page = async ({ params }: { params: { id: string } }) => {
  const queryClientLocal = queryClient();
  await queryClientLocal.prefetchQuery([GetProduct, params.id], () =>
    getProduct(params.id)
  );
  const dehydratedState = dehydrate(queryClientLocal);

  return (
    <ReactQueryHydrate state={dehydratedState}>
      <ProductDetails param={params.id} />
    </ReactQueryHydrate>
  );
};

export default page;
