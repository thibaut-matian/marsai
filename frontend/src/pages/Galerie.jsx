import { useState, useEffect, useRef } from 'react';
import PaginationControls from '../components/pagination';
import { Flag } from 'lucide-react';
import { countryCodes, getFlagClass } from '../constants/countryCodes';
import useResponsiveImages from '../hooks/useResponsiveImages';

export default function Galerie() {
  // Données simulées : 50 images (10 pages × 5 images)
  // Liste des noms de pays disponibles pour assignation aléatoire
  const countryNames = Object.keys(countryCodes);

  const images = Array.from({ length: 50 }, (_, i) => {
    const randomCountry = countryNames[Math.floor(Math.random() * countryNames.length)];
    return {
      id: i + 1,
      src: "./Port.png",
      title: `Titre de l'image ${i + 1}`,
      director: `Réalisateur ${i + 1}`,
      country: randomCountry,
    };
  });

  // État pour la page active
  const [currentPage, setCurrentPage] = useState(1);
  const desktopCheckRef = useRef(null);
  const galleryTopRef = useRef(null);
  const { isDesktop, imagesPerPage } = useResponsiveImages(desktopCheckRef, images.length, setCurrentPage);

  // Détection responsive basée sur les classes Tailwind :
  // on place un élément `hidden md:block` et on lit sa visibilité au montage.
  // responsive detection moved to useResponsiveImages hook

  // Construire les tailles de page selon le mode (mobile simple, desktop: N par page)
  const getPageSizes = (total) => {
    const per = isDesktop ? 9 : (imagesPerPage || 5);
    const pages = Math.ceil(total / per);
    return Array.from({ length: pages }, (_, i) => (i < pages - 1 ? per : total - per * (pages - 1)));
  };

  const pageSizes = getPageSizes(images.length);
  const totalPages = pageSizes.length;

  // Calcul des images à afficher pour la page actuelle (en sommant les tailles précédentes)
  const startIndex = pageSizes.slice(0, currentPage - 1).reduce((s, v) => s + v, 0);
  const currentImages = images.slice(startIndex, startIndex + (pageSizes[currentPage - 1] || 0));

  // Clamp currentPage if totalPages changed
  useEffect(() => {
    setCurrentPage((prev) => Math.min(Math.max(1, prev), Math.max(1, totalPages)));
  }, [totalPages]);

  // Générer les numéros de pages
  const generatePageNumbers = () => {
    // Return all page numbers so navigation shows 1..totalPages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  // Fonction pour changer de page
  const paginate = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // smooth scroll to gallery top
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
  <div ref={galleryTopRef} className="flex flex-col w-full bg-black">
    {/* élément de détection CSS : visible seulement >= md */}
    <span ref={desktopCheckRef} className="hidden md:block" aria-hidden="true"></span>
    <h1 className="text-4xl font-bold text-center mt-[7.5rem] text-white">Galerie</h1>
    <p className="text-center text-lg mt-4 text-gray-300">
      Découvrez les moments forts du festival à travers notre galerie de photos et de vidéos.
    </p>



{/* Galerie d'images */}
    <div className="grid mr-8 ml-8 grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10 px-4">
      {currentImages.map((image) => (
        <div key={image.id} className="rounded-lg shadow-md overflow-hidden bg-white/5 relative">
          {/* Conteneur de l'image avec flou localisé */}
          <div className="h-64 flex items-center justify-center bg-gray-100 relative">
            {/* Flou localisé sur le coin supérieur gauche */}
            <div className="absolute top-0 left-0 w-20 h-20
                            backdrop-blur-md bg-white/10
                            rounded-br-full pointer-events-none"></div>

            {/* Image */}
            <img
              src={image.src}
              alt={`Photo ${image.id}`}
              className="w-full h-full object-cover"
            />

            {/* Bandeau bas semi-transparent avec titre / réal. et drapeau */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white backdrop-blur-sm flex items-center justify-between px-3 py-2">
              <div>
                <h3 className="text-base font-medium">{image.title}</h3>
                {image.director && (
                  <h4 className="text-sm text-gray-200 mt-0.5">{image.director}</h4>
                )}
              </div>
              <div className="ml-2">
                {image.country ? (
                  <i
                    className={`${getFlagClass(image.country)} inline-block w-5 h-5`}
                    aria-hidden="true"
                    title={image.country}
                  />
                ) : (
                  <Flag className="h-5 w-5 text-white/90" />
                )}
              </div>
            </div>
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