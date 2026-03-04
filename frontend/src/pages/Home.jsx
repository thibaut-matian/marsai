import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MovieTimeline from '../components/features/home/timeline';
import { useHomeData } from '../hooks/useHomeData';
import teaserVideo from '../assets/videos/Teaser.mp4';

export default function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { t } = useTranslation();
  const { content, isLoading } = useHomeData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-screen text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src={content?.hero?.videoUrl || teaserVideo} type="video/mp4" />
        </video>
        <div className="absolute bottom-0 left-0 w-full h-96 bg-linear-to-t from-black via-black/40 to-transparent z-0"></div>

        <div className="absolute inset-0 z-10 h-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8 pb-16">
          <button
            onClick={() => navigate('/submit-movie')}
            className="btn-custom-glass">
            {content?.hero?.buttonText || t('home.submit')}
          </button>
        </div>
      </div>

      <MovieTimeline />

      {/* À propos Section */}
      <div className="pb-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white uppercase tracking-widest">
            {content?.about?.title || t('home.about')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {content?.about?.paragraph1 || t('home.welcome')}
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed">
              {content?.about?.paragraph2 || t('home.mission')}
            </p>
          </div>
        </div>
      </div>

      <hr />

      {/* Critères de soumission */}
      <div className="py-12 md:py-16 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white uppercase tracking-widest">
            {content?.criteria?.title || t('home.criteria')}
          </h2>

          <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
            {(content?.criteria?.items || []).map((critere, index) => (
              <div key={index} className="flex items-baseline text-white text-sm md:text-base w-full">
                <span className="font-bold whitespace-nowrap">{index + 1}.</span>
                <div className="grow border-b border-dotted border-white/40 mx-2 mb-1"></div>
                <span className="font-medium uppercase text-right leading-tight">
                  {critere}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Récompenses */}
      <div className="py-12 md:py-16 bg-black overflow-hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white uppercase tracking-widest">
            {content?.rewards?.title || t('home.rewards')}
          </h2>

          <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
            {(content?.rewards?.items || []).map((recompense, index) => (
              <div key={index} className="flex items-baseline text-white text-sm md:text-base w-full">
                <span className="font-bold whitespace-nowrap">{index + 1}.</span>
                <div className="grow border-b border-dotted border-white/40 mx-2 mb-1"></div>
                <span className="font-medium uppercase text-right leading-tight">
                  {recompense}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Jury Section */}
      <div className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white">
            {content?.jury?.title || t('home.jury')}
          </h2>
          <p className="text-center max-w-2xl mx-auto text-sm md:text-base text-white">
            {content?.jury?.description || t('home.juryDesc')}
          </p>
        </div>
      </div>

      <div className="relative bg-black p-4 md:p-10 overflow-hidden">
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 scrollbar-hide">
          {(content?.jury?.members || []).map((member, index) => (
            <div key={index} className="card bg-base-200 h-80 md:h-96 min-w-60 md:min-w-72 snap-center">
              <div 
                className="card-body h-full" 
                style={{ 
                  backgroundImage: `url(${member.image})`, 
                  backgroundSize: 'cover', 
                  backgroundPosition: 'center', 
                  backgroundRepeat: 'no-repeat' 
                }}
              >
                <h2 className="card-title pt-40 md:pt-60 text-base md:text-lg text-white relative z-10">
                  {member.name}
                </h2>
                <p className="text-sm md:text-base text-white relative z-10">
                  {member.title}
                </p>
                <div className="absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={() => scrollRef.current.scrollBy({ left: -325, behavior: 'smooth' })} 
          className="absolute left-2 md:left-5 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md z-10"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={() => scrollRef.current.scrollBy({ left: 325, behavior: 'smooth' })} 
          className="absolute right-2 md:right-5 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md z-10"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <hr />

      {/* Contact Section */}
      <div className="relative bg-black text-white overflow-hidden">
        <div className="py-12 md:py-16 text-center px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white">
            {content?.contact?.title || t('home.contact')}
          </h2>
        </div>

        <div className="container mx-auto px-4 pb-16 md:pb-24">
          <div className="flex flex-col lg:flex-row gap-0 border border-white/10">
            <div className="lg:w-2/5 flex flex-col justify-between p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/10">
              <div className="space-y-7">
                {/* Phone */}
                <div className="group">
                  <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1">
                    {t('home.phone')}
                  </p>
                  <p className="text-base font-light tracking-wide group-hover:text-white/70 transition-colors duration-300">
                    {content?.contact?.phone || '+06 36 65 65 65'}
                  </p>
                </div>
                
                {/* Email */}
                <div className="group">
                  <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1">
                    {t('home.email')}
                  </p>
                  <p className="text-base font-light tracking-wide break-all group-hover:text-white/70 transition-colors duration-300">
                    {content?.contact?.email || 'laissenoustrkl@degage.com'}
                  </p>
                </div>
                
                {/* Address */}
                <div className="group">
                  <p className="text-white/30 text-xs tracking-[0.3em] uppercase mb-1">
                    {t('home.address')}
                  </p>
                  <p className="text-base font-light tracking-wide leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                    {content?.contact?.address?.split('\\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < content?.contact?.address?.split('\\n').length - 1 && <br />}
                      </span>
                    )) || (
                      <>
                        155 rue Peyssonnel<br />Marseille 13002
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:w-3/5">
              <div className="w-full aspect-square lg:aspect-auto lg:h-full min-h-72 grayscale hover:grayscale-0 transition-all duration-700">
                <iframe
                  src={content?.contact?.mapUrl || "https://www.google.com/maps?q=155%20rue%20peysonnel%20marseille&output=embed"}
                  className="w-full h-full border-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </div>
  );
}