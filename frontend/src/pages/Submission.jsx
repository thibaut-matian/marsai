import { useState } from 'react';

export default function Submission() {
// --- 1. STATE ---
const [step, setStep] = useState(1);
const [errors, setErrors] = useState({}); 
const [formData, setFormData] = useState({
// IDENTITÉ
civilite: 'M',
lastname: '',
firstname: '',
birthdate: '',
profession: '',

// CONTACT & RÉSEAUX
email: '',
telephone: '',
mobile: '',
address: '',
zipcode: '',
city: '',
country: '',
socialYoutube: '',
socialInstagram: '',
socialLinkedin: '',
socialFacebook: '',
socialX: '',
marketingSource: '',
newsletter: false,

// ASSETS FILM
videoFile: null,
filmUrl: '', // YouTube URL

// ACCESSIBILITÉ
needsSubtitles: false, // Case à cocher
subtitleFile: null,    // Fichier .srt

// VISUELS
thumbnailFile: null, // Vignette 16:9 (Obligatoire)
stillsFiles: [],     // Galerie (Max 3)

// INFO FILM
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

// ÉQUIPE (Dynamique)
teamMembers: [] // Tableau d'objets { role, civilite, nom, prenom, email }
});

// --- 2. GESTION DES CHAMPS ---

const handleChange = (e) => {
const { name, value, type, checked } = e.target;
if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
const val = type === 'checkbox' ? checked : value;
setFormData(prev => ({ ...prev, [name]: val }));
};

// Gestion spécifique fichiers uniques
const handleFileChange = (e) => {
const { name, files } = e.target;
if (files && files[0]) {
    setFormData(prev => ({ ...prev, [name]: files[0] }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
}
};

// Gestion spécifique Galerie (Max 3)
const handleStillsChange = (e) => {
const files = Array.from(e.target.files);
if (files.length + formData.stillsFiles.length > 3) {
  alert("Maximum 3 images pour la galerie.");
  return;
}
setFormData(prev => ({ ...prev, stillsFiles: [...prev.stillsFiles, ...files] }));
};

// Gestion Équipe (Dynamique)
const addTeamMember = () => {
setFormData(prev => ({
  ...prev,
  teamMembers: [...prev.teamMembers, { role: '', civilite: 'M', firstname: '', lastname: '', email: '' }]
}));
};

const removeTeamMember = (index) => {
const newTeam = [...formData.teamMembers];
newTeam.splice(index, 1);
setFormData(prev => ({ ...prev, teamMembers: newTeam }));
};

const updateTeamMember = (index, field, value) => {
const newTeam = [...formData.teamMembers];
newTeam[index][field] = value;
setFormData(prev => ({ ...prev, teamMembers: newTeam }));
};

const setCustomValue = (key, value) => {
setFormData(prev => ({ ...prev, [key]: value }));
if (errors[key]) setErrors(prev => ({ ...prev, [key]: null }));
};

// --- 3. VALIDATION ---
const validateStep = (currentStep) => {
let newErrors = {};
let isValid = true;

// ÉTAPE 1 : Identité
if (currentStep === 1) {
  if (!formData.lastname.trim()) newErrors.lastname = "Nom requis.";
  if (!formData.firstname.trim()) newErrors.firstname = "Prénom requis.";
  if (!formData.profession.trim()) newErrors.profession = "Métier requis.";
  if (!formData.birthdate) newErrors.birthdate = "Date requise.";
}

// ÉTAPE 2 : Contact
if (currentStep === 2) {
  if (!formData.email.trim()) newErrors.email = "Email requis.";
  if (!formData.mobile.trim()) newErrors.mobile = "Mobile requis.";
  if (!formData.country.trim()) newErrors.country = "Pays requis.";
  if (!formData.marketingSource) newErrors.marketingSource = "Source requise.";
}

// ÉTAPE 3 : Assets & Tech
if (currentStep === 3) {
  if (!formData.videoFile) newErrors.videoFile = "Fichier vidéo requis.";
  if (!formData.filmUrl.trim()) newErrors.filmUrl = "Lien YouTube requis.";
  
  // LOGIQUE CONDITIONNELLE SOUS-TITRES
  if (formData.needsSubtitles && !formData.subtitleFile) {
    newErrors.subtitleFile = "Le fichier .srt est obligatoire si vous cochez la case sous-titres.";
  }

  // LOGIQUE VIGNETTE OBLIGATOIRE
  if (!formData.thumbnailFile) newErrors.thumbnailFile = "La vignette (thumbnail) est obligatoire.";

  if (!formData.filmTitleOriginal.trim()) newErrors.filmTitleOriginal = "Titre requis.";
  if (!formData.filmDuration) newErrors.filmDuration = "Durée requise.";
  if (!formData.aiClassification) newErrors.aiClassification = "Classification IA requise.";
}

// ÉTAPE 4 : Synopsis & Équipe
if (currentStep === 4) {
  if (!formData.synopsisFR.trim()) newErrors.synopsisFR = "Synopsis FR requis.";
  if (!formData.synopsisEN.trim()) newErrors.synopsisEN = "Synopsis EN requis.";

  formData.teamMembers.forEach((member, index) => {
      if (!member.lastname || !member.role) {
          
      }
  });
}

if (Object.keys(newErrors).length > 0) {
  setErrors(newErrors);
  isValid = false;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

return isValid;
};

const handleNext = () => {
if (validateStep(step)) {
  if (step < 4) setStep(step + 1);
  else {
    console.log("Dossier complet :", formData);
    alert("Dossier envoyé avec succès !");
  }
}
};

return (
<div className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black text-white p-4 font-sans flex flex-col md:items-center md:justify-center md:py-20 font-light">
  
  <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
    
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
      
      {/* --- ÉTAPE 1 : IDENTITÉ --- */}
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

      {/* --- ÉTAPE 2 : CONTACT & RÉSEAUX --- */}
      {step === 2 && (
        <div className="space-y-8 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-6 text-white/90">Contact & E-Réputation</h2>
            
            <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Téléphone Fixe" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} error={errors.telephone} />
              <Input label="Mobile *" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm space-y-4">
              <Input label="Adresse *" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
              <div className="grid grid-cols-2 gap-6">
                  <Input label="Code Postal *" name="zipcode" value={formData.zipcode} onChange={handleChange} error={errors.zipcode} />
                  <Input label="Ville *" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
              </div>
              <Input label="Pays *" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
            </div>

            {/* RÉSEAUX SOCIAUX */}
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-4 uppercase">Réseaux Sociaux (Optionnel)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="YouTube" name="socialYoutube" placeholder="https://youtube.com/..." value={formData.socialYoutube} onChange={handleChange} />
                  <Input label="Instagram" name="socialInstagram" placeholder="@pseudo ou lien" value={formData.socialInstagram} onChange={handleChange} />
                  <Input label="LinkedIn" name="socialLinkedin" placeholder="Lien profil" value={formData.socialLinkedin} onChange={handleChange} />
                  <Input label="Facebook" name="socialFacebook" placeholder="Lien page" value={formData.socialFacebook} onChange={handleChange} />
                  <Input label="X (Twitter)" name="socialX" placeholder="@pseudo" value={formData.socialX} onChange={handleChange} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-blue-200/80 mb-2 ml-3 font-medium">Source *</label>
              <select name="marketingSource" value={formData.marketingSource} onChange={handleChange} className="w-full h-14 px-6 rounded-2xl bg-black/30 border border-white/10 text-white outline-none backdrop-blur-md appearance-none cursor-pointer">
                    <option className="bg-gray-900" value="">-- Comment avez-vous connu marsAI ? --</option>
                    <option className="bg-gray-900" value="socials">Réseaux Sociaux</option>
                    <option className="bg-gray-900" value="press">Presse</option>
                    <option className="bg-gray-900" value="Entourage">Entourage</option>
                    <option className="bg-gray-900" value="other">Autre</option>
              </select>
            </div>

            {/* NEWSLETTER */}
            <div className="pt-2">
              <label className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
                <div className="relative">
                    <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="appearance-none w-6 h-6 rounded-md border-2 border-white/30 bg-black/30 checked:bg-blue-500 checked:border-blue-500 transition-all cursor-pointer"/>
                    <svg className={`absolute top-1 left-1 w-4 h-4 text-white pointer-events-none transition-opacity ${formData.newsletter ? 'opacity-100' : 'opacity-0'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors select-none">Je souhaite recevoir la newsletter du festival.</span>
              </label>
            </div>
        </div>
      )}

      {/* --- ÉTAPE 3 : ASSETS, ACCESSIBILITÉ & VISUELS --- */}
      {step === 3 && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-white/90">Livrables Multimédias</h2>

          {/* 1. SUPPORT VIDÉO */}
          <div className={`relative group p-6 rounded-3xl border-2 border-dashed transition-all ${errors.videoFile ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-black/20 hover:border-blue-400/50 hover:bg-black/40'}`}>
            <label className="flex flex-col items-center justify-center cursor-pointer h-32">
                <div className="text-4xl mb-2">☁️</div>
                <span className="text-lg font-bold text-white mb-1">{formData.videoFile ? formData.videoFile.name : "Fichier Source Vidéo *"}</span>
                <span className="text-sm text-blue-200/60">{formData.videoFile ? "Fichier prêt" : ".MP4, .MOV (Max 400 Mo)"}</span>
                <input type="file" name="videoFile" accept="video/*" onChange={handleFileChange} className="hidden" />
            </label>
            {errors.videoFile && <p className="absolute bottom-2 left-0 w-full text-center text-red-400 text-xs font-bold">{errors.videoFile}</p>}
          </div>

          <Input label="URL Source YouTube (Public ou Non-répertorié) *" name="filmUrl" value={formData.filmUrl} onChange={handleChange} placeholder="https://youtube.com/..." error={errors.filmUrl} />

          {/* 2. ACCESSIBILITÉ */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-4">ACCESSIBILITÉ</h3>
              
              <label className="flex items-center gap-4 cursor-pointer mb-4">
                <input type="checkbox" name="needsSubtitles" checked={formData.needsSubtitles} onChange={handleChange} className="w-5 h-5 rounded border-white/30 bg-black/30 checked:bg-blue-500" />
                <span className="text-sm text-white">Présence de voix ou de textes nécessitant des sous-titres</span>
              </label>

              {/* Upload Conditionnel SRT */}
              {formData.needsSubtitles && (
                  <div className="animate-fade-in">
                      <label className="block text-sm text-blue-200/80 mb-2">Fichier Sous-titres (.srt) *</label>
                      <input type="file" name="subtitleFile" accept=".srt" onChange={handleFileChange} className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${errors.subtitleFile ? 'ring-2 ring-red-500 rounded-lg' : ''}`} />
                      {errors.subtitleFile && <p className="text-red-400 text-xs mt-1">{errors.subtitleFile}</p>}
                  </div>
              )}
          </div>

          {/* 3. IDENTITÉ VISUELLE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Vignette */}
              <div className={`p-4 rounded-2xl border border-white/10 bg-black/20 ${errors.thumbnailFile ? 'border-red-500' : ''}`}>
                <label className="block text-sm text-blue-300 mb-2 font-bold">Vignette Officielle (16:9) *</label>
                <input type="file" name="thumbnailFile" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white" />
                {errors.thumbnailFile && <p className="text-red-400 text-xs mt-1">{errors.thumbnailFile}</p>}
              </div>

              {/* Galerie (Stills) */}
              <div className="p-4 rounded-2xl border border-white/10 bg-black/20">
                <label className="block text-sm text-blue-300 mb-2 font-bold">Galerie photo du film (Max 3)</label>
                <input type="file" multiple accept="image/*" onChange={handleStillsChange} className="w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white" />
                <div className="flex gap-2 mt-2">
                    {formData.stillsFiles.map((file, i) => (
                        <div key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70 truncate max-w-[100px]">{file.name}</div>
                    ))}
                </div>
              </div>
          </div>

          {/* 4. TECH */}
          <div className="pt-4 border-t border-white/10">
              <h3 className="text-xl font-bold text-blue-300 mb-4">Infos & Tech</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Titre Original *" name="filmTitleOriginal" value={formData.filmTitleOriginal} onChange={handleChange} error={errors.filmTitleOriginal} />
                <Input label="Durée (secondes) *" name="filmDuration" type="number" value={formData.filmDuration} onChange={handleChange} error={errors.filmDuration} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <button type="button" onClick={() => setCustomValue('aiClassification', 'FULL')} className={`p-4 rounded-2xl border text-left ${formData.aiClassification === 'FULL' ? 'bg-blue-900/40 border-blue-400' : 'bg-black/20 border-white/10'}`}>
                    <div className="font-bold">🤖 100% Génération</div>
                    <p className="text-xs text-blue-100/60 leading-relaxed font-normal"> Aucune caméra utilisée. L'intégralité du film (images et vidéos) est créée par l'IA.</p>
                </button>
                <button type="button" onClick={() => setCustomValue('aiClassification', 'HYBRID')} className={`p-4 rounded-2xl border text-left ${formData.aiClassification === 'HYBRID' ? 'bg-purple-900/40 border-purple-400' : 'bg-black/20 border-white/10'}`}>
                    <div className="font-bold">🤝 Production Hybride</div>
                    <p className="text-xs text-purple-100/60 leading-relaxed font-normal"> Mélange de tournage réel et d'IA. Vous avez filmé des images mais l'IA les a modifiées ou complétées. </p>
                </button>
              </div>
              {errors.aiClassification && <p className="text-red-400 text-sm mt-2">{errors.aiClassification}</p>}
          </div>
        </div>
      )}

        {/* --- ÉTAPE 4 : SYNOPSIS & ÉQUIPE --- */}
        {step === 4 && (
        <div className="space-y-8 animate-fade-in">
          <h2 className="text-2xl font-semibold mb-6 text-white/90">Détails & Crédits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                  <label className="block text-sm text-blue-200/80">Synopsis (FR) *</label>
                  <textarea name="synopsisFR" rows="4" value={formData.synopsisFR} onChange={handleChange} className={`${glassTextAreaClasses} ${errors.synopsisFR ? 'border-red-500' : ''}`}></textarea>
              </div>
              <div className="space-y-4">
                  <label className="block text-sm text-purple-300/80">Synopsis (EN) *</label>
                  <textarea name="synopsisEN" rows="4" value={formData.synopsisEN} onChange={handleChange} className={`${glassTextAreaClassesPurple} ${errors.synopsisEN ? 'border-red-500' : ''}`}></textarea>
              </div>
          </div>

          {/* MODULE ÉQUIPE DYNAMIQUE */}
          <div className="pt-8 border-t border-white/10">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">Composition de l'Équipe</h3>
                  <button type="button" onClick={addTeamMember} className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-sm font-bold border border-white/20 transition-all">+ Ajouter un membre</button>
              </div>

              {formData.teamMembers.length === 0 && (
                  <p className="text-center text-white/30 italic mb-6">Aucun membre ajouté. Vous êtes seul(e) ? C'est OK !</p>
              )}

              <div className="space-y-4">
                  {formData.teamMembers.map((member, index) => (
                      <div key={index} className="bg-black/30 border border-white/10 p-4 rounded-2xl relative animate-fade-in">
                          <button type="button" onClick={() => removeTeamMember(index)} className="absolute top-2 right-2 text-white/30 hover:text-red-400">✖</button>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                  <input type="text" placeholder="Fonction (ex: Monteur)" value={member.role} onChange={(e) => updateTeamMember(index, 'role', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                              </div>
                              <div className="flex gap-2">
                                  <select value={member.civilite} onChange={(e) => updateTeamMember(index, 'civilite', e.target.value)} className="bg-black/50 border border-white/20 rounded text-sm text-white">
                                      <option value="M">M</option>
                                      <option value="Mme">Mme</option>
                                  </select>
                                  <input type="text" placeholder="Prénom" value={member.firstname} onChange={(e) => updateTeamMember(index, 'firstname', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                                  <input type="text" placeholder="Nom" value={member.lastname} onChange={(e) => updateTeamMember(index, 'lastname', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                              </div>
                              <div>
                                  <input type="email" placeholder="Email" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      )}

      {/* --- NAV --- */}
      <div className="mt-12 pt-8 flex gap-6 border-t border-white/10">
        {step > 1 && <button onClick={() => setStep(step - 1)} className="w-1/3 py-4 rounded-2xl border border-white/20 text-white/70 font-bold hover:bg-white/10 hover:text-white transition-all">← Retour</button>}
        <button 
          onClick={handleNext} 
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