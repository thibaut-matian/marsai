import { Trash2, Upload, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import getAPI from '../../services/getAPI';

export default function JuryModal({ jury, onClose, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    mail: '',
    mobile: '',
    role: 'jury',
    profile_picture: null,
    profile_picture_preview: null,
    profession: '',
    is_active: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [pictureError, setPictureError] = useState('');

  const isEditMode = !!jury;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        firstname: jury.firstname || '',
        lastname: jury.lastname || '',
        mail: jury.mail || '',
        mobile: jury.mobile || '',
        role: jury.role?.name || 'jury',
        profession: jury.profession || '',
        profile_picture: null,
        profile_picture_preview: jury.profile_picture_url || null,
        is_active: jury.is_active ?? true,
      });
    }
  }, [jury, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== undefined) payload.append(key, val);
      });
      if (isEditMode) {
        await getAPI.updateJury(jury.id, payload);
      } else {
        await getAPI.inviteJury(payload);
      }
      onUpdate();
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-gray-900 border border-white/20 rounded-2xl max-w-lg w-full shadow-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto mb-20 md:mb-0">
        <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm p-4 sm:p-6 flex justify-between items-center border-b border-white/10 z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User /> {isEditMode ? 'Modifier le Jury' : 'Inviter un Jury'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X /></button>
        </header>

        <form onSubmit={handleFormSubmit} className="p-4 sm:p-6 space-y-4">
          {errorMessage && <p className="text-red-400 bg-red-500/10 p-3 rounded-lg">{errorMessage}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstname" className="block text-sm text-white/70 mb-2">Prénom</label>
              <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleInputChange} required className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white" />
            </div>
            <div>
              <label htmlFor="lastname" className="block text-sm text-white/70 mb-2">Nom</label>
              <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleInputChange} required className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white" />
            </div>
          </div>

          <div>
            <label htmlFor="profession" className="block text-sm text-white/70 mb-2">Profession</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              placeholder="ex: Développeur Full Stack"
              className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white"
            />
          </div>

          <div>
            <label htmlFor="mail" className="block text-sm text-white/70 mb-2">Email</label>
            <input type="email" id="mail" name="mail" value={formData.mail} onChange={handleInputChange} required disabled={isEditMode} className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white disabled:opacity-50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobile" className="block text-sm text-white/70 mb-2">Mobile</label>
              <input type="tel" id="mobile" maxLength="13" name="mobile" value={formData.mobile} onChange={handleInputChange} className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white" />
            </div>
            <div>
            </div>
          </div>

          <div>
            <label className="block text-sm text-white/70 mb-2">
              Photo de profil <span className="text-white/40 font-normal">(PNG ou JPEG — min. 288×384px)</span>
            </label>
            <label htmlFor="profile_picture" className="flex items-center gap-3 cursor-pointer w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white/50 hover:border-white/40 transition-colors">
              <Upload size={18} />
              <span className="text-sm truncate">
                {formData.profile_picture ? formData.profile_picture.name : 'Choisir une image...'}
              </span>
              <input
                type="file"
                id="profile_picture"
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const objectUrl = URL.createObjectURL(file);
                  const img = new Image();
                  img.onload = () => {
                    if (img.width < 288 || img.height < 384) {
                      URL.revokeObjectURL(objectUrl);
                      setPictureError(`L'image doit faire au minimum 288×384px. La vôtre fait ${img.width}×${img.height}px.`);
                      e.target.value = '';
                      return;
                    }
                    setPictureError('');
                    // Recadrage "cover" centré sur 288×384
                    const canvas = document.createElement('canvas');
                    canvas.width = 288;
                    canvas.height = 384;
                    const ctx = canvas.getContext('2d');
                    const srcRatio = img.width / img.height;
                    const dstRatio = 288 / 384;
                    let sx, sy, sw, sh;
                    if (srcRatio > dstRatio) {
                      sh = img.height; sw = sh * dstRatio;
                      sx = (img.width - sw) / 2; sy = 0;
                    } else {
                      sw = img.width; sh = sw / dstRatio;
                      sx = 0; sy = (img.height - sh) / 2;
                    }
                    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, 288, 384);
                    const preview = canvas.toDataURL(file.type);
                    canvas.toBlob((blob) => {
                      const resizedFile = new File([blob], file.name, { type: file.type });
                      setFormData(prev => ({ ...prev, profile_picture: resizedFile, profile_picture_preview: preview }));
                    }, file.type);
                    URL.revokeObjectURL(objectUrl);
                  };
                  img.src = objectUrl;
                }}
              />
            </label>
            {pictureError && (
              <p className="text-red-400 text-xs mt-1 ml-3">{pictureError}</p>
            )}
            {formData.profile_picture_preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={formData.profile_picture_preview}
                  alt="Aperçu"
                  className="w-36 h-48 object-cover rounded-xl border border-white/20 shadow-lg"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <input type="checkbox" id="is_active" name="is_active" checked={formData.is_active} onChange={handleInputChange} className="w-5 h-5" />
            <label htmlFor="is_active" className="text-sm text-white/70">Membre actif</label>
          </div>

          <footer className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            {isEditMode && (
              <button type="button" onClick={() => onDelete(jury.id)} className="px-4 py-3 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2">
                <Trash2 size={18} /> Supprimer
              </button>
            )}
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
              {isSubmitting
                ? (isEditMode ? 'Mise à jour...' : "En cours d'envoi d'invitation...")
                : (isEditMode ? 'Mettre à jour' : "Envoyer l'invitation")
              }
            </button>
          </footer>
        </form>
      </div>
    </aside>
  );
}