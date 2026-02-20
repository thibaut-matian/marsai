import { useState, useEffect } from 'react';
import { X, Save, Trash2, User } from 'lucide-react';
import { juryService } from '../../services/juryService';

export default function JuryModal({ jury, onClose, onUpdate, onDelete }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    role: 'jury',
    isActive: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isEditMode = !!jury;

  // --- NOUVEAU : Effet pour bloquer le scroll de la page ---
  useEffect(() => {
    // Bloque le scroll du body quand le composant est monté
    document.body.style.overflow = 'hidden';

    // Rétablit le scroll quand le composant est démonté
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []); // Le tableau vide assure que cet effet ne s'exécute qu'une seule fois

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        firstname: jury.firstname || '',
        lastname: jury.lastname || '',
        email: jury.email || '',
        mobile: jury.mobile || '',
        role: jury.role || 'jury',
        isActive: jury.isActive ?? true,
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
      if (isEditMode) {
        await juryService.update(jury.id, formData);
      } else {
        await juryService.invite(formData);
      }
      onUpdate(); // Appelle la fonction pour rafraîchir la liste et fermer le modal
    } catch (error) {
      setErrorMessage(error.message || 'Une erreur est survenue.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    // --- MODIFICATION : Changement de 'items-center' à 'items-end md:items-center' ---
    <aside 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* --- MODIFICATION : Ajustement de la hauteur et de la marge --- */}
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
            <label htmlFor="email" className="block text-sm text-white/70 mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required disabled={isEditMode} className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white disabled:opacity-50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="mobile" className="block text-sm text-white/70 mb-2">Mobile</label>
              <input type="tel" id="mobile" maxLength="13" name="mobile" value={formData.mobile} onChange={handleInputChange}
               className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm text-white/70 mb-2">Rôle</label>
              <select id="role" name="role" value={formData.role} onChange={handleInputChange} className="w-full p-3 bg-black/30 border border-white/20 rounded-lg text-white">
                <option value="jury">Jury</option>
                <option value="jury_senior">Jury Senior</option>
                <option value="jury_president">Président du Jury</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <input type="checkbox" id="isActive" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-5 h-5" />
            <label htmlFor="isActive" className="text-sm text-white/70">Membre actif</label>
          </div>

          <footer className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/10">
            {isEditMode && (
              <button type="button" onClick={() => onDelete(jury.id)} className="px-4 py-3 bg-red-600 text-white font-bold rounded-lg flex items-center justify-center gap-2">
                <Trash2 size={18} /> Supprimer
              </button>
            )}
            <button type="submit" disabled={isSubmitting} className="flex-1 px-4 py-3 bg-blue-600 text-white font-bold rounded-lg flex items-center justify-center gap-2 disabled:opacity-50">
              <Save size={18} /> {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </footer>
        </form>
      </div>
    </aside>
  );
}