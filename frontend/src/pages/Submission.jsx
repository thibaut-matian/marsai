import { useSubmission } from "../hooks/useSubmission";
import StepIdentity from "../components/submission/StepIdentity";
import StepContact from "../components/submission/StepContact";
import StepAssets from "../components/submission/StepAssets";
import StepDetails from "../components/submission/StepDetails";

export default function Submission() {
const { 
step, formData, errors, handleChange, handleFileChange, handleStillsChange, 
setCustomValue, addTeamMember, removeTeamMember, updateTeamMember, 
handleNext, handlePrev 
} = useSubmission();

return (
<div className="min-h-screen bg-gray-900 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900 via-gray-900 to-black text-white p-4 font-sans flex flex-col md:items-center md:justify-center md:py-20 font-light">
    <div className="w-full max-w-4xl backdrop-blur-xl bg-white/10 border border-white/20 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden">
    
    {/* HEADER PROGRESSION */}
    <div className="mb-10">
        <h1 className="text-4xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-sm">Candidature MarsAI</h1>
        <div className="flex gap-3 mb-3 px-2">
            {[1, 2, 3, 4].map((num) => (
            <div key={num} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= num ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-white/20'}`}></div>
            ))}
        </div>
        <p className="text-right text-sm text-blue-200/70 font-medium tracking-wider">ÉTAPE {step} / 4</p>
    </div>

    <form onSubmit={(e) => e.preventDefault()} className="flex-1 min-h-[400px]">
        
        {step === 1 && <StepIdentity formData={formData} handleChange={handleChange} setCustomValue={setCustomValue} errors={errors} />}
        
        {step === 2 && <StepContact formData={formData} handleChange={handleChange} errors={errors} />}
        
        {step === 3 && <StepAssets formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} handleStillsChange={handleStillsChange} setCustomValue={setCustomValue} errors={errors} />}
        
        {step === 4 && <StepDetails formData={formData} handleChange={handleChange} addTeamMember={addTeamMember} removeTeamMember={removeTeamMember} updateTeamMember={updateTeamMember} errors={errors} />}

        {/* NAVIGATION */}
        <div className="mt-12 pt-8 flex gap-6 border-t border-white/10">
        {step > 1 && <button onClick={handlePrev} className="w-1/3 py-4 rounded-2xl border border-white/20 text-white/70 font-bold hover:bg-white/10 hover:text-white transition-all">← Retour</button>}
        <button onClick={handleNext} className={`flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold shadow-[0_5px_20px_-5px_rgba(99,102,241,0.6)] transition-all duration-500 ${step === 1 ? 'w-full' : ''}`}>
            {step === 4 ? "Envoyer " : "Suivant →"}
        </button>
        </div>
    </form>
    </div>
</div>
);
}