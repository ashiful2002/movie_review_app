"use server";
export const getProviders = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/providers`,
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
// get a single provider
export const getSingleProvider = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/providers/${id}`
    );
    console.log(res);

    if (!res.ok) {
      throw new Error("Failed to fetch meals");
    }
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
  }
};
