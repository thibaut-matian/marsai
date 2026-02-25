import { useEffect, useRef, useState } from 'react';
import useResponsiveImages from './useResponsiveImages';

export default function useGalleryPagination(movies, galleryTopRef) {
  const [currentPage, setCurrentPage] = useState(1);
  const desktopCheckRef = useRef(null);
  const { isDesktop, imagesPerPage } = useResponsiveImages(desktopCheckRef, movies.length, setCurrentPage);

  const getPageSizes = (total) => {
    const per = isDesktop ? 9 : (imagesPerPage || 5);
    const pages = Math.ceil(total / per);
    return Array.from({ length: pages }, (_, i) => (i < pages - 1 ? per : total - per * (pages - 1)));
  };

  const pageSizes = getPageSizes(movies.length);
  const totalPages = pageSizes.length;

  const startIndex = pageSizes.slice(0, currentPage - 1).reduce((s, v) => s + v, 0);
  const currentImages = movies.slice(startIndex, startIndex + (pageSizes[currentPage - 1] || 0));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(Math.max(1, prev), Math.max(1, totalPages)));
  }, [totalPages]);

  const generatePageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      requestAnimationFrame(() => {
        const el = galleryTopRef.current;
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  };

  const paginationData = {
    currentPage,
    totalPages,
    paginate,
    pageNumbers: generatePageNumbers(),
    indexOfFirstItem: startIndex + 1,
    indexOfLastItem: startIndex + currentImages.length,
    totalItems: movies.length,
  };

  return {
    desktopCheckRef,
    currentImages,
    paginationData,
  };
}
