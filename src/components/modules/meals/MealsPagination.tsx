"use client";

import { useRouter, useSearchParams } from "next/navigation";

const MealsPagination = ({ totalPage }: { totalPage: number }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") || 1);

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.push(`/movies?${params.toString()}`);
  };

  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-2 mt-10">

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => changePage(currentPage - 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        ◀ Previous
      </button>

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => changePage(page)}
          className={`px-3 py-1 border rounded ${
            currentPage === page ? "bg-black text-white" : ""
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPage}
        onClick={() => changePage(currentPage + 1)}
        className="px-3 py-1 border rounded disabled:opacity-40"
      >
        Next ▶
      </button>
    </div>
  );
};

export default MealsPagination;