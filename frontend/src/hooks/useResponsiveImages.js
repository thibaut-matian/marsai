import { useState, useEffect } from 'react';

export default function useResponsiveImages(desktopRef, imagesLength, setCurrentPage) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [imagesPerPage, setImagesPerPage] = useState(5);

  useEffect(() => {
    const detected = desktopRef && desktopRef.current && desktopRef.current.offsetParent !== null;
    setIsDesktop(detected);
    const newPer = detected ? 9 : 5;
    setImagesPerPage(newPer);
    if (typeof setCurrentPage === 'function') {
      const newTotal = Math.ceil(imagesLength / newPer) || 1;
      setCurrentPage((prev) => Math.min(prev, newTotal));
    }
  }, [desktopRef, imagesLength, setCurrentPage]);

  return { isDesktop, imagesPerPage };
}
