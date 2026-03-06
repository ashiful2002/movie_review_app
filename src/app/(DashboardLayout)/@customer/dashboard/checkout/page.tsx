"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [cart, setCart] = useState<any[]>([]);

  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = () => {
    const orderData = {
      items: cart,
      deliveryInfo: form,
      totalPrice,
      paymentMethod: "Cash on Delivery",
    };

    toast.success("placed order successfull", { position: "top-right" });
    // later send to API
    // await createOrder(orderData)

    localStorage.removeItem("cart");
    router.push("/dashboard/orders");
  };

  return (
    <div className="max-w-5xl mx-auto py-10 grid md:grid-cols-2 gap-8">
      {/* Delivery Info */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Delivery Information</h2>

        <input
          placeholder="Full Name"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Delivery Address"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <textarea
          placeholder="Order Notes (optional)"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />
      </div>

      {/* Order Summary */}
      <div className="space-y-4 border rounded-xl p-5 h-fit">
        <h2 className="text-xl font-semibold">Order Summary</h2>

        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}

        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <Button onClick={handleSubmit} className="w-full cursor-pointer">
          Place Order (Cash on Delivery)
        </Button>
      </div>
    </div>
  );
};

export default CheckoutPage;
