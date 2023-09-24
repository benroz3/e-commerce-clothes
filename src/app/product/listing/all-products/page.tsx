import ProductsListing from "@/components/productElements/ProductsListing";
import { fetchFilteredProducts } from "@/utils/apiCalls/products";

const page = async () => {
  const res = await fetchFilteredProducts("");
  const allProducts = res.data;

  return <ProductsListing products={allProducts && allProducts} />;
};

export default page;
