import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, label: 'INSCRIPTIONS' },
  { id: 2, label: 'DÉLIBÉRATION' },
  { id: 3, label: 'FESTIVAL' },
];

const MovieTimeline = ({ activeStep = 2 }) => {
  return (
    <div className="bg-black w-full py-20 md:py-32 px-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Ligne de fond (Grise) */}
        <div className="absolute top-[30px] md:top-[40px] left-0 w-full h-[2px] bg-neutral-800" />

        {/* Ligne de progression (Blanche) - CORRECTION DU CALCUL ICI */}
        <motion.div 
          className="absolute top-[30px] md:top-[40px] left-0 h-[2px] bg-white shadow-[0_0_15px_white] z-0"
          initial={{ width: "0%" }}
          animate={{ 
            // On calcule le pourcentage exact selon l'étape active
            width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` 
          }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <div className="relative flex justify-between w-full">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center flex-1 relative">
              
              {/* Le point indicateur */}
              <div className="relative flex items-center justify-center h-[60px] md:h-[80px] z-10">
                {activeStep === step.id && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute w-12 h-12 md:w-20 md:h-20 bg-cyan-500/30 rounded-full blur-2xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  />
                )}
                
                {/* Le rond dynamique */}
                <div className={`rounded-full border-2 transition-all duration-700 ${
                  activeStep === step.id 
                    ? 'w-6 h-6 md:w-8 md:h-8 bg-cyan-400 border-cyan-400 shadow-[0_0_15px_#22d3ee]' 
                    : activeStep > step.id
                      ? 'w-5 h-5 md:w-7 md:h-7 bg-white border-white'
                      : 'w-5 h-5 md:w-7 md:h-7 bg-black border-neutral-700'
                }`} />
              </div>

              {/* Texte responsive (Uniquement l'actif sur mobile) */}
              <div className="mt-2 h-10 flex items-center justify-center">
                <span className={`
                  text-[12px] md:text-[18px] tracking-[0.2em] font-black uppercase text-center transition-all duration-500
                  ${activeStep === step.id 
                    ? 'text-white opacity-100 scale-100' 
                    : 'hidden md:block text-neutral-600' // On utilise hidden/block pour un rendu propre
                  }
                `}>
                  {step.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieTimeline;