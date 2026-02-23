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
<div data-theme="marsai" className="min-h-screen bg-gray-900 text-gray-200 px-4 pt-20 pb-8 md:py-20 font-sans flex flex-col md:items-center md:justify-center font-light">
    <div className="w-full max-w-3xl bg-gray-950 border border-gray-700 p-6 md:p-8 rounded-lg relative overflow-hidden shadow-xl shadow-black/40">
    {/* HEADER PROGRESSION */}
    <div className="mb-8 md:mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-gray-200">Candidature MarsAI</h1>
        <div className="flex gap-2 md:gap-3 mb-3 px-2">
            {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`h-0.5 md:h-1 flex-1 rounded transition-all duration-500 ${step >= num ? 'bg-gray-700' : 'bg-gray-800'}`}></div>
            ))}
        </div>
        <p className="text-right text-xs md:text-sm text-gray-400 font-medium tracking-wider">ÉTAPE {step} / 4</p>
    </div>
    <form onSubmit={(e) => e.preventDefault()} className="flex-1 min-h-[350px] md:min-h-[400px] space-y-6">
        {step === 1 && <StepIdentity formData={formData} handleChange={handleChange} setCustomValue={setCustomValue} errors={errors} />}
        {step === 2 && <StepContact formData={formData} handleChange={handleChange} errors={errors} />}
        {step === 3 && <StepAssets formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleStillsChange={handleStillsChange} setCustomValue={setCustomValue} errors={errors} />}
        {step === 4 && <StepDetails formData={formData} handleChange={handleChange} addTeamMember={addTeamMember} removeTeamMember={removeTeamMember} updateTeamMember={updateTeamMember} errors={errors} />}
        {/* NAVIGATION */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row gap-4 md:gap-6 border-t border-gray-700">
          {step > 1 && !isLoading && (
            <button type="button" onClick={handlePrev} className="border border-gray-700 bg-black text-white hover:bg-gray-800 hover:text-white sm:w-1/3 rounded h-10 md:h-12 order-2 sm:order-1 transition-all">
              ← Retour
            </button>
          )}
          <button 
            type="button" 
            onClick={handleNext} 
            disabled={isLoading}
            className={`flex-1 rounded h-10 md:h-12 border-0 bg-blue-900 text-white font-bold transition-all order-1 sm:order-2 ${step === 1 ? 'w-full' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-800'}`}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              step === 4 ? "Envoyer" : "Suivant →"
            )}
          </button>
        </div>
    </form>
    </div>
    {/* MODAL SUCCÈS */}
    {isSubmitted && (
      <dialog open className="modal modal-open">
        <div className="modal-box bg-gray-900 border border-gray-700 text-center mx-4">
          <h3 className="font-bold text-xl md:text-2xl text-gray-200">Candidature envoyée !</h3>
          <p className="py-4 text-sm md:text-base text-gray-300">
            Votre dossier a été soumis avec succès. Vous avez reçu un token d'accès unique.
          </p>
          <p className="text-xs text-gray-400 mb-4">Consultez la console pour voir votre token JWT</p>
          <div className="modal-action justify-center">
            <button onClick={handleCloseModal} className="bg-black border border-gray-700 text-white rounded px-6 md:px-8 text-sm md:text-base">
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