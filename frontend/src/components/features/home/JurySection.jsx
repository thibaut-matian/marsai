import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function JurySection({ title, description, members = [] }) {
  const scrollRef = useRef(null);
  const { t } = useTranslation();

  return (
    <>
      {/* Titre et description */}
      <div className="py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white">
            {title || t('home.jury')}
          </h2>
          <p className="text-center max-w-2xl mx-auto text-sm md:text-base text-white">
            {description || t('home.juryDesc')}
          </p>
        </div>
      </div>

      {/* Carrousel des jurés */}
      <div className="relative bg-black p-4 md:p-10 overflow-hidden">
        <div ref={scrollRef} className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-8 scrollbar-hide">
          {members.map((member, index) => (
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
    </>
  );
}