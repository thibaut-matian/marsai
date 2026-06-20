import { useState, useRef } from 'react';
import { Upload, X, Play } from 'lucide-react';
import axios from 'axios';

export default function VideoUpload({ currentVideoUrl, onUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentVideoUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Vérifier le type
    if (!file.type.startsWith('video/')) {
      setError('Veuillez sélectionner un fichier vidéo');
      return;
    }

    // Vérifier la taille (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB en bytes
    if (file.size > maxSize) {
      setError('La vidéo ne doit pas dépasser 100MB');
      return;
    }

    setError('');
    setSelectedFile(file);
    
    // Créer une preview
    const videoUrl = URL.createObjectURL(file);
    setPreview(videoUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('folder', 'hero');

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/'}upload/video`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          },
        }
      );

      // URL de la vidéo uploadée sur Scaleway
      const uploadedUrl = response.data.url;
      
      onUploadComplete(uploadedUrl);
      setPreview(uploadedUrl);
      setSelectedFile(null);
      setUploadProgress(0);

    } catch (err) {
      console.error('Erreur upload:', err);
      setError('Erreur lors de l\'upload. Réessayez.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreview(currentVideoUrl);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Zone de preview */}
      {preview && (
        <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
          <video
            src={preview}
            controls
            className="w-full h-full object-contain"
          >
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      )}

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Boutons */}
      <div className="flex gap-3">
        {!selectedFile ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            <Upload size={18} />
            Choisir une vidéo
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded transition-colors disabled:opacity-50"
            >
              <Upload size={18} />
              {uploading ? `Upload ${uploadProgress}%` : 'Uploader'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition-colors disabled:opacity-50"
            >
              <X size={18} />
              Annuler
            </button>
          </>
        )}
      </div>

      {/* Barre de progression */}
      {uploading && (
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300"
            style={{ width: `${uploadProgress}%` }}
          />
        </div>
      )}

      {/* Messages d'erreur */}
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {/* Info file */}
      {selectedFile && (
        <div className="text-sm text-gray-400">
          <p>Fichier: {selectedFile.name}</p>
          <p>Taille: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}