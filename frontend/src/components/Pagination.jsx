import React from "react";

function Pagination({ page, setPage, totalPages }) {
  const safeTotalPages =
    Number.isFinite(totalPages) && totalPages > 0 ? totalPages : 1;

  if (safeTotalPages <= 1) return null;

  const start = Math.max(1, page - 2);
  const end = Math.min(safeTotalPages, start + 4);
  const adjustedStart = Math.max(1, end - 4);

  const pages = Array.from(
    { length: end - adjustedStart + 1 },
    (_, i) => adjustedStart + i
  );

  const arrowBtn =
    "flex items-center justify-center w-8 h-8 rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-blue-600 disabled:cursor-not-allowed transition-colors duration-150";

  return (
    <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-t-blue-600 pt-3">
      {/* Mobile: simple page readout */}
      <span className="sm:hidden text-[13px] text-blue-600">
        Page {page} of {safeTotalPages}
      </span>

      <div className="flex items-center gap-1">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className={arrowBtn}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Numbered pages: hidden on very small screens to keep things tidy */}
        <div className="hidden sm:flex items-center gap-1">
          {adjustedStart > 1 && (
            <>
              <button
                onClick={() => setPage(1)}
                className="w-8 h-8 rounded-md text-[13px] font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
              >
                1
              </button>
              <span className="text-blue-300 text-[13px] px-0.5 select-none">…</span>
            </>
          )}

          {pages.map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              aria-current={p === page ? "page" : undefined}
              className={`w-8 h-8 rounded-md text-[13px] font-medium transition-colors duration-150 ${
                p === page
                  ? "bg-blue-600 text-white"
                  : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              {p}
            </button>
          ))}

          {end < safeTotalPages && (
            <>
              <span className="text-blue-300 text-[13px] px-0.5 select-none">…</span>
              <button
                onClick={() => setPage(safeTotalPages)}
                className="w-8 h-8 rounded-md text-[13px] font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150"
              >
                {safeTotalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page === safeTotalPages}
          aria-label="Next page"
          className={arrowBtn}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Pagination;