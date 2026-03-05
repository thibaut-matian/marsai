import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const MovieTimeline = ({ phases = [], activeStep = 1 }) => {
  const { t } = useTranslation();

  const steps = phases.length > 0 
    ? phases.map((phase, index) => ({
        id: index + 1,
        key: phase.key,
        label: phase.label,
        startDate: phase.startDate,
        endDate: phase.endDate,
        description: phase.description,
        linkUrl: phase.linkUrl,
        linkLabel: phase.linkLabel,
        linkEnabled: phase.linkEnabled
      }))
    : [
        { id: 1, label: t('home.timeline.registrations') },
        { id: 2, label: t('home.timeline.deliberation') },
        { id: 3, label: t('home.timeline.festival') },
      ];

  return (
    <div className="bg-black w-full py-20 md:py-32 px-10 overflow-hidden">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Ligne de fond (Grise) */}
        <div className="absolute top-[30px] md:top-[40px] left-0 w-full h-[2px] bg-neutral-800" />

        {/* Ligne de progression (Blanche) */}
        <motion.div 
          className="absolute top-[30px] md:top-[40px] left-0 h-[2px] bg-white shadow-[0_0_15px_white] z-0"
          initial={{ width: "0%" }}
          animate={{ 
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

              {/* Texte responsive */}
              <div className="mt-2 h-10 flex items-center justify-center">
                <span className={`
                  text-[12px] md:text-[18px] tracking-[0.2em] font-black uppercase text-center transition-all duration-500
                  ${activeStep === step.id 
                    ? 'text-white opacity-100 scale-100' 
                    : 'hidden md:block text-neutral-600'
                  }
                `}>
                  {step.label}
                </span>
              </div>

              {/* Description + Bouton (visible seulement pour l'étape active) */}
              {activeStep === step.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center max-w-[300px] space-y-4"
                >
                  {step.description && (
                    <p className="text-gray-400 text-sm hidden md:block">{step.description}</p>
                  )}
                  
                  {step.startDate && step.endDate && (
                    <p className="text-gray-500 text-xs hidden md:block">
                      {new Date(step.startDate).toLocaleDateString('fr-FR')} - {new Date(step.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  )}

                  {/* 🆕 Bouton si lien activé */}
                  {step.linkEnabled && step.linkUrl && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        to={step.linkUrl}
                        target={step.linkUrl.startsWith('http') ? '_blank' : '_self'}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
                      >
                        <span>{step.linkLabel}</span>
                        {step.linkUrl.startsWith('http') && <ExternalLink size={18} />}
                      </Link>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieTimeline;