import AddMealForm from "@/components/modules/products/AddMealForm";
import { getCategories } from "@/services/categories";

const page = async () => {
  const { data: categories } = await getCategories();

  return (
    <div>
      <AddMealForm categoriesParams={categories} />
    </div>
  );
};

export default page;
