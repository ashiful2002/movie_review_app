"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";
import Loading from "./Loading";

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type PaginationProps = {
  meta: PaginationMeta;
  siblingCount?: number;
  showPageSize?: boolean;
  pageSizes?: number[];
  pageKey?: string;
  limitKey?: string;
};



function buildPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "...")[] {
  const totalShown = siblingCount * 2 + 5;

  if (totalPages <= totalShown) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 2);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages - 1);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const pages: (number | "...")[] = [1];

  if (showLeftEllipsis) pages.push("...");
  else for (let i = 2; i < leftSibling; i++) pages.push(i);

  for (let i = leftSibling; i <= rightSibling; i++) pages.push(i);

  if (showRightEllipsis) pages.push("...");
  else for (let i = rightSibling + 1; i < totalPages; i++) pages.push(i);

  pages.push(totalPages);
  return pages;
}


const Pagination = ({
  meta,
  siblingCount = 1,
  showPageSize = true,
  pageSizes = [10, 20, 50],
  pageKey = "page",
  limitKey = "limit",
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const { page: currentPage, totalPages, total, limit } = meta;

  // ── Navigation helpers ───────────────────────────────────────────────────

  const buildUrl = (updates: Record<string, string | number>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([k, v]) => params.set(k, String(v)));
    return `${pathname}?${params.toString()}`;
  };

  const goTo = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    startTransition(() => {
      router.push(buildUrl({ [pageKey]: page }));
    });
  };

  const changeLimit = (newLimit: number) => {
    startTransition(() => {
      router.push(buildUrl({ [limitKey]: newLimit, [pageKey]: 1 }));
    });
  };

  // ── Derived values ───────────────────────────────────────────────────────

  const pages = buildPageRange(currentPage, totalPages, siblingCount);
  const from = Math.min((currentPage - 1) * limit + 1, total);
  const to = Math.min(currentPage * limit, total);

  if (totalPages <= 0) return null;


  const baseBtn =
    "inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-medium transition-all duration-150 select-none focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-500";

  const activeBtn = `${baseBtn} font-bold shadow-lg shadow-indigo-500/40 ring-2 ring-offset-2 ring-offset-transparent scale-110`;

  const inactiveBtn = `${baseBtn} bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20`;

  const disabledBtn = `${baseBtn} opacity-30 cursor-not-allowed bg-white/5 border border-white/10 text-slate-400`;

  const ellipsisStyle = `${baseBtn} pointer-events-none text-slate-500 border-0`;

  return (
    <>
      {/* ── Full-screen loading overlay ─────────────────────────────────── */}
      {isPending && (
        <>
          < Loading />
        </>
      )}

      {/* ── Pagination bar ──────────────────────────────────────────────── */}
      <div
        className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 px-1 transition-opacity duration-200 ${isPending ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
      >
        {/* Results summary */}
        <p className="text-sm text-slate-400 shrink-0">
          Showing{" "}
          <span className="font-semibold text-slate-200">{from}–{to}</span>
          {" "}of{" "}
          <span className="font-semibold text-slate-200">{total}</span> results
        </p>

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          {/* First */}
          <button
            aria-label="First page"
            disabled={currentPage === 1 || isPending}
            onClick={() => goTo(1)}
            className={currentPage === 1 ? disabledBtn : inactiveBtn}
          >
            <ChevronsLeft size={16} />
          </button>

          {/* Previous */}
          <button
            aria-label="Previous page"
            disabled={currentPage === 1 || isPending}
            onClick={() => goTo(currentPage - 1)}
            className={currentPage === 1 ? disabledBtn : inactiveBtn}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Numbered pages with ellipsis */}
          {pages.map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} className={ellipsisStyle}>
                ···
              </span>
            ) : (
              <button
                key={page}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                disabled={isPending}
                onClick={() => goTo(page as number)}
                className={page === currentPage ? activeBtn : inactiveBtn}
              >
                {isPending && page === currentPage ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  page
                )}
              </button>
            )
          )}

          {/* Next */}
          <button
            aria-label="Next page"
            disabled={currentPage === totalPages || isPending}
            onClick={() => goTo(currentPage + 1)}
            className={currentPage === totalPages ? disabledBtn : inactiveBtn}
          >
            <ChevronRight size={16} />
          </button>

          {/* Last */}
          <button
            aria-label="Last page"
            disabled={currentPage === totalPages || isPending}
            onClick={() => goTo(totalPages)}
            className={currentPage === totalPages ? disabledBtn : inactiveBtn}
          >
            <ChevronsRight size={16} />
          </button>
        </div>

        {/* Page-size selector */}
        {showPageSize && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-slate-400">Per page</span>
            <select
              value={limit}
              disabled={isPending}
              onChange={(e) => changeLimit(Number(e.target.value))}
              className="h-9 rounded-lg border border-white/10 bg-white/5 px-2 text-sm text-slate-200
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer
                         hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {pageSizes.map((s) => (
                <option key={s} value={s} className="bg-slate-900">
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </>
  );
};

export default Pagination;
