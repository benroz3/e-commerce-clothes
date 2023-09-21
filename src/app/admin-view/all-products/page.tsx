import ProductsListing from "@/components/productElements/ProductsListing";
import { getAllProducts } from "@/utils/apiCalls";

const page = async () => {
  const res = await getAllProducts();
  const products = res.data;

  return <ProductsListing products={products && products} />;
};

export default page;
