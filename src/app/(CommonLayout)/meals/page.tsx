import MealsFilter from "@/components/modules/meals/MealFilter";
import ProductCard from "@/components/modules/meals/ProductsCard";
import { getAllMeals } from "@/services/meals";
import MealsPagination from "@/components/modules/meals/MealsPagination";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  const { data } = await getAllMeals(params);
  const meals = data.data;
  const meta = data.meta;
 
  return (
    <div>
      <MealsFilter />

      {meals?.length === 0 ? (
        "empty meals"
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {meals?.map((product: any) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>

          <MealsPagination totalPage={meta.totalPage} />
        </>
      )}
    </div>
  );
};

export default page;
