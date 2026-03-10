import { useEffect, useState } from 'react';
import iaList from '../constants/iaList';
import getAPI from '../services/getAPI';

// Fonction pour extraire les IAs mentionnées dans la description
const extractIAs = (iaDescription) => {
  if (!iaDescription) return [];
  return iaList.filter(ia => 
    iaDescription.toLowerCase().includes(ia.toLowerCase())
  );
};

// Fonction pour extraire l'ID YouTube
const getYouTubeId = (url) => {
  const match = url?.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?]+)/);
  return match ? match[1] : null;
};

// Fonction pour mapper les données de la BDD vers le format du composant
const mapMovieData = (dbMovie) => {
  if (!dbMovie) return null;
  
  return {
    id: dbMovie.id,
    url: dbMovie.youtube_id ? `https://www.youtube.com/watch?v=${dbMovie.youtube_id}` : null,
    youtube_id: dbMovie.youtube_id,
    title_vo: dbMovie.vo_title,
    title_en: dbMovie.en_title,
    rating: dbMovie.rating || null, // À ajouter si disponible
    duration: dbMovie.duration,
    genres: dbMovie.genres || 'Non spécifié',
    synopsis_vo: dbMovie.vo_desc,
    synopsis_en: dbMovie.en_desc,
    ia: dbMovie.ia_used,
    real_lastname: dbMovie.lastname,
    real_firstname: dbMovie.firstname,
    actual_job: dbMovie.actual_job,
    poster: dbMovie.poster_url,
    // Mapper les screenshots: extraire uniquement les URLs
    screenshots: dbMovie.screenshots?.map(s => s.url) || [],
    country: dbMovie.country,
    language: dbMovie.language,
    // Mapper les socials: formater avec platform name et url
    socials: dbMovie.socials?.map(s => ({
      platform: s.platform?.name || 'Unknown',
      url: s.social_url
    })) || [],
  };
};

export const useMovieDetails = (movieId) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setError('Aucun ID de film fourni');
      return;
    }

    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAPI.getMovieDetails(movieId);
        const mappedData = mapMovieData(response.data.movie);
        setMovieData(mappedData);
      } catch (err) {
        console.error('Erreur lors de la récupération du film:', err);
        setError(err.response?.data?.message || 'Erreur lors du chargement du film');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  const detectedIAs = extractIAs(movieData?.ia);
  const youtubeId = movieData?.youtube_id || getYouTubeId(movieData?.url);

  const toggleVideo = () => setShowVideo(!showVideo);
  const toggleGallery = () => setIsGalleryOpen(!isGalleryOpen);

  return {
    movieData,
    loading,
    error,
    showVideo,
    setShowVideo,
    toggleVideo,
    detectedIAs,
    youtubeId,
    isGalleryOpen,
    setIsGalleryOpen,
    toggleGallery
  };
};