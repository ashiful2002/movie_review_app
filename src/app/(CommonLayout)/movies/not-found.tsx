"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Movie404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-900 text-center text-white">
      {/* 🎬 Movie Clapper Bounce Animation */}
      <motion.div
        animate={{ rotate: [0, -15, 15, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-8xl mb-6"
      >
        🎬
      </motion.div>

      <h1 className="text-6xl font-bold mb-4 text-red-500">Oops! 404</h1>
      <p className="text-gray-300 mb-6 max-w-md">
        The movie you’re looking for was never released… or maybe it got lost
        in the editing room. Try returning to the homepage and discover other hits!
      </p>

      <Link href="/">
        <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer px-6 py-3 rounded-lg text-lg">
          Go Home
        </Button>
      </Link>

      {/* Optional: small subtitle */}
      <p className="text-gray-500 mt-4 text-sm">
        Or explore our top-rated movies while you're here 🍿
      </p>
    </div>
  );
}