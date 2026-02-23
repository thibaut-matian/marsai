import { glassTextAreaClasses, glassTextAreaClassesPurple } from "./FormUI";

export default function StepDetails({ formData, handleChange, addTeamMember, removeTeamMember, updateTeamMember, errors }) {
return (
<div className="space-y-6 md:space-y-8 animate-fade-in">
    <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">Détails & Crédits</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3 md:space-y-4">
            <label className="block text-sm text-gray-300">Synopsis (FR) *</label>
            <textarea name="synopsisFR" rows="4" value={formData.synopsisFR} onChange={handleChange} className={`${glassTextAreaClasses} ${errors.synopsisFR ? 'border-red-500' : ''}`}></textarea>
        </div>
        <div className="space-y-3 md:space-y-4">
            <label className="block text-sm text-purple-300">Synopsis (EN) *</label>
            <textarea name="synopsisEN" rows="4" value={formData.synopsisEN} onChange={handleChange} className={`${glassTextAreaClassesPurple} ${errors.synopsisEN ? 'border-red-500' : ''}`}></textarea>
        </div>
    </div>
    {/* MODULE ÉQUIPE */}
    <div className="pt-6 md:pt-8 border-t border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
            <h3 className="text-lg md:text-xl font-bold text-white">Composition de l'Équipe</h3>
            <button type="button" onClick={addTeamMember} className="btn btn-outline btn-sm border-gray-700 text-white hover:bg-gray-800 hover:border-gray-700 rounded-full text-xs md:text-sm">+ Ajouter un membre</button>
        </div>
        {formData.teamMembers.length === 0 && (
            <p className="text-center text-gray-400 italic mb-6 text-sm">Aucun membre ajouté. Vous êtes seul(e) ? C'est OK !</p>
        )}
        <div className="space-y-4">
            {formData.teamMembers.map((member, index) => (
                <div key={index} className="bg-gray-900 border border-gray-700 p-3 md:p-4 rounded-2xl relative animate-fade-in">
                    <button type="button" onClick={() => removeTeamMember(index)} className="btn btn-ghost btn-xs btn-circle absolute top-2 right-2 text-gray-400 hover:text-red-400">✖</button>
                    <div className="grid grid-cols-1 gap-3 md:gap-4 pr-8">
                        <input type="text" placeholder="Fonction (ex: Producteur)" value={member.role} onChange={(e) => updateTeamMember(index, 'role', e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                        <div className="flex flex-col sm:flex-row gap-3">
                            <select value={member.civilite} onChange={(e) => updateTeamMember(index, 'civilite', e.target.value)} className="bg-gray-900 border border-gray-700 rounded text-sm text-white px-2 py-2 w-full sm:w-20"><option value="M">M</option><option value="Mme">Mme</option></select>
                            <input type="text" placeholder="Prénom" value={member.firstname} onChange={(e) => updateTeamMember(index, 'firstname', e.target.value)} className="flex-1 bg-transparent border-b border-gray-700 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                            <input type="text" placeholder="Nom" value={member.lastname} onChange={(e) => updateTeamMember(index, 'lastname', e.target.value)} className="flex-1 bg-transparent border-b border-gray-700 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                        </div>
                        <input type="email" placeholder="Email" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
);
}