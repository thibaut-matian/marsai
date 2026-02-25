import { useRef } from 'react';
import GalleryCard from '../components/features/movies/GalleryCard';
import { GalleryEmpty, GalleryError, GalleryLoading } from '../components/features/movies/GalleryStates';
import ModalDetails from '../components/features/movies/ModalDetails';
import PaginationControls from '../components/pagination';
import useGallery from '../hooks/useGallery';
import useGalleryPagination from '../hooks/useGalleryPagination';

export default function Galerie() {
  const galleryTopRef = useRef(null);
  const { movies, loading, error, isModalOpen, selectedImage, openModal, closeModal } = useGallery();
  const { desktopCheckRef, currentImages, paginationData } = useGalleryPagination(movies, galleryTopRef);

  return (
    <div ref={galleryTopRef} className="flex flex-col w-full bg-black">
      <span ref={desktopCheckRef} className="hidden md:block" aria-hidden="true"></span>
      
      <h1 className="text-4xl font-bold text-center mt-30 text-white">Galerie</h1>
      <p className="text-center text-lg mt-4 text-gray-300">
        Découvrez les moments forts du festival à travers notre galerie de photos et de vidéos.
      </p>

      {loading && <GalleryLoading />}
      {error && <GalleryError message={error} />}
      {!loading && !error && movies.length === 0 && <GalleryEmpty />}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid mr-8 ml-8 grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10 px-4">
            {currentImages.map((image) => (
              <GalleryCard key={image.id} image={image} onClick={openModal} />
            ))}
          </div>

          <div className="flex justify-center mb-10">
            <PaginationControls pagination={paginationData} />
          </div>
        </>
      )}

      {isModalOpen && selectedImage && (
        <ModalDetails 
          movieId={selectedImage.id}
          isOpen={isModalOpen} 
          onClose={closeModal}
        />
      )}
    </div>
  );
}