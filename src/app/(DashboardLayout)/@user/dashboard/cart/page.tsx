"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart: any[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    updateCart(updated);
  };

  const decreaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
        : item
    );

    updateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center h-[400px] text-muted-foreground">
        <p className="text-lg">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className=" w-5xl mx-auto py-10 space-y-6">
      <h2 className="text-2xl font-bold text-center">Your Cart</h2>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex flex-col border rounded-xl p-4">
            <div className="border   p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={70}
                  height={70}
                  className="rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold capitalize">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">${item.price}</p>
                </div>
              </div>
            </div>
            <div className="border   flex items-center justify-around p-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-5">
                <Button
                  className="cursor-pointer"
                  size="icon"
                  variant="outline"
                  onClick={() => decreaseQty(item.id)}
                >
                  <Minus size={16} />
                </Button>

                <span className="font-medium">{item.quantity}</span>

                <Button
                  className="cursor-pointer"
                  size="icon"
                  variant="outline"
                  onClick={() => increaseQty(item.id)}
                >
                  <Plus size={16} />
                </Button>
              </div>

              {/* Item Total */}
              <div className="font-semibold">${item.price * item.quantity}</div>

              {/* Remove */}
              <Button
                className="cursor-pointer"
                size="icon"
                variant="destructive"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Section */}
      <div className="flex flex-col md:flex-row justify-around gap-4 border-t pt-6">
        <h3 className="text-xl font-semibold">
          Total: ${totalPrice.toFixed(2)}
        </h3>

        <Link href={"/dashboard/checkout"}>
          <Button className="cursor-pointer" size="lg">
            Proceed to Checkout
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
