// Example Pagination component (implement to suit your UI needs)
export const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex gap-2 justify-center">
    {Array.from({ length: totalPages }).map((_, idx) => {
      const page = idx + 1;
      return (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={[
            "px-3 py-1 rounded",
            page === currentPage
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-200 text-blue-700 hover:bg-blue-300",
          ].join(" ")}
        >
          {page}
        </button>
      );
    })}
  </div>
);
