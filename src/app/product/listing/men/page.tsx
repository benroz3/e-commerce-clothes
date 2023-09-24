import ProductsListing from "@/components/productElements/ProductsListing";
import { fetchFilteredProducts } from "@/utils/apiCalls/products";

const page = async () => {
  const res = await fetchFilteredProducts("men");
  const menProducts = res.data;

  return <ProductsListing products={menProducts && menProducts} />;
};

export default page;
