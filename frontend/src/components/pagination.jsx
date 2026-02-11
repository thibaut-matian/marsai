import React from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react";

const PaginationControls = ({ pagination }) => {
  const { currentPage, totalPages, paginate, pageNumbers, indexOfFirstItem, indexOfLastItem, totalItems } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-black/20 border-t border-white/10 gap-4">
      <span className="text-sm text-gray-500 italic">
        <span className="text-white font-medium">{Math.min(indexOfLastItem, totalItems)}</span> sur{" "}
        <span className="text-white font-medium">{totalItems}</span>
      </span>
      
      {/* Groupement DaisyUI */}
      <div className="join border border-white/10 shadow-lg">
        <button 
          className="join-item btn btn-sm bg-[#1E1E24] hover:bg-blue-600 border-none text-white disabled:bg-gray-800"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((page, index) => (
          <button
            key={index}
            onClick={() => page !== '...' && paginate(page)}
            className={`join-item btn btn-sm border-none ${
              page === currentPage 
                ? "bg-blue-600 text-white hover:bg-blue-700" 
                : "bg-[#1E1E24] text-gray-400 hover:bg-white/10"
            } ${page === '...' ? "btn-disabled opacity-50" : ""}`}
          >
            {page}
          </button>
        ))}

        <button 
          className="join-item btn btn-sm bg-[#1E1E24] hover:bg-blue-600 border-none text-white disabled:bg-gray-800"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaginationControls;