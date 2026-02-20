import { Input } from "./FormUI";

export default function StepIdentity({ formData, handleChange, setCustomValue, errors }) {
  const civilites = ['M', 'Mme', 'Iel'];
  const activeIndex = civilites.indexOf(formData.civilite);
  const sliderTranslate = ["translate-x-0", "translate-x-full", "translate-x-[200%]"][activeIndex];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white/90">Identité du Réalisateur</h2>
      
      {/* Civilité - Sliding Toggle */}
      <div>
        <label className="block text-sm text-blue-200/80 mb-3 ml-1">Civilité</label>
        <div className="relative flex bg-black/20 border border-white/10 p-1.5 rounded-2xl backdrop-blur-sm">
          {/* Slider Background */}
          <div 
            className={`absolute top-1.5 bottom-1.5 left-1.5 w-1/3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg transition-all duration-300 ease-out ${sliderTranslate}`}
          />
          {/* Buttons */}
          {civilites.map((civ) => (
            <button 
              key={civ} 
              type="button" 
              onClick={() => setCustomValue('civilite', civ)} 
              className={`relative z-10 flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-300 ${formData.civilite === civ ? 'text-white' : 'text-white/60 hover:text-white'}`}
            >
              {civ}
            </button>
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
  );
}