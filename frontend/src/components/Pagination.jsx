import React from "react";

function Pagination({ page, setPage }) {
  // Build a small window of page numbers around the current page
  const start = Math.max(1, page - 2);
  const pages = Array.from({ length: 5 }, (_, i) => start + i).filter((p) => p >= 1);

  return (
    <div className="flex justify-end">
      <div className="inline-flex items-center gap-1">
        {start > 1 && (
          <>
            <button
              onClick={() => setPage(1)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-[13px] font-medium text-[#5C7A7D] hover:bg-[#F4FBFB] hover:text-[#2E9DA9] transition-colors duration-200"
            >
              1
            </button>
            <span className="text-[#9FB3B5] text-[13px] px-0.5">…</span>
          </>
        )}

        {pages.map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`flex items-center justify-center w-8 h-8 rounded-lg text-[13px] font-medium transition-colors duration-200 ${
              p === page
                ? "bg-[#2E9DA9] text-white"
                : "text-[#5C7A7D] hover:bg-[#F4FBFB] hover:text-[#2E9DA9]"
            }`}
          >
            {p}
          </button>
        ))}

        {/* Prev / Next arrows together, after the numbers */}
        <div className="flex items-center gap-1 ml-2 pl-2 border-l border-[#DCE9EA]">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-[#5C7A7D] hover:bg-[#F4FBFB] hover:text-[#2E9DA9] disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          <button
            onClick={() => setPage(page + 1)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-[#5C7A7D] hover:bg-[#F4FBFB] hover:text-[#2E9DA9] transition-colors duration-200"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;