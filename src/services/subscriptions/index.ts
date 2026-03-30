"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getSubscriptionPlans = async () => {
  try {
    const res = await fetch(`${BASE_URL}/subscription-plans`, {
      next: {
        revalidate: 20,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch subscription-plans");
    }

    return res.json();
  } catch (error: any) {
    console.log(error);
  }
};
