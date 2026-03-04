import { useTranslation } from 'react-i18next';

export default function AboutSection({ title, paragraph1, paragraph2 }) {
  const { t } = useTranslation();

  return (
    <div className="pb-16 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white uppercase tracking-widest">
          {title || t('home.about')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto">
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            {paragraph1 || t('home.welcome')}
          </p>
          <p className="text-sm md:text-base text-white/80 leading-relaxed">
            {paragraph2 || t('home.mission')}
          </p>
        </div>
      </div>
    </div>
  );
}