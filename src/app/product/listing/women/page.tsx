import ProductsListing from "@/components/productElements/ProductsListing";
import { fetchFilteredProducts } from "@/utils/apiCalls/products";

const page = async () => {
  const res = await fetchFilteredProducts("women");
  const womenProducts = res.data;

  return <ProductsListing products={womenProducts && womenProducts} />;
};

export default page;
