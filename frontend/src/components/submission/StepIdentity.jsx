import { Input } from "./FormUI";

export default function StepIdentity({ formData, handleChange, setCustomValue, errors }) {
  const civilites = ['M', 'Mme', 'Iel'];

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">Identité du Réalisateur</h2>
      
      {/* Civilité - Toggle sans effet glissé */}
      <div>
        <label className="block text-sm text-gray-300 mb-3 ml-1">Civilité</label>
        <div className="flex bg-gray-900 border border-gray-700 p-1.5 rounded-2xl">
          {civilites.map((civ) => (
            <button 
              key={civ} 
              type="button" 
              onClick={() => setCustomValue('civilite', civ)} 
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 
                ${formData.civilite === civ ? 'bg-gray-700 text-white' : 'bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white'}`}
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