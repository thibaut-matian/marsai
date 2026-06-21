import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function HeroSection({ videoUrl, buttonText, buttonEnabled }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      <video
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute bottom-0 left-0 w-full h-96 bg-linear-to-t from-black via-black/40 to-transparent z-0"></div>

      <div className="absolute inset-0 z-10 h-full flex flex-col items-center justify-end px-4 sm:px-6 md:px-8 pb-16">
        {/* ✅ Afficher le bouton uniquement si buttonEnabled est true */}
        {buttonEnabled && (
          <button
            onClick={() => navigate('/submit-movie')}
            className="btn-custom-glass"
          >
            {buttonText || t('home.submit')}
          </button>
        )}
      </div>
    </div>
  );
}