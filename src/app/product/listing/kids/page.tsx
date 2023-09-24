import ProductsListing from "@/components/productElements/ProductsListing";
import { fetchFilteredProducts } from "@/utils/apiCalls/products";

const page = async () => {
  const res = await fetchFilteredProducts("kids");
  const kidsProducts = res.data;

  return <ProductsListing products={kidsProducts && kidsProducts} />;
};

export default page;
