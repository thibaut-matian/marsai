import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSubmission } from "../hooks/useSubmission";
import StepIdentity from "../components/submission/StepIdentity";
import StepContact from "../components/submission/StepContact";
import StepAssets from "../components/submission/StepAssets";
import StepDetails from "../components/submission/StepDetails";

export default function Submission() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showToast, setShowToast] = useState(false);
  
  const { 
    step, formData, errors, isSubmitted, isLoading, handleChange, handleFileChange, handleStillsChange, 
    setCustomValue, addTeamMember, removeTeamMember, updateTeamMember, 
    handleNext, handlePrev 
  } = useSubmission(t);

  // Affiche le toast dès qu'il y a des erreurs de validation
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const handleCloseModal = () => {
    navigate("/");
  };

  return (
    <div data-theme="marsai" className="min-h-screen bg-gray-900 text-gray-200 px-4 pt-20 pb-8 md:py-20 font-sans flex flex-col md:items-center md:justify-center font-light">
      <div className="w-full max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="border border-gray-700 bg-black text-white hover:bg-gray-800 hover:text-white rounded px-4 py-2 text-sm transition-all mb-6 text-left"
        >
          ← {t('submission.backToHome')}
        </button>
      </div>

      <div className="w-full max-w-3xl bg-gray-950 border border-gray-700 p-6 md:p-8 rounded-lg relative overflow-hidden shadow-xl shadow-black/40">
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6 text-gray-200">
            {t('submission.title')}
          </h1>
          <div className="flex gap-2 md:gap-3 mb-3 px-2">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className={`h-0.5 md:h-1 flex-1 rounded transition-all duration-500 ${step >= num ? 'bg-gray-400 text-white' : 'bg-gray-800'}`}
              ></div>
            ))}
          </div>
          <p className="text-right text-xs md:text-sm text-gray-400 font-medium tracking-wider uppercase">
            {t('submission.stepLabel', { current: step, total: 4 })}
          </p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex-1 min-h-[350px] md:min-h-[400px] space-y-6">
          {step === 1 && <StepIdentity formData={formData} handleChange={handleChange} setCustomValue={setCustomValue} errors={errors} />}
          {step === 2 && <StepContact formData={formData} handleChange={handleChange} errors={errors} />}
          {step === 3 && <StepAssets formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleStillsChange={handleStillsChange} setCustomValue={setCustomValue} errors={errors} />}
          {step === 4 && <StepDetails formData={formData} handleChange={handleChange} addTeamMember={addTeamMember} removeTeamMember={removeTeamMember} updateTeamMember={updateTeamMember} errors={errors} />}
          
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col sm:flex-row gap-4 md:gap-6 border-t border-gray-700">
            {step > 1 && !isLoading && (
              <button 
                type="button" 
                onClick={handlePrev} 
                className="border border-gray-700 bg-black text-white hover:bg-gray-800 hover:text-white sm:w-1/3 rounded h-10 md:h-12 order-2 sm:order-1 transition-all"
              >
                ← {t('submission.prev')}
              </button>
            )}
            <button 
              type="button" 
              onClick={handleNext} 
              disabled={isLoading}
              className={`flex-1 rounded h-10 md:h-12 border border-white/20 bg-white text-black font-bold transition-all order-1 sm:order-2 ${step === 1 ? 'w-full' : ''} ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/90'}`}
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                step === 4 ? t('submission.submit') : `${t('submission.next')} →`
              )}
            </button>
          </div>
        </form>
      </div>

      {isSubmitted && (
        <dialog open className="modal modal-open">
          <div className="modal-box bg-gray-900 border border-gray-700 text-center mx-4">
            <h3 className="font-bold text-xl md:text-2xl text-gray-200">
              {t('submission.success.title')}
            </h3>
            <p className="py-4 text-sm md:text-base text-gray-300">
              {t('submission.success.message')}
            </p>
            <div className="modal-action justify-center">
              <button onClick={handleCloseModal} className="bg-black border border-gray-700 text-white rounded px-6 md:px-8 text-sm md:text-base">
                {t('submission.backToHome')}
              </button>
            </div>
          </div>
          <div className="modal-backdrop bg-black/60 backdrop-blur-sm" onClick={handleCloseModal}></div>
        </dialog>
      )}

      {/* Toast erreurs de validation */}
      {showToast && (
        <div className="toast toast-end toast-bottom z-50">
          <div className="alert alert-error shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
            <span>
              {Object.keys(errors).length === 1
                ? "1 champ obligatoire est manquant."
                : `${Object.keys(errors).length} champs obligatoires sont manquants.`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}