import { useState } from 'react';

export default function Submission() {
// --- 1. STATE ---
const [step, setStep] = useState(1);
const [errors, setErrors] = useState({}); // Stocke les erreurs
const [formData, setFormData] = useState({
  // IDENTITÉ
  civilite: 'M',
  lastname: '',
  firstname: '',
  birthdate: '',
  profession: '',
  
  // CONTACT
  email: '',
  telephone: '',
  mobile: '',
  address: '',
  zipcode: '',
  city: '',
  country: '',
  marketingSource: '',
  newsletter: false,

  // FILM
  filmUrl: '',
  filmTitleOriginal: '',
  filmTitleEN: '',
  filmDuration: '',
  filmLanguage: 'FR',
  
  // IA & TECH
  aiClassification: '',
  aiStack: '',
  aiMethodology: '',

  // DETAILS
  synopsisFR: '',
  synopsisEN: '',
  directorNoteFR: '',
  directorNoteEN: '',
  hasSubtitlesEN: false,
  hasSubtitlesFR: false,
  tags: ''
});

// --- 2. FONCTIONS DE GESTION ---
const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  
  // Nettoyer l'erreur quand l'utilisateur commence à corriger
  if (errors[name]) {
    setErrors(prev => ({ ...prev, [name]: null }));
  }

  // Limite 500 caractères pour les champs IA [cite: 27, 28]
  if ((name === 'aiStack' || name === 'aiMethodology') && value.length > 500) return;

  const val = type === 'checkbox' ? checked : value;
  setFormData(prev => ({ ...prev, [name]: val }));
};

const setCustomValue = (key, value) => {
  setFormData(prev => ({ ...prev, [key]: value }));
  if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
};

const isAdult = (dateString) => {
  if (!dateString) return false;
  const birth = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age >= 18;
};

// --- 3. LOGIQUE DE VALIDATION (CŒUR DU SYSTÈME) ---
const validateStep = (currentStep) => {
  let newErrors = {};
  let isValid = true;

  // VALIDATION ÉTAPE 1 : Identité [cite: 7, 8, 10]
  if (currentStep === 1) {
    if (!formData.lastname.trim()) newErrors.lastname = "Le nom est requis.";
    if (!formData.firstname.trim()) newErrors.firstname = "Le prénom est requis.";
    if (!formData.profession.trim()) newErrors.profession = "Votre métier est requis.";
    
    if (!formData.birthdate) {
      newErrors.birthdate = "Date de naissance requise.";
    } else if (!isAdult(formData.birthdate)) {
      newErrors.birthdate = "Vous devez être majeur pour participer.";
    }
  }

  // VALIDATION ÉTAPE 2 : Contact & Loc [cite: 9, 10, 12]
  if (currentStep === 2) {
    if (!formData.email.trim()) newErrors.email = "L'email est requis.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Format email invalide.";
    
    if (!formData.telephone.trim()) newErrors.telephone = "Téléphone requis.";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile requis.";
    
    if (!formData.address.trim()) newErrors.address = "Adresse requise.";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Code postal requis.";
    if (!formData.city.trim()) newErrors.city = "Ville requise.";
    if (!formData.country.trim()) newErrors.country = "Pays requis.";
    
    if (!formData.marketingSource) newErrors.marketingSource = "Merci de nous dire comment vous nous avez connus.";
  }

  // VALIDATION ÉTAPE 3 : Film & IA [cite: 16, 17, 18, 24, 27, 28, 30]
  if (currentStep === 3) {
    if (!formData.filmUrl.trim()) newErrors.filmUrl = "Le lien du film est obligatoire.";
    if (!formData.filmTitleOriginal.trim()) newErrors.filmTitleOriginal = "Titre original requis.";
    if (!formData.filmTitleEN.trim()) newErrors.filmTitleEN = "Titre anglais requis.";
    if (!formData.filmDuration) newErrors.filmDuration = "Durée requise.";
    
    if (!formData.aiClassification) newErrors.aiClassification = "Veuillez classifier votre usage de l'IA.";
    if (!formData.aiStack.trim()) newErrors.aiStack = "La liste des outils est requise.";
    if (!formData.aiMethodology.trim()) newErrors.aiMethodology = "La méthodologie est requise.";
  }

  // VALIDATION ÉTAPE 4 : Synopsis [cite: 21]
  if (currentStep === 4) {
    if (!formData.synopsisFR.trim()) newErrors.synopsisFR = "Synopsis français requis.";
    if (!formData.synopsisEN.trim()) newErrors.synopsisEN = "Synopsis anglais requis.";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    isValid = false;
    // Scroll automatique vers la première erreur (UX)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return isValid;
};

const handleNext = () => {
  if (validateStep(step)) {
    if (step < 4) setStep(step + 1);
    else {
      console.log("Données valides :", formData);
      alert("Dossier validé et envoyé ! ");
    }
  }
};

return (
  <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black text-white p-4 font-sans flex flex-col md:items-center md:justify-center md:py-20 font-light">
    
    <div className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
      
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">
          Candidature MarsAI
        </h1>
        <div className="flex gap-3 mb-3 px-2">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= num ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/20'}`}></div>
            ))}
        </div>
        <p className="text-right text-sm text-blue-200/70 font-medium tracking-wider">ÉTAPE {step} / 4</p>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="flex-1 min-h-[400px]">
        
        {/* --- ÉTAPE 1 --- */}
        {step === 1 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-white/90">Identité du Réalisateur</h2>
            
            <div>
              <label className="block text-sm text-blue-200/80 mb-3 ml-1">Civilité</label>
              <div className="flex bg-black/20 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm">
                {['M', 'Mme', 'Iel'].map((civ) => (
                  <button key={civ} type="button" onClick={() => setCustomValue('civilite', civ)} className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 ${formData.civilite === civ ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>{civ}</button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Nom *" name="lastname" value={formData.lastname} onChange={handleChange} error={errors.lastname} />
              <Input label="Prénom *" name="firstname" value={formData.firstname} onChange={handleChange} error={errors.firstname} />
            </div>

            <Input label="Date de Naissance *" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} error={errors.birthdate} />
            <Input label="Métier actuel *" name="profession" value={formData.profession} onChange={handleChange} placeholder="Réalisateur, Étudiant..." error={errors.profession} />
          </div>
        )}

        {/* --- ÉTAPE 2 --- */}
        {step === 2 && (
          <div className="space-y-8 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-6 text-white/90">Localisation & Contact</h2>
              <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Téléphone Fixe *" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} error={errors.telephone} />
                <Input label="Mobile *" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
              </div>

              <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm space-y-4">
                <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-2">ADRESSE POSTALE</h3>
                <Input label="Numéro et Rue *" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                <div className="grid grid-cols-2 gap-6">
                    <Input label="Code Postal *" name="zipcode" value={formData.zipcode} onChange={handleChange} error={errors.zipcode} />
                    <Input label="Ville *" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
                </div>
                <Input label="Pays *" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
              </div>

              <div>
                <label className="block text-sm text-blue-200/80 mb-2 ml-3 font-medium">Source *</label>
                <div className={`relative rounded-2xl ${errors.marketingSource ? 'border border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : ''}`}>
                  <select name="marketingSource" value={formData.marketingSource} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl bg-black/30 border border-white/10 text-white outline-none backdrop-blur-md appearance-none cursor-pointer">
                      <option className="bg-gray-900" value="">-- Comment avez-vous connu marsAI ? --</option>
                      <option className="bg-gray-900" value="socials">Réseaux Sociaux</option>
                      <option className="bg-gray-900" value="press">Presse</option>
                      <option className="bg-gray-900" value="other">Autre</option>
                  </select>
                </div>
                {errors.marketingSource && <p className="text-red-400 text-xs mt-1 ml-3 font-medium">{errors.marketingSource}</p>}
              </div>
          </div>
        )}

        {/* --- ÉTAPE 3 --- */}
        {step === 3 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-white/90">Le Film & L'IA</h2>

            <div className={`bg-white/5 p-5 rounded-3xl border backdrop-blur-sm shadow-inner ${errors.filmUrl ? 'border-red-500/50' : 'border-white/10'}`}>
                <label className="block text-sm text-blue-300 mb-3 font-bold tracking-wide">LIEN YOUTUBE / VIMEO *</label>
                <input type="url" name="filmUrl" value={formData.filmUrl} onChange={handleChange} placeholder="https://..." className="w-full h-14 px-6 rounded-2xl bg-black/30 border border-white/10 text-white outline-none mb-2 backdrop-blur-md" />
                {errors.filmUrl && <p className="text-red-400 text-xs mb-2">{errors.filmUrl}</p>}
                
                {getYoutubeId(formData.filmUrl) && (
                  <div className="rounded-2xl overflow-hidden border border-white/20 aspect-video relative bg-black mt-2">
                      <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${getYoutubeId(formData.filmUrl)}`} title="Preview" allowFullScreen className="absolute top-0 left-0"></iframe>
                  </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Titre Original *" name="filmTitleOriginal" value={formData.filmTitleOriginal} onChange={handleChange} error={errors.filmTitleOriginal} />
                <Input label="Titre Anglais *" name="filmTitleEN" value={formData.filmTitleEN} onChange={handleChange} error={errors.filmTitleEN} />
            </div>

            <div className="grid grid-cols-2 gap-6">
                <Input label="Durée (sec) *" name="filmDuration" type="number" value={formData.filmDuration} onChange={handleChange} error={errors.filmDuration} />
                <div>
                    <label className="block text-sm text-blue-200/80 mb-2 ml-1">Langue *</label>
                    <select name="filmLanguage" value={formData.filmLanguage} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl bg-black/30 border border-white/10 text-white outline-none backdrop-blur-md appearance-none">
                        <option className="bg-gray-900" value="FR">Français</option>
                        <option className="bg-gray-900" value="EN">Anglais</option>
                        <option className="bg-gray-900" value="MUTE">Muet</option>
                    </select>
                </div>
            </div>

            <div className="pt-8 border-t border-white/10">
                <h3 className="text-xl font-bold text-blue-300 mb-4">Déclaration d'Usage de l'IA *</h3>
                {errors.aiClassification && <p className="text-red-400 text-sm mb-2 font-bold bg-red-500/10 p-2 rounded-lg inline-block">{errors.aiClassification}</p>}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <button type="button" onClick={() => setCustomValue('aiClassification', 'FULL')} className={`p-6 rounded-2xl border transition-all text-left group ${formData.aiClassification === 'FULL' ? 'bg-gradient-to-br from-blue-600/40 to-purple-600/40 border-blue-400' : 'bg-black/20 border-white/10 hover:bg-white/5'}`}>
                      <div className="text-lg font-bold text-white mb-1"> 100% Génération par IA</div>
                  </button>
                  <button type="button" onClick={() => setCustomValue('aiClassification', 'HYBRID')} className={`p-6 rounded-2xl border transition-all text-left group ${formData.aiClassification === 'HYBRID' ? 'bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-purple-400' : 'bg-black/20 border-white/10 hover:bg-white/5'}`}>
                      <div className="text-lg font-bold text-white mb-1"> Production Hybride</div>
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-blue-200/80 mb-2 ml-1">Stack Technologique *</label>
                  <textarea name="aiStack" rows="3" value={formData.aiStack} onChange={handleChange} className={`${glassTextAreaClasses} ${errors.aiStack ? 'border-red-500' : ''}`}></textarea>
                  {errors.aiStack && <p className="text-red-400 text-xs mt-1">{errors.aiStack}</p>}
                </div>

                <div>
                  <label className="block text-sm text-blue-200/80 mb-2 ml-1">Méthodologie Créative *</label>
                  <textarea name="aiMethodology" rows="3" value={formData.aiMethodology} onChange={handleChange} className={`${glassTextAreaClasses} ${errors.aiMethodology ? 'border-red-500' : ''}`}></textarea>
                  {errors.aiMethodology && <p className="text-red-400 text-xs mt-1">{errors.aiMethodology}</p>}
                </div>
            </div>
          </div>
        )}

          {/* --- ÉTAPE 4 --- */}
          {step === 4 && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-white/90">Synopsis & Note d'intention</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                  <div>
                      <label className="block text-sm text-blue-200/80 mb-2">Synopsis (Français) *</label>
                      <textarea name="synopsisFR" rows="5" value={formData.synopsisFR} onChange={handleChange} className={`${glassTextAreaClasses} ${errors.synopsisFR ? 'border-red-500' : ''}`}></textarea>
                      {errors.synopsisFR && <p className="text-red-400 text-xs mt-1">{errors.synopsisFR}</p>}
                  </div>
                  <div>
                      <label className="block text-sm text-blue-200/80 mb-2">Note d'intention (Français)</label>
                      <textarea name="directorNoteFR" rows="5" value={formData.directorNoteFR} onChange={handleChange} className={glassTextAreaClasses} placeholder="Optionnel..."></textarea>
                  </div>
              </div>
              <div className="space-y-6">
                  <div>
                      <label className="block text-sm text-purple-300/80 mb-2">Synopsis (English) *</label>
                      <textarea name="synopsisEN" rows="5" value={formData.synopsisEN} onChange={handleChange} className={`${glassTextAreaClassesPurple} ${errors.synopsisEN ? 'border-red-500' : ''}`}></textarea>
                      {errors.synopsisEN && <p className="text-red-400 text-xs mt-1">{errors.synopsisEN}</p>}
                  </div>
                  <div>
                      <label className="block text-sm text-purple-300/80 mb-2">Director's Note (English)</label>
                      <textarea name="directorNoteEN" rows="5" value={formData.directorNoteEN} onChange={handleChange} className={glassTextAreaClassesPurple} placeholder="Optional..."></textarea>
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* --- NAV --- */}
        <div className="mt-12 pt-8 flex gap-6 border-t border-white/10">
          {step > 1 && <button onClick={() => setStep(step - 1)} className="w-1/3 py-4 rounded-2xl border border-white/20 text-white/70 font-bold hover:bg-white/10 hover:text-white transition-all">← Retour</button>}
          <button 
            onClick={handleNext} // On appelle la validation ici
            className={`flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold shadow-[0_5px_20px_-5px_rgba(99,102,241,0.6)] transition-all duration-500 ${step === 1 ? 'w-full' : ''}`}
          >
            {step === 4 ? "Envoyer " : "Suivant →"}
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

// STYLES & COMPOSANTS
const glassTextAreaClasses = "w-full p-5 rounded-3xl bg-black/30 border border-white/10 text-white focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all placeholder-white/30 backdrop-blur-md resize-none text-sm leading-relaxed";
const glassTextAreaClassesPurple = "w-full p-5 rounded-3xl bg-black/30 border border-white/10 text-white focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder-white/30 backdrop-blur-md resize-none text-sm leading-relaxed";

function Input({ label, name, type = "text", value, onChange, placeholder, error }) {
return (
  <div>
    <label htmlFor={name} className={`block text-sm mb-2 ml-3 font-medium tracking-wide ${error ? 'text-red-400' : 'text-blue-200/80'}`}>{label}</label>
    <input 
      type={type} 
      id={name} 
      name={name} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder} 
      className={`w-full h-14 px-6 rounded-2xl bg-black/30 border text-white outline-none transition-all placeholder-white/30 backdrop-blur-md shadow-sm ${error ? 'border-red-500 ring-1 ring-red-500/50' : 'border-white/10 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-500/20'}`} 
    />
    {error && <p className="text-red-400 text-xs mt-1 ml-3 font-medium animate-pulse">{error}</p>}
  </div>
);
}

const getYoutubeId = (url) => {
if (!url) return null;
const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
const match = url.match(regExp);
return (match && match[2].length === 11) ? match[2] : null;
};