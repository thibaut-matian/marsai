import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

export default function TimelinePreview({ phases = [], activeStep = 1, onStepChange }) {
  if (!phases || phases.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-8 text-center text-gray-400">
        <p>Ajoutez au moins une phase pour voir la preview</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg p-8">
      <div className="max-w-4xl mx-auto">
        {/* Contrôles */}
        <div className="mb-8 flex items-center justify-center gap-4">
          <button
            onClick={() => onStepChange(Math.max(1, activeStep - 1))}
            disabled={activeStep === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Précédent
          </button>
          
          <span className="text-white font-bold">
            Étape {activeStep} / {phases.length}
          </span>
          
          <button
            onClick={() => onStepChange(Math.min(phases.length, activeStep + 1))}
            disabled={activeStep === phases.length}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant →
          </button>
        </div>

        {/* Timeline visuelle */}
        <div className="relative">
          <div className="absolute top-[30px] left-0 w-full h-[2px] bg-gray-700" />
          <motion.div 
            className="absolute top-[30px] left-0 h-[2px] bg-white shadow-[0_0_15px_white]"
            initial={false}
            animate={{ 
              width: `${((activeStep - 1) / (phases.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />

          <div className="relative flex justify-between w-full">
            {phases.map((phase, index) => {
              const stepNum = index + 1;
              const isActive = activeStep === stepNum;
              const isCompleted = activeStep > stepNum;

              return (
                <div key={index} className="flex flex-col items-center flex-1 relative">
                  <div className="relative flex items-center justify-center h-[60px]">
                    {isActive && (
                      <motion.div 
                        className="absolute w-16 h-16 bg-cyan-500/30 rounded-full blur-2xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                      />
                    )}
                    
                    <button
                      onClick={() => onStepChange(stepNum)}
                      className={`rounded-full border-2 transition-all duration-300 cursor-pointer hover:scale-110 ${
                        isActive 
                          ? 'w-8 h-8 bg-cyan-400 border-cyan-400 shadow-[0_0_15px_#22d3ee]' 
                          : isCompleted
                            ? 'w-7 h-7 bg-white border-white'
                            : 'w-7 h-7 bg-gray-900 border-gray-600'
                      }`}
                    />
                  </div>

                  <div className="mt-2 text-center">
                    <span className={`
                      text-sm font-bold uppercase tracking-wider transition-all duration-300
                      ${isActive ? 'text-white' : 'text-gray-500'}
                    `}>
                      {phase.label || `Phase ${stepNum}`}
                    </span>
                  </div>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-center max-w-[200px] space-y-3"
                    >
                      {phase.description && (
                        <p className="text-gray-400 text-xs">{phase.description}</p>
                      )}
                      {phase.startDate && phase.endDate && (
                        <p className="text-gray-500 text-xs">
                          {new Date(phase.startDate).toLocaleDateString('fr-FR')} - {new Date(phase.endDate).toLocaleDateString('fr-FR')}
                        </p>
                      )}
                      
                      {/* 🆕 Bouton preview */}
                      {phase.linkEnabled && phase.linkUrl && (
                        <div className="pt-2">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500 text-white text-xs font-semibold rounded-lg">
                            {phase.linkLabel}
                            {phase.linkUrl.startsWith('http') && <ExternalLink size={14} />}
                          </span>
                          <p className="text-gray-500 text-xs mt-1">→ {phase.linkUrl}</p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">
            💡 Cliquez sur les boutons ou les points pour changer d'étape
          </p>
        </div>
      </div>
    </div>
  );
}