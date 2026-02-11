import { useState } from 'react';

export default function Galerie() {
  // Données simulées : 50 images (10 pages × 5 images)
  const images = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    src: "./public/Port.png",
    title: `Titre de l'image ${i + 1}`,
  }));

  // État pour la page active
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 5;

  // Calcul des images à afficher pour la page actuelle
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = images.slice(startIndex, startIndex + imagesPerPage);

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(images.length / imagesPerPage);

  // Fonction pour changer de page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col w-full bg-black min-h-screen">
      <h1 className="text-4xl font-bold text-center mt-10">Galerie</h1>
      <p className="text-center text-lg mt-4">
        Découvrez les moments forts du festival à travers notre galerie de photos et de vidéos.
      </p>

      {/* Galerie d'images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 px-4">
        {currentImages.map((image) => (
          <div key={image.id} className="bg-white/10 rounded-lg shadow-md overflow-hidden backdrop-blur-sm">
            <div className="p-3 bg-black/30 border-b border-white/20">
              <h3 className="text-white text-lg font-semibold text-center">{image.title}</h3>
            </div>
            <div className="h-64 flex items-center justify-center bg-gray-200">
              <img
                src={image.src}
                alt={`Photo ${image.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="join flex justify-center mt-8">
        <button
          className="join-item btn"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`join-item btn ${currentPage === i + 1 ? 'btn-active' : ''}`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="join-item btn"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}
