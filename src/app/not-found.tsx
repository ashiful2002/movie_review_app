"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Food404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-yellow-50 text-center">
      {/* 🍕 Pizza Bounce Animation */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="text-6xl mb-6"
      >
        🍕
      </motion.div>

      <h1 className="text-5xl font-bold mb-4 text-red-600">Oops! 404</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        The page you’re looking for got eaten! Maybe try returning home before
        it disappears.
      </p>

      <Link href="/">
        <Button className="bg-red-500 hover:bg-red-600 text-white cursor-pointer">
          Go Home
        </Button>
      </Link>
    </div>
  );
}
