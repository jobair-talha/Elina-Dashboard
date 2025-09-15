import React from "react";

interface PaginationProps {
  totalItems: number;
  currentPage: number;
  limit: number;
  onPageChange: (page: number) => void;
}

const SmallPagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  limit,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / limit);

  const getPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all if small number of pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first & last page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("..");
      }

      // Pages around current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("..");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex space-x-2 mt-4">
      {getPagination().map((page, idx) => (
        <button
          key={idx}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === ".."}
          className={`px-3 py-1 rounded-md border ${
            page === currentPage
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          } ${page === ".." ? "cursor-default text-gray-400" : ""}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default SmallPagination;
