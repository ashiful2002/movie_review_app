import ProductCard from "@/components/modules/products/ProductsCard";
import { getAllMeals } from "@/services/meals";

const page = async () => {
  const { data } = await getAllMeals();
  const meals = data.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 ">
      {meals?.map((product: any, index: number) => (
        <ProductCard product={product} key={index} />
      ))}
    </div>
  );
};

export default page;
