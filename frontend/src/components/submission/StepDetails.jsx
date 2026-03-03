import { useState } from "react";
import { glassTextAreaClasses, glassTextAreaClassesPurple } from "./FormUI";
import { useTranslation } from "react-i18next";

export default function StepDetails({ formData, handleChange, addTeamMember, removeTeamMember, updateTeamMember, errors }) {
  const { t } = useTranslation();
  const [focus, setFocus] = useState({ fr: false, en: false });

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">{t('form.detailsTitle')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-3 md:space-y-4">
          <label className={`block text-sm ${errors.synopsisFR ? 'text-red-400' : 'text-blue-400'}`}>{t('form.synopsis')} (FR)</label>
          <textarea
            name="synopsisFR"
            rows="3"
            value={formData.synopsisFR || ""}
            onChange={handleChange}
            onFocus={() => setFocus(f => ({ ...f, fr: true }))}
            onBlur={() => setFocus(f => ({ ...f, fr: false }))}
            className={`w-full rounded-lg p-3 bg-gray-900 border text-white focus:outline-none transition-all cursor-text ${errors.synopsisFR ? 'border-red-500' : focus.fr || formData.synopsisFR ? 'border-blue-400' : 'border-gray-700'}`}
            placeholder={t('form.synopsisPlaceholder')}
          ></textarea>
          {errors.synopsisFR && <p className="text-red-400 text-xs mt-1 ml-1 font-medium animate-pulse">{errors.synopsisFR}</p>}
        </div>
        <div className="space-y-3 md:space-y-4">
          <label className={`block text-sm ${errors.synopsisEN ? 'text-red-400' : 'text-pink-400'}`}>{t('form.synopsis')} (EN)</label>
          <textarea
            name="synopsisEN"
            rows="3"
            value={formData.synopsisEN || ""}
            onChange={handleChange}
            onFocus={() => setFocus(f => ({ ...f, en: true }))}
            onBlur={() => setFocus(f => ({ ...f, en: false }))}
            className={`w-full rounded-lg p-3 bg-gray-900 border text-white focus:outline-none transition-all cursor-text ${errors.synopsisEN ? 'border-red-500' : focus.en || formData.synopsisEN ? 'border-pink-400' : 'border-gray-700'}`}
            placeholder={t('form.synopsisPlaceholder')}
          ></textarea>
          {errors.synopsisEN && <p className="text-red-400 text-xs mt-1 ml-1 font-medium animate-pulse">{errors.synopsisEN}</p>}
        </div>
      </div>
      {/* Équipe */}
      <div className="pt-6 md:pt-8 border-t border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white">{t('form.team')}</h3>
          <button type="button" onClick={addTeamMember} className="btn btn-outline btn-sm border-gray-700 text-white hover:bg-gray-800 hover:border-gray-700 rounded-full text-xs md:text-sm">+ {t('form.addMember')}</button>
        </div>
        {formData.teamMembers.length === 0 && (
          <p className="text-center text-gray-400 italic mb-6 text-sm">Aucun membre ajouté. Vous êtes seul(e) ? Et C'est OK !</p>
        )}
        <div className="space-y-4">
          {formData.teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-900 border border-gray-700 p-3 md:p-4 rounded-2xl relative animate-fade-in">
              <button type="button" onClick={() => removeTeamMember(index)} className="btn btn-ghost btn-xs btn-circle absolute top-2 right-2 text-gray-400 hover:text-red-400">✖</button>
              <div className="grid grid-cols-1 gap-3 md:gap-4 pr-8">
                <input type="text" placeholder={t('form.role')} value={member.role} onChange={(e) => updateTeamMember(index, 'role', e.target.value)} className="w-full bg-transparent border-b border-gray-700 py-2 text-sm text-white focus:border-blue-400 outline-none" />
                <div className="flex flex-col sm:flex-row gap-3">
                  <select value={member.civilite} onChange={(e) => updateTeamMember(index, 'civilite', e.target.value)} className="bg-gray-900 border border-gray-700 rounded text-sm text-white px-2 py-2 w-full sm:w-24">
                    <option value="m">M.</option>
                    <option value="mrs">Mme</option>
                    <option value="other">Iel</option>
                  </select>
                  <div className="flex-1">
                    <input type="text" placeholder={t('form.firstname')} value={member.firstname} onChange={(e) => updateTeamMember(index, 'firstname', e.target.value)} className={`w-full bg-transparent border-b py-2 text-sm text-white focus:border-blue-400 outline-none ${errors[`team_${index}_firstname`] ? 'border-red-500' : 'border-gray-700'}`} />
                    {errors[`team_${index}_firstname`] && <p className="text-red-400 text-xs mt-1">{errors[`team_${index}_firstname`]}</p>}
                  </div>
                  <div className="flex-1">
                    <input type="text" placeholder={t('form.lastname')} value={member.lastname} onChange={(e) => updateTeamMember(index, 'lastname', e.target.value)} className={`w-full bg-transparent border-b py-2 text-sm text-white focus:border-blue-400 outline-none ${errors[`team_${index}_lastname`] ? 'border-red-500' : 'border-gray-700'}`} />
                    {errors[`team_${index}_lastname`] && <p className="text-red-400 text-xs mt-1">{errors[`team_${index}_lastname`]}</p>}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input type="email" placeholder="Email" value={member.email} onChange={(e) => updateTeamMember(index, 'email', e.target.value)} className={`w-full bg-transparent border-b py-2 text-sm text-white focus:border-blue-400 outline-none ${errors[`team_${index}_email`] ? 'border-red-500' : 'border-gray-700'}`} />
                    {errors[`team_${index}_email`] && <p className="text-red-400 text-xs mt-1">{errors[`team_${index}_email`]}</p>}
                  </div>
                  <div className="flex flex-col flex-1 gap-1">
                    <label className={`text-xs ml-1 ${errors[`team_${index}_birthdate`] ? 'text-red-400' : 'text-gray-400'}`}>{t('form.birthdate')}</label>
                    <input type="date" value={member.birthdate} onChange={(e) => updateTeamMember(index, 'birthdate', e.target.value)} className={`w-full bg-transparent border-b py-2 text-sm text-white focus:border-blue-400 outline-none ${errors[`team_${index}_birthdate`] ? 'border-red-500' : 'border-gray-700'}`} />
                    {errors[`team_${index}_birthdate`] && <p className="text-red-400 text-xs mt-1">{errors[`team_${index}_birthdate`]}</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}