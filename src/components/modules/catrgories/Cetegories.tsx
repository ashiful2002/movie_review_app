import { getCategories } from "@/services/categories";
import { ca } from "zod/v4/locales";

const Cetegories = async () => {
  const { data: allCategories } = await getCategories();
  // console.log(allCategories);

  return allCategories;
};

export default Cetegories;
