import { Input } from "./FormUI";
import { useTranslation } from "react-i18next";

export default function StepIdentity({ formData, handleChange, setCustomValue, errors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">
        {t('form.identityTitle')}
      </h2>

      {/* Civilité / Genre - version moderne sobre sans emoji */}
      <div className="flex flex-col mb-4">
        <label className="block text-base mb-2 ml-3 font-semibold text-gray-200">
          {t('form.civilite') || "Civilité *"}
        </label>
        <div className="flex gap-3 ml-3">
          {[
            { value: "M", label: "Mr" },
            { value: "Mme", label: "Mme" },
            { value: "Iel", label: "Iel" }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setCustomValue('civilite', option.value)}
              className={`flex items-center px-6 py-2 rounded-full border font-semibold text-base transition-all shadow-sm cursor-pointer
                ${formData.civilite === option.value
                  ? 'bg-white text-black border-gray-300 shadow-md'
                  : 'bg-gray-800 text-gray-200 border-gray-600 hover:bg-gray-700 hover:text-white'}
              `}
              aria-pressed={formData.civilite === option.value}
              style={{ cursor: 'pointer' }}
            >
              {option.label}
            </button>
          ))}
        </div>
        {errors.civilite && <p className="text-red-400 text-xs mt-1 ml-3">{errors.civilite}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label={t('form.lastname')} 
          name="lastname" 
          value={formData.lastname || ""} 
          onChange={handleChange} 
          error={errors.lastname} 
          className="cursor-text"
        />
        <Input 
          label={t('form.firstname')} 
          name="firstname" 
          value={formData.firstname || ""} 
          onChange={handleChange} 
          error={errors.firstname} 
          className="cursor-text"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input 
          label={t('form.birthdate')} 
          name="birthdate" 
          type="date" 
          value={formData.birthdate || ""} 
          onChange={handleChange} 
          error={errors.birthdate} 
          className="cursor-pointer"
        />
        <Input 
          label={t('form.profession')} 
          name="profession" 
          value={formData.profession || ""} 
          onChange={handleChange} 
          placeholder={t('form.professionPlaceholder')} 
          error={errors.profession} 
          className="cursor-text"
        />
      </div>
    </div>
  );
}