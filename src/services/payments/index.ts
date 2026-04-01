"use server";

 import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

export const createCheckoutSession = async (planId: string) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("You must be logged in to subscribe");
  console.log("plan id in service", planId);

  const res = await fetch(`${BASE_URL}/payments/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ planId }),
  });

 
  const data = await res.json();
  if (!res.ok) {
    console.error("Payment API Error:", data);
    throw new Error(data.message || "Failed to create checkout session");
  }

  return data.data; // { sessionId, paymentUrl, amount, currency }
};

// export const getPaymentHistory = async () => {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     const res = await fetch(`${BASE_URL}/payments/history`, {
//         method: "GET",
//         headers: { "Content-Type": "application/json", Authorization: token },
//         cache: "no-store",
//     });

//     return res.json(); // Returns payments with subscription + plan details
// };
