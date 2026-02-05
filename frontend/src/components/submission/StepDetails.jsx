import { glassTextAreaClasses, glassTextAreaClassesPurple } from "./FormUI";

export default function StepDetails({ formData, handleChange, addTeamMember, removeTeamMember, updateTeamMember, errors }) {
return (
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

    {/* MODULE ÉQUIPE */}
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
                        <input type="text" placeholder="Fonction" value={member.role} onChange={(e) => updateTeamMember(index, 'role', e.target.value)} className="bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                        <div className="flex gap-2">
                            <select value={member.civilite} onChange={(e) => updateTeamMember(index, 'civilite', e.target.value)} className="bg-black/50 border border-white/20 rounded text-sm text-white"><option value="M">M</option><option value="Mme">Mme</option></select>
                            <input type="text" placeholder="Prénom" value={member.firstname} onChange={(e) => updateTeamMember(index, 'firstname', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                            <input type="text" placeholder="Nom" value={member.lastname} onChange={(e) => updateTeamMember(index, 'lastname', e.target.value)} className="w-full bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                        </div>
                        <input type="email" placeholder="Email" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} className="bg-transparent border-b border-white/20 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                    </div>
                </div>
            ))}
        </div>
    </div>
</div>
);
}