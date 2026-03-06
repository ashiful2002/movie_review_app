import MealsFilter from "@/components/modules/meals/MealFilter";
import ProductCard from "@/components/modules/meals/ProductsCard";
import { getAllMeals } from "@/services/meals";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) => {
  const params = await searchParams;

  const { data } = await getAllMeals(params);
  const meals = data.data;

  return (
    <div>
      <MealsFilter />

      {meals?.length === 0 ? (
        <div className="flex justify-center items-center h-[300px] text-muted-foreground text-lg">
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <p className="text-xl font-medium">No meals found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          {meals?.map((product: any) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default page;
