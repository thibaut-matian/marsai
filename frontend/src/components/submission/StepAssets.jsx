import { Input, glassTextAreaClasses } from "./FormUI";
import { useTranslation } from "react-i18next";

export default function StepAssets({ formData, handleChange, handleFileChange, handleStillsChange, setCustomValue, errors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-white/90">
        {t('form.assetsTitle')}
      </h2>

      {/* 1. UPLOAD VIDÉO */}
      <div className={`relative group p-4 md:p-6 rounded-3xl border-2 border-dashed transition-all 
        ${errors.videoFile ? 'border-red-500 bg-red-500/10' : formData.videoFile ? 'border-green-500 bg-green-900/10' : 'border-white/20 bg-black/20 hover:border-blue-400/50 hover:bg-black/40'}`}
        style={{ cursor: 'pointer' }}
      >
        <label htmlFor="videoFileInput" className="flex flex-col items-center justify-center cursor-pointer h-28 md:h-32 relative">
            <div className="text-base md:text-4xl mb-2 select-none pointer-events-none">☁️</div>
            <span className="text-base md:text-lg font-bold text-white mb-1 text-center px-2 select-none pointer-events-none">
              {formData.videoFile ? formData.videoFile.name : t('form.videoFile')}
            </span>
            <span className="text-xs md:text-sm text-blue-200/60 select-none pointer-events-none">
              {formData.videoFile ? t('form.videoReady') : t('form.videoPlaceholder')}
            </span>
            <input id="videoFileInput" type="file" name="videoFile" accept="video/*" onChange={handleFileChange} className="hidden" />
            {formData.videoFile && (
              <span className="absolute top-2 right-2 text-green-400 text-xl" title="Vidéo uploadée">✔️</span>
            )}
        </label>
        {errors.videoFile && (
          <div className="mt-2 text-red-400 text-sm font-semibold text-center">{errors.videoFile}</div>
        )}
      </div>

      {/* 2. TITRE ET DURÉE (Correction du bug 'uncontrolled') */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input 
          label={t('form.title')} 
          name="filmTitleOriginal" 
          value={formData.filmTitleOriginal || ""} // "" évite le bug 'uncontrolled'
          onChange={handleChange} 
          error={errors.filmTitleOriginal} 
          placeholder="Ex: Mars Invasion"
        />
        <Input 
          label={t('form.duration')} 
          name="filmDuration"   // ← Correction ici !
          type="number"
          value={formData.filmDuration || ""} // "" évite le bug 'uncontrolled'
          onChange={handleChange} 
          error={errors.filmDuration} 
          placeholder="Sec."
          min="0"
        />
      </div>

      <Input 
        label={t('form.youtubeUrl')} 
        name="filmUrl" 
        value={formData.filmUrl || ""} 
        onChange={handleChange} 
        placeholder="https://youtube.com/..." 
        error={errors.filmUrl} 
      />

      {/* 3. IMAGES (VIGNETTE & STILLS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/5">
        <div className={`p-4 rounded-2xl border transition-all ${errors.thumbnailFile ? 'border-red-500' : formData.thumbnailFile ? 'border-green-500 bg-green-900/10' : 'border-white/10 bg-black/20 hover:border-blue-400/50 hover:bg-black/40'}`}
          onClick={() => document.getElementById('thumbnailFileInput')?.click()}
          style={{ cursor: 'pointer' }}
        >
          <label className="block text-sm text-blue-300 mb-2 font-bold relative select-none pointer-events-none">
            {t('form.thumbnail')}
            {formData.thumbnailFile && (
              <span className="absolute top-0 right-0 text-green-400 text-xl" title="Vignette uploadée">✔️</span>
            )}
          </label>
          <input id="thumbnailFileInput" type="file" name="thumbnailFile" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 cursor-pointer hidden" />
          {formData.thumbnailFile && (
            <div className="mt-2 text-xs text-green-400">{formData.thumbnailFile.name}</div>
          )}
        </div>

        <div className={`p-4 rounded-2xl border transition-all ${formData.stillsFiles && formData.stillsFiles.length === 3 ? 'border-green-500 bg-green-900/10' : 'border-white/10 bg-black/20 hover:border-blue-400/50 hover:bg-black/40'}`}
          onClick={() => document.getElementById('stillsFilesInput')?.click()}
          style={{ cursor: 'pointer' }}
        >
          <label className="block text-sm text-blue-300 mb-2 font-bold relative select-none pointer-events-none">
            {t('form.stills')}
            {formData.stillsFiles && formData.stillsFiles.length === 3 && (
              <span className="absolute top-0 right-0 text-green-400 text-xl" title="3 images uploadées">✔️</span>
            )}
          </label>
          <input id="stillsFilesInput" type="file" multiple accept="image/*" onChange={handleStillsChange} className="w-full text-sm text-gray-400 cursor-pointer hidden" />
          {formData.stillsFiles && formData.stillsFiles.length > 0 && (
            <div className="mt-2 text-xs text-green-400">
              {formData.stillsFiles.length} / 3 {t('form.stills')}
              <ul className="mt-1 text-xs text-white/80 list-disc list-inside">
                {formData.stillsFiles.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 4. CLASSIFICATION IA */}
      <div className="pt-6 border-t border-white/10">
        <h3 className="text-xl font-bold text-blue-300 mb-4">{t('form.detailsTitle')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              type="button" 
              onClick={() => setCustomValue('aiClassification', 'FULL')} 
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${formData.aiClassification === 'FULL' ? 'bg-blue-600/20 border-blue-400 shadow-lg' : 'bg-black/20 border-white/10 hover:bg-blue-900/30 hover:border-blue-400'}`}
            >
                <div className="font-bold">🤖 100% {t('form.generation')}</div>
                <p className="text-xs text-blue-100/60 mt-1">{t('form.noCamera')}</p>
            </button>
            <button 
              type="button" 
              onClick={() => setCustomValue('aiClassification', 'HYBRID')} 
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${formData.aiClassification === 'HYBRID' ? 'bg-purple-600/20 border-purple-400 shadow-lg' : 'bg-black/20 border-white/10 hover:bg-purple-900/30 hover:border-purple-400'}`}
            >
                <div className="font-bold">🤝 {t('form.hybridProduction')}</div>
                <p className="text-xs text-purple-100/60 mt-1">{t('form.mixedShooting')}</p>
            </button>
        </div>
        
        <div className="mt-6 space-y-4">
            <div>
                <label className="block text-sm text-blue-200/80 mb-2">{t('form.techStack')}</label>
                <textarea name="aiStack" rows="2" value={formData.aiStack || ""} onChange={handleChange} className={glassTextAreaClasses + " cursor-text"}></textarea>
            </div>
            <div>
                <label className="block text-sm text-blue-200/80 mb-2">{t('form.creativeMethodology')}</label>
                <textarea name="aiMethodology" rows="2" value={formData.aiMethodology || ""} onChange={handleChange} className={glassTextAreaClasses + " cursor-text"}></textarea>
            </div>
        </div>
      </div>
    </div>
  );
}