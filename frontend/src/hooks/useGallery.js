import { useEffect, useState } from 'react';
import getAPI from '../services/getAPI';

export default function useGallery() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAPI.getAllMovies({ is_selected: 1 });
        const moviesData = response.data.movies || [];
        
        const mappedMovies = moviesData.map(movie => ({
          id: movie.id,
          src: movie.poster_url || './Port.png',
          title: movie.vo_title,
          director: `${movie.firstname} ${movie.lastname}`,
          country: movie.country,
        }));
        
        setMovies(mappedMovies);
      } catch (err) {
        console.error('Erreur lors du chargement des films:', err);
        setError('Impossible de charger la galerie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    movies,
    loading,
    error,
    isModalOpen,
    selectedImage,
    openModal,
    closeModal,
  };
}
