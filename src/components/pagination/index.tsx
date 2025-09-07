import React from "react";

interface PaginationProps {
  currentPage: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void; // 👈 new prop
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  total,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(total / limit);

  const createPageList = () => {
    const pages: (number | string)[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i <= 2 ||
        i > totalPages - 2 ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === 3 && currentPage > 4) {
        pages.push("...");
      } else if (i === totalPages - 2 && currentPage < totalPages - 3) {
        pages.push("...");
      }
    }

    return [...new Set(pages)];
  };

  const pageList = createPageList();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 px-5 py-4 dark:border-gray-800 gap-3">
      {/* Showing items */}
      <div className="pb-3 sm:pb-0">
        <span className="block text-sm font-medium text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="text-gray-800 dark:text-white/90">
            {(currentPage - 1) * limit + 1}
          </span>{" "}
          to{" "}
          <span className="text-gray-800 dark:text-white/90">
            {Math.min(currentPage * limit, total)}
          </span>{" "}
          of <span className="text-gray-800 dark:text-white/90">{total}</span>
        </span>
      </div>

      {/* Limit select + Pagination */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Limit selector */}
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="rounded border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
        >
          {[10, 20, 50, 100].map((opt) => (
            <option key={opt} value={opt}>
              {opt} / page
            </option>
          ))}
        </select>

        {/* Pagination buttons */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
          >
            Prev
          </button>

          {/* Page numbers */}
          {pageList.map((page, idx) =>
            page === "..." ? (
              <span key={idx} className="px-2 py-1 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(Number(page))}
                className={`px-3 py-1 rounded border text-sm font-medium ${
                  page === currentPage
                    ? "bg-brand-500 text-white border-brand-500"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-brand-500 hover:text-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200"
                }`}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/5"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
