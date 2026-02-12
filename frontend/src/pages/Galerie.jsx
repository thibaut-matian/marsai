import { useState, useEffect } from 'react';
import PaginationControls from '../components/pagination';

export default function Galerie() {
  // Données simulées : 50 images (10 pages × 5 images)
  const images = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    src: "./public/Port.png",
    title: `Titre de l'image ${i + 1}`,
    director: `Réalisateur ${i + 1}`,
  }));

  // État pour la page active
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage, setImagesPerPage] = useState(5);

  // Met à jour `imagesPerPage` selon la taille de l'écran (mobile-first)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = (matches) => {
      const newPer = matches ? 10 : 5;
      setImagesPerPage(newPer);
      const newTotal = Math.ceil(images.length / newPer);
      setCurrentPage((prev) => Math.min(prev, newTotal));
    };
    update(mq.matches);
    if (mq.addEventListener) mq.addEventListener('change', (e) => update(e.matches));
    else mq.addListener((e) => update(e.matches));
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', (e) => update(e.matches));
      else mq.removeListener((e) => update(e.matches));
    };
  }, [images.length]);

  // Calcul des images à afficher pour la page actuelle
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Générer les numéros de pages avec ellipsis (...)
  const generatePageNumbers = () => {
    const maxVisible = 5;
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, '...', totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  // Fonction pour changer de page
  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Préparer les données pour le composant de pagination
  const paginationData = {
    currentPage,
    totalPages,
    paginate,
    pageNumbers: generatePageNumbers(),
    indexOfFirstItem: startIndex + 1,
    indexOfLastItem: startIndex + currentImages.length,
    totalItems: images.length,
  };

return (
  <div className="flex flex-col w-full bg-black">
    <h1 className="text-4xl font-bold text-center mt-[7.5rem] text-white">Galerie</h1>
    <p className="text-center text-lg mt-4 text-gray-300">
      Découvrez les moments forts du festival à travers notre galerie de photos et de vidéos.
    </p>

    {/* Galerie d'images */}
    <div className="grid mr-8 ml-8 grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10 px-4">
      {currentImages.map((image) => (
        <div key={image.id} className="rounded-lg shadow-md overflow-hidden bg-white/5">
          {/* Div avec effet "liquid glass" minimaliste */}
          <div className="p-3 border-b border-white/10
                          text-white">
            <h3 className="text-lg font-medium">{image.title}</h3>
            {image.director && (
              <h4 className="text-sm text-gray-300 mt-1">{image.director}</h4>
            )}
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-100">
            <img
              src={image.src}
              alt={`Photo ${image.id}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>

    {/* Composant Pagination */}
    <div className="flex justify-center mb-10">
      <PaginationControls pagination={paginationData} />
    </div>
  </div>
);
}