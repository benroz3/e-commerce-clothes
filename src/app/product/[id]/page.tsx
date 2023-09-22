import ProductDetails from "@/components/productElements/ProductDetails";
import { fetchProductById } from "@/utils/apiCalls";

const page: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const res = await fetchProductById(params.id);
  const singleProduct = res.data;

  return <ProductDetails product={singleProduct} />;
};

export default page;
