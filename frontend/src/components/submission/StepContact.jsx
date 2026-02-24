import { Input } from "./FormUI";

export default function StepContact({ formData, handleChange, errors }) {
  return (
    <div className="space-y-8 animate-fade-in">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-white">Contact & E-Réputation</h2>
        <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Téléphone Fixe" name="telephone" type="tel" value={formData.telephone} onChange={handleChange} error={errors.telephone} />
          <Input label="Mobile *" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
        </div>
        <div className="bg-gray-900 p-4 md:p-6 rounded-3xl border border-gray-700 backdrop-blur-sm space-y-4">
          <Input label="Adresse *" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <Input label="Code Postal *" name="zipcode" value={formData.zipcode} onChange={handleChange} error={errors.zipcode} />
              <Input label="Ville *" name="city" value={formData.city} onChange={handleChange} error={errors.city} />
          </div>
          <Input label="Pays *" name="country" value={formData.country} onChange={handleChange} error={errors.country} />
        </div>
        {/* RÉSEAUX */}
        <div className="pt-4 border-t border-gray-700">
          <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-4 uppercase">Réseaux Sociaux (Optionnel)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="YouTube" name="socialYoutube" placeholder="https://youtube.com/..." value={formData.socialYoutube} onChange={handleChange} />
              <Input label="Instagram" name="socialInstagram" placeholder="@pseudo" value={formData.socialInstagram} onChange={handleChange} />
              <Input label="LinkedIn" name="socialLinkedin" placeholder="Lien profil" value={formData.socialLinkedin} onChange={handleChange} />
              <Input label="Facebook" name="socialFacebook" placeholder="Lien page" value={formData.socialFacebook} onChange={handleChange} />
              <Input label="X (Twitter)" name="socialX" placeholder="@pseudo" value={formData.socialX} onChange={handleChange} />
          </div>
        </div>
        {/* SOURCE & NEWSLETTER */}
        <div>
          <label className="block text-sm text-gray-300 mb-2 ml-3 font-medium">Source *</label>
          <select name="marketingSource" value={formData.marketingSource} onChange={handleChange} className={`w-full h-14 px-6 rounded-2xl bg-gray-900 border border-gray-700 text-white outline-none backdrop-blur-md appearance-none cursor-pointer ${errors.marketingSource ? 'border-red-500' : ''}`}>
                <option className="bg-gray-900" value="">-- Comment avez-vous connu marsAI ? --</option>
                <option className="bg-gray-900" value="socials">socials</option>
                <option className="bg-gray-900" value="friends">friends</option>
                <option className="bg-gray-900" value="schools">schools</option>
                <option className="bg-gray-900" value="ads">ads</option>
                <option className="bg-gray-900" value="works">works</option>
          </select>
          {errors.marketingSource && (
            <p className="text-red-400 text-xs mt-1 ml-3 font-medium animate-pulse">{errors.marketingSource}</p>
          )}
        </div>
        <div className="pt-2">
          <label className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
            <input type="checkbox" name="newsletter" checked={formData.newsletter} onChange={handleChange} className="checkbox checkbox-primary checkbox-sm border-white/30 bg-black/30" />
            <span className="text-sm text-gray-300 group-hover:text-white transition-colors select-none">Je souhaite recevoir la newsletter du festival.</span>
          </label>
        </div>
    </div>
  );
}