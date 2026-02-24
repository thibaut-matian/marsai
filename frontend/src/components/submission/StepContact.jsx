import { Input } from "./FormUI";
import { useTranslation } from "react-i18next";

export default function StepContact({ formData, handleChange, errors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">{t('form.contactTitle')}</h2>
      <Input label={t('form.email')} name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} className="cursor-text" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label={t('form.telephone')} name="telephone" type="tel" value={formData.telephone} onChange={handleChange} error={errors.telephone} className="cursor-text" />
        <Input label={t('form.mobile')} name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={errors.mobile} className="cursor-text" />
      </div>
      <div className="bg-gray-900 p-4 md:p-6 rounded-3xl border border-gray-700 backdrop-blur-sm space-y-4">
        <Input label={t('form.address')} name="address" value={formData.address} onChange={handleChange} error={errors.address} className="cursor-text" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <Input label={t('form.zipcode')} name="zipcode" value={formData.zipcode} onChange={handleChange} error={errors.zipcode} className="cursor-text" />
          <Input label={t('form.city')} name="city" value={formData.city} onChange={handleChange} error={errors.city} className="cursor-text" />
        </div>
        <Input label={t('form.country')} name="country" value={formData.country} onChange={handleChange} error={errors.country} className="cursor-text" />
      </div>
      {/* Réseaux sociaux */}
      <div className="pt-4 border-t border-gray-700">
        <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-4 uppercase">{t('form.socials')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label={t('form.youtube')} name="socialYoutube" placeholder="https://youtube.com/..." value={formData.socialYoutube} onChange={handleChange} />
          <Input label={t('form.instagram')} name="socialInstagram" placeholder="@pseudo" value={formData.socialInstagram} onChange={handleChange} />
          <Input label={t('form.linkedin')} name="socialLinkedin" placeholder="Lien profil" value={formData.socialLinkedin} onChange={handleChange} />
          <Input label={t('form.facebook')} name="socialFacebook" placeholder="Lien page" value={formData.socialFacebook} onChange={handleChange} />
          <Input label={t('form.x')} name="socialX" placeholder="@pseudo" value={formData.socialX} onChange={handleChange} />
        </div>
      </div>
      {/* Source & newsletter */}
      <div>
        <label className="block text-sm text-gray-300 mb-2 ml-3 font-medium">{t('form.source')}</label>
        <select name="marketingSource" value={formData.marketingSource} onChange={handleChange} className={`w-full h-14 px-6 rounded-2xl bg-gray-900 border border-gray-700 text-white outline-none backdrop-blur-md appearance-none cursor-pointer ${errors.marketingSource ? 'border-red-500' : ''}`}>
          <option className="bg-gray-900" value="">{t('form.sourcePlaceholder')}</option>
          <option className="bg-gray-900" value="socials">{t('form.sourceOptions.socials')}</option>
          <option className="bg-gray-900" value="friends">{t('form.sourceOptions.friends')}</option>
          <option className="bg-gray-900" value="schools">{t('form.sourceOptions.schools')}</option>
          <option className="bg-gray-900" value="ads">{t('form.sourceOptions.ads')}</option>
          <option className="bg-gray-900" value="works">{t('form.sourceOptions.works')}</option>
        </select>
        {errors.marketingSource && (
          <p className="text-red-400 text-xs mt-1 ml-3 font-medium animate-pulse">{errors.marketingSource}</p>
        )}
      </div>
      <div className="pt-2">
        <label className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
          <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="checkbox checkbox-primary checkbox-sm border-white/30 bg-black/30" />
          <span className="text-sm text-gray-300 group-hover:text-white transition-colors select-none">{t('form.newsletter')}</span>
        </label>
      </div>
    </div>
  );
}