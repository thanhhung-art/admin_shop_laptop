import ProductDetails from "@/views/products/productDetails";

const page = ({ params }: { params: { id: string }}) => {
  return <ProductDetails param={params.id} />
};

export default page;
