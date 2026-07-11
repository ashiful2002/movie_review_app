"use server";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const getSubscriptionPlans = async () => {
  try {
    const res = await fetch(`${BASE_URL}/subscription-plans`);
    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data.message,
      };
    }

    return data;
  } catch (error: any) {
    console.log(error);
  }
};
