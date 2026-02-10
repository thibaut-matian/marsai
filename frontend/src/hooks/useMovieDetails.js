import { useState } from 'react';
import iaList from '../constants/iaList';

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

export const useMovieDetails = (movie) => {
  const [showVideo, setShowVideo] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const detectedIAs = extractIAs(movie?.ia);
  const youtubeId = getYouTubeId(movie?.url);

  const toggleVideo = () => setShowVideo(!showVideo);
  const toggleGallery = () => setIsGalleryOpen(!isGalleryOpen);

  return {
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