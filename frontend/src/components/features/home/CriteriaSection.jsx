import { useTranslation } from 'react-i18next';

export default function CriteriaSection({ title, items = [] }) {
  const { t } = useTranslation();

  return (
    <div className="py-12 md:py-16 bg-black overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white uppercase tracking-widest">
          {title || t('home.criteria')}
        </h2>

        <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
          {items.map((critere, index) => (
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
  );
}