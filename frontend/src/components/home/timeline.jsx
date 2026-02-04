import React, { useState } from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, label: 'INSCRIPTIONS' },
  { id: 2, label: 'DÉLIBÉRATION' },
  { id: 3, label: 'FESTIVAL' },
];

const MovieTimeline = () => {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="bg-black flex flex-col items-center justify-center p-8 text-white font-sans">
      
      {/* Container de la Timeline */}
      <div className="relative w-full max-w-3xl mb-12">
        
        {/* Ligne de fond (grise) */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-700 -translate-y-1/2" />

        {/* Ligne de progression (blanche/lumineuse) */}
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-y-1/2"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Étapes */}
        <div className="relative flex justify-between items-center w-full">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center group cursor-pointer" onClick={() => setActiveStep(step.id)}>
              
              {/* Point de la timeline */}
              <div className="relative flex items-center justify-center">
                {activeStep === step.id && (
                  <motion.div 
                    layoutId="glow"
                    className="absolute w-6 h-6 bg-cyan-400/30 rounded-full blur-md"
                  />
                )}
                <div className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  activeStep >= step.id ? 'bg-white border-white scale-125' : 'bg-gray-800 border-gray-600'
                }`} />
              </div>

              {/* Label de l'étape */}
              <span className={`absolute -bottom-8 text-[10px] tracking-[0.2em] font-bold transition-colors duration-300 ${
                activeStep === step.id ? 'text-white' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieTimeline;