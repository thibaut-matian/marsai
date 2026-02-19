import { useNavigate } from "react-router-dom";
import { useSubmission } from "../hooks/useSubmission";
import StepIdentity from "../components/submission/StepIdentity";
import StepContact from "../components/submission/StepContact";
import StepAssets from "../components/submission/StepAssets";
import StepDetails from "../components/submission/StepDetails";

export default function Submission() {
const navigate = useNavigate();
const { 
step, formData, errors, isSubmitted, isLoading, handleChange, handleFileChange, handleStillsChange, 
setCustomValue, addTeamMember, removeTeamMember, updateTeamMember, 
handleNext, handlePrev 
} = useSubmission();

const handleCloseModal = () => {
  navigate("/");
};

return (
<div data-theme="marsai" className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black text-white px-4 pt-20 pb-8 md:py-20 font-sans flex flex-col md:items-center md:justify-center font-light">
    <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 p-5 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
    
    {/* HEADER PROGRESSION */}
    <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">Candidature MarsAI</h1>
        <div className="flex gap-2 md:gap-3 mb-3 px-2">
            {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`h-1 md:h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= num ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/20'}`}></div>
            ))}
        </div>
        <p className="text-right text-xs md:text-sm text-blue-200/70 font-medium tracking-wider">ÉTAPE {step} / 4</p>
    </div>

    <form onSubmit={(e) => e.preventDefault()} className="flex-1 min-h-[350px] md:min-h-[400px]">
        
        {step === 1 && <StepIdentity formData={formData} handleChange={handleChange} setCustomValue={setCustomValue} errors={errors} />}
        
        {step === 2 && <StepContact formData={formData} handleChange={handleChange} errors={errors} />}
        
        {step === 3 && <StepAssets formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleStillsChange={handleStillsChange} setCustomValue={setCustomValue} errors={errors} />}
        
        {step === 4 && <StepDetails formData={formData} handleChange={handleChange} addTeamMember={addTeamMember} removeTeamMember={removeTeamMember} updateTeamMember={updateTeamMember} errors={errors} />}

        {/* NAVIGATION */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row gap-4 md:gap-6 border-t border-white/10">
          {step > 1 && !isLoading && (
            <button type="button" onClick={handlePrev} className="btn btn-outline border-white/20 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 sm:w-1/3 rounded-2xl h-12 md:h-14 order-2 sm:order-1">
              ← Retour
            </button>
          )}
          <button 
            type="button" 
            onClick={handleNext} 
            disabled={isLoading}
            className={`btn flex-1 rounded-2xl h-12 md:h-14 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold border-0 shadow-[0_5px_20px_-5px_rgba(99,102,241,0.6)] transition-all duration-500 order-1 sm:order-2 ${step === 1 ? 'w-full' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              step === 4 ? "Envoyer 🚀" : "Suivant →"
            )}
          </button>
        </div>
    </form>
    </div>

    {/* MODAL SUCCÈS */}
    {isSubmitted && (
      <dialog open className="modal modal-open">
        <div className="modal-box bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-white/20 text-center mx-4">
          <h3 className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Candidature envoyée !</h3>
          <p className="py-4 text-sm md:text-base text-white/70">
            Votre dossier a été soumis avec succès. Vous avez reçu un token d'accès unique.
          </p>
          <p className="text-xs text-white/50 mb-4">Consultez la console pour voir votre token JWT</p>
          <div className="modal-action justify-center">
            <button onClick={handleCloseModal} className="btn bg-gradient-to-r from-blue-600 to-purple-600 border-0 text-white rounded-xl px-6 md:px-8 text-sm md:text-base">
              Retour à l'accueil
            </button>
          </div>
        </div>
        <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
      </dialog>
    )}
</div>
);
}