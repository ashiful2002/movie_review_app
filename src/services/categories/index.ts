export const getCategories = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/categories`,
      {
        next: {
          revalidate: 20,
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
    const result = await res.json();
    return result;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
