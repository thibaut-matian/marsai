import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import axios from 'axios';

export default function ImageUpload({ currentImageUrl, onUploadComplete, label = "Image" }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(currentImageUrl);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      setError('Veuillez sélectionner un fichier image');
      return;
    }

    // Vérifier la taille (50MB max)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('L\'image ne doit pas dépasser 50MB');
      return;
    }

    setError('');
    setSelectedFile(file);
    
    // Créer une preview
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);
      setError('');

      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('folder', 'jury');

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/'}upload/image`,
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

      // URL de l'image uploadée sur Scaleway
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
    setPreview(currentImageUrl);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">{label}</label>

      {/* Zone de preview */}
      <div className="relative w-full h-48 bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-500 flex flex-col items-center gap-2">
            <ImageIcon size={40} />
            <span className="text-sm">Aucune image</span>
          </div>
        )}
      </div>

      {/* Input file caché */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Boutons */}
      <div className="flex gap-2">
        {!selectedFile ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
          >
            <Upload size={16} />
            Choisir une image
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleUpload}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors disabled:opacity-50"
            >
              <Upload size={16} />
              {uploading ? `${uploadProgress}%` : 'Uploader'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              disabled={uploading}
              className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors disabled:opacity-50"
            >
              <X size={16} />
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
        <div className="text-xs text-gray-400">
          {selectedFile.name} ({(selectedFile.size / (1024 * 1024)).toFixed(2)} MB)
        </div>
      )}
    </div>
  );
}