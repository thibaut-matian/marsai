import { Input, glassTextAreaClasses } from "./FormUI";

export default function StepAssets({ formData, handleChange, handleFileChange, handleStillsChange, setCustomValue, errors }) {
  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-white/90">Livrables Multimédias</h2>

      {/* 1. VIDÉO */}
      <div className={`relative group p-6 rounded-3xl border-2 border-dashed transition-all ${errors.videoFile ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-black/20 hover:border-blue-400/50 hover:bg-black/40'}`}>
        <label className="flex flex-col items-center justify-center cursor-pointer h-32">
            <div className="text-4xl mb-2">☁️</div>
            <span className="text-lg font-bold text-white mb-1">{formData.videoFile ? formData.videoFile.name : "Fichier Source Vidéo *"}</span>
            <span className="text-sm text-blue-200/60">{formData.videoFile ? "Fichier prêt" : ".MP4, .MOV (Max 400 Mo)"}</span>
            <input type="file" name="videoFile" accept="video/*" onChange={handleFileChange} className="hidden" />
        </label>
        {errors.videoFile && <p className="absolute bottom-2 left-0 w-full text-center text-red-400 text-xs font-bold">{errors.videoFile}</p>}
      </div>
      <Input label="URL Source YouTube *" name="filmUrl" value={formData.filmUrl} onChange={handleChange} placeholder="https://youtube.com/..." error={errors.filmUrl} />

      {/* 2. ACCESSIBILITÉ */}
      <div className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
          <h3 className="text-blue-300 font-bold text-sm tracking-wide mb-4">ACCESSIBILITÉ</h3>
          <label className="flex items-center gap-4 cursor-pointer mb-4">
            <input type="checkbox" name="needsSubtitles" checked={formData.needsSubtitles} onChange={handleChange} className="w-5 h-5 rounded border-white/30 bg-black/30 checked:bg-blue-500" />
            <span className="text-sm text-white">Présence de voix ou de textes nécessitant des sous-titres</span>
          </label>
          {formData.needsSubtitles && (
              <div className="animate-fade-in">
                  <label className="block text-sm text-blue-200/80 mb-2">Fichier Sous-titres (.srt) *</label>
                  <input type="file" name="subtitleFile" accept=".srt" onChange={handleFileChange} className={`w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 ${errors.subtitleFile ? 'ring-2 ring-red-500 rounded-lg' : ''}`} />
                  {errors.subtitleFile && <p className="text-red-400 text-xs mt-1">{errors.subtitleFile}</p>}
              </div>
          )}
      </div>

      {/* 3. IMAGES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className={`p-4 rounded-2xl border border-white/10 bg-black/20 ${errors.thumbnailFile ? 'border-red-500' : ''}`}>
            <label className="block text-sm text-blue-300 mb-2 font-bold">Vignette (16:9) *</label>
            <input type="file" name="thumbnailFile" accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white" />
            {errors.thumbnailFile && <p className="text-red-400 text-xs mt-1">{errors.thumbnailFile}</p>}
         </div>
         <div className="p-4 rounded-2xl border border-white/10 bg-black/20">
            <label className="block text-sm text-blue-300 mb-2 font-bold">Galerie (Max 3)</label>
            <input type="file" multiple accept="image/*" onChange={handleStillsChange} className="w-full text-sm text-gray-400 file:py-2 file:px-4 file:rounded-full file:bg-white/10 file:text-white" />
            <div className="flex gap-2 mt-2">
                {formData.stillsFiles.map((file, i) => (
                    <div key={i} className="text-xs bg-white/10 px-2 py-1 rounded text-white/70 truncate max-w-[100px]">{file.name}</div>
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
         
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <button type="button" onClick={() => setCustomValue('aiClassification', 'FULL')} className={`p-4 rounded-2xl border text-left ${formData.aiClassification === 'FULL' ? 'bg-blue-900/40 border-blue-400' : 'bg-black/20 border-white/10'}`}>
                <div className="font-bold">🤖 100% Génération</div>
                <p className="text-xs text-blue-100/60 mt-1">Aucune caméra utilisée.</p>
            </button>
            <button type="button" onClick={() => setCustomValue('aiClassification', 'HYBRID')} className={`p-4 rounded-2xl border text-left ${formData.aiClassification === 'HYBRID' ? 'bg-purple-900/40 border-purple-400' : 'bg-black/20 border-white/10'}`}>
                <div className="font-bold">🤝 Production Hybride</div>
                <p className="text-xs text-purple-100/60 mt-1">Mélange de tournage et d'IA.</p>
            </button>
         </div>
         {errors.aiClassification && <p className="text-red-400 text-sm mt-2">{errors.aiClassification}</p>}
         
         <div className="mt-6 space-y-4">
             <div>
                <label className="block text-sm text-blue-200/80 mb-2">Stack Technologique *</label>
                <textarea name="aiStack" rows="2" value={formData.aiStack} onChange={handleChange} className={glassTextAreaClasses}></textarea>
             </div>
             <div>
                <label className="block text-sm text-blue-200/80 mb-2">Méthodologie Créative *</label>
                <textarea name="aiMethodology" rows="2" value={formData.aiMethodology} onChange={handleChange} className={glassTextAreaClasses}></textarea>
             </div>
         </div>
      </div>
    </div>
  );
}