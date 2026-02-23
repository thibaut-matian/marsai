import { Input, glassTextAreaClasses } from "./FormUI";

export default function StepAssets({ formData, handleChange, handleFileChange, handleStillsChange, setCustomValue, errors }) {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">Livrables Multimédias</h2>

      {/* 1. VIDÉO */}
      <div className={`relative group p-4 md:p-6 rounded-3xl border-2 border-dashed transition-all ${errors.videoFile ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-gray-900 hover:border-blue-400/50 hover:bg-gray-800'}`}>
        <label className="flex flex-col items-center justify-center cursor-pointer h-28 md:h-32">
            <div className="text-3xl md:text-4xl mb-2">☁️</div>
            <span className="text-base md:text-lg font-bold text-white mb-1 text-center px-2">{formData.videoFile ? formData.videoFile.name : "Fichier Source Vidéo *"}</span>
            <span className="text-xs md:text-sm text-blue-200/60">{formData.videoFile ? "Fichier prêt" : ".MP4, .MOV (Max 400 Mo)"}</span>
            <input type="file" name="videoFile" accept="video/*" onChange={handleFileChange} className="hidden" />
        </label>
        {errors.videoFile && <p className="absolute bottom-2 left-0 w-full text-center text-red-400 text-xs font-bold">{errors.videoFile}</p>}
      </div>
      <Input label="URL Source YouTube *" name="filmUrl" value={formData.filmUrl} onChange={handleChange} placeholder="https://youtube.com/..." error={errors.filmUrl} />

      {/* 2. ACCESSIBILITÉ */}
      <div className="bg-gray-900 p-4 md:p-6 rounded-3xl border border-gray-700 backdrop-blur-sm">
          <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-4">ACCESSIBILITÉ</h3>
          <label className="flex items-start md:items-center gap-3 md:gap-4 cursor-pointer mb-4">
            <input type="checkbox" name="needsSubtitles" checked={formData.needsSubtitles} onChange={handleChange} className="checkbox checkbox-primary checkbox-sm border-gray-700 bg-gray-900 mt-0.5 md:mt-0" />
            <span className="text-sm text-white">Présence de voix ou de textes nécessitant des sous-titres</span>
          </label>
          {formData.needsSubtitles && (
              <div className="animate-fade-in">
                  <label className="block text-sm text-gray-300 mb-2">Fichier Sous-titres (.srt) *</label>
                  <input type="file" name="subtitleFile" accept=".srt" onChange={handleFileChange} className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${errors.subtitleFile ? 'ring-2 ring-red-500 rounded-lg' : ''}`} />
                  {errors.subtitleFile && <p className="text-red-400 text-xs mt-1">{errors.subtitleFile}</p>}
              </div>
          )}
      </div>

      {/* 3. IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-4 rounded-2xl border border-gray-700 bg-gray-900 ${errors.thumbnailFile ? 'border-red-500' : ''}`}>
            <label className="block text-sm text-blue-300 mb-2 font-bold">Vignette (16:9) *</label>
            <input type="file" name="thumbnailFile" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white file:border-0" />
            {errors.thumbnailFile && <p className="text-red-400 text-xs mt-1">{errors.thumbnailFile}</p>}
        </div>
        <div className="p-4 rounded-2xl border border-gray-700 bg-gray-900">
            <label className="block text-sm text-blue-300 mb-2 font-bold">Galerie (Max 3)</label>
            <input type="file" multiple accept="image/*" onChange={handleStillsChange} className="w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white file:border-0" />
            <div className="flex gap-2 mt-2 flex-wrap">
                {formData.stillsFiles.map((file, i) => (
                    <span key={i} className="badge badge-outline badge-primary text-xs">{file.name}</span>
                ))}
            </div>
        </div>
      </div>

      {/* 4. TECH */}
      <div className="pt-4 border-t border-white/10">
        <h3 className="text-xl font-bold text-blue-300 mb-4">Infos & Tech</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input label="Titre Original *" name="filmTitleOriginal" value={formData.filmTitleOriginal} onChange={handleChange} error={errors.filmTitleOriginal} />
            <Input label="Durée (secondes) *" name="filmDuration" type="number" value={formData.filmDuration} onChange={handleChange} error={errors.filmDuration} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-6">
            <button 
              type="button" 
              onClick={() => setCustomValue('aiClassification', 'FULL')} 
              className={`group relative p-4 md:p-5 h-auto rounded-2xl border text-left transition-all duration-300 overflow-hidden ${formData.aiClassification === 'FULL' ? 'bg-gradient-to-br from-blue-600/40 to-blue-900/40 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'bg-black/20 border-white/10 hover:border-blue-400/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]'}`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 transition-opacity duration-300 ${formData.aiClassification !== 'FULL' ? 'group-hover:opacity-100' : ''}`}></div>
                <div className="relative z-10">
                  <div className={`font-bold text-base md:text-lg transition-transform duration-300 ${formData.aiClassification !== 'FULL' ? 'group-hover:translate-x-1' : ''}`}>🤖 100% Génération</div>
                  <p className="text-xs text-blue-100/60 mt-1 font-normal">Aucune caméra utilisée.</p>
                </div>
            </button>
            <button 
              type="button" 
              onClick={() => setCustomValue('aiClassification', 'HYBRID')} 
              className={`group relative p-4 md:p-5 h-auto rounded-2xl border text-left transition-all duration-300 overflow-hidden ${formData.aiClassification === 'HYBRID' ? 'bg-gradient-to-br from-purple-600/40 to-purple-900/40 border-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'bg-black/20 border-white/10 hover:border-purple-400/50 hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]'}`}
            >
                <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 transition-opacity duration-300 ${formData.aiClassification !== 'HYBRID' ? 'group-hover:opacity-100' : ''}`}></div>
                <div className="relative z-10">
                  <div className={`font-bold text-base md:text-lg transition-transform duration-300 ${formData.aiClassification !== 'HYBRID' ? 'group-hover:translate-x-1' : ''}`}>🤝 Production Hybride</div>
                  <p className="text-xs text-purple-100/60 mt-1 font-normal">Mélange de tournage et d'IA.</p>
                </div>
            </button>
        </div>
        {errors.aiClassification && <p className="text-red-400 text-sm mt-2">{errors.aiClassification}</p>}
        
        <div className="mt-6 space-y-4">
            <div>
                <label className="block text-sm text-gray-300 mb-2">Stack Technologique *</label>
                <textarea name="aiStack" rows="2" value={formData.aiStack} onChange={handleChange} className={glassTextAreaClasses}></textarea>
            </div>
            <div>
                <label className="block text-sm text-gray-300 mb-2">Méthodologie Créative *</label>
                <textarea name="aiMethodology" rows="2" value={formData.aiMethodology} onChange={handleChange} className={glassTextAreaClasses}></textarea>
            </div>
        </div>
      </div>
    </div>
  );
}