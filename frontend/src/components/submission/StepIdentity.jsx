import { Input } from "./FormUI";

export default function StepIdentity({ formData, handleChange, setCustomValue, errors }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-white/90">Identité du Réalisateur</h2>
      
      {/* Civilité */}
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
  );
}