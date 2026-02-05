import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { id: 1, label: 'INSCRIPTIONS' },
  { id: 2, label: 'DÉLIBÉRATION' },
  { id: 3, label: 'FESTIVAL' },
];

// On passe activeStep en paramètre (prop)
const MovieTimeline = ({ activeStep = 2 }) => {
  return (
    <div className="bg-black flex flex-col items-center justify-center p-8 text-white font-sans py-20">
      
      {/* Container de la Timeline */}
      <div className="relative w-full max-w-3xl mb-12">
        
        {/* Ligne de fond (grise) */}
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gray-700 -translate-y-1/2" />

        {/* Ligne de progression */}
        <motion.div 
          className="absolute top-1/2 left-0 h-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] -translate-y-1/2"
          initial={{ width: "0%" }}
          animate={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

 {/* Étapes */}
<div className="relative flex justify-between items-center w-full px-2">
  {steps.map((step) => (
    <div key={step.id} className="flex flex-col items-center w-1/3"> {/* w-1/3 force l'espace égal */}
      
      {/* Point de la timeline */}
      <div className="relative flex items-center justify-center">
        {activeStep === step.id && (
          <motion.div 
            layoutId="glow"
            className="absolute w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full blur-md"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
        <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-500 ${
          activeStep >= step.id ? 'bg-white border-white scale-110 md:scale-125' : 'bg-gray-800 border-gray-600'
        }`} />
      </div>

      {/* Label - whitespace-normal pour mobile pour éviter de déborder */}
      <span className={`mt-4 text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.2em] font-bold text-center uppercase transition-colors duration-500 ${
        activeStep === step.id ? 'text-white' : 'text-gray-600'
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