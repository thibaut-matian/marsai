import { useState } from 'react';

export default function usePagination(data, itemsPerPage = 20) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const delta = 1; 

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        pages.push(i);
      } else if (i === currentPage - delta - 1 || i === currentPage + delta + 1) {
        pages.push('...');
      }
    }
    return pages.filter((item, index) => pages.indexOf(item) === index);
  };

  return {
    currentPage,
    totalPages,
    currentItems,
    indexOfFirstItem,
    indexOfLastItem,
    paginate,
    totalItems: data.length,
    pageNumbers: getPageNumbers()
  };
}