"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function MovieError() {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-900 text-center text-white">
      {/* 🎥 Film Reel Spin Animation */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
        className="text-8xl mb-6"
      >
        🎥
      </motion.div>

      <h1 className="text-6xl font-bold mb-4 text-yellow-400">
        Something Went Wrong
      </h1>
      <p className="text-gray-300 mb-6 max-w-md">
        The reel got stuck and our movie can't play right now. Our team is
        already trying to fix it. Meanwhile, you can go back home or check out
        other blockbusters!
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/">
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-white cursor-pointer px-6 py-3 rounded-lg text-lg">
            Go Home
          </Button>
        </Link>
        <Link href="/movies">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-6 py-3 rounded-lg text-lg">
            Browse Movies
          </Button>
        </Link>
      </div>

      {/* Optional fun subtitle */}
      <p className="text-gray-500 mt-4 text-sm">
        Maybe grab some popcorn while we fix it 🍿
      </p>
    </div>
  );
}
