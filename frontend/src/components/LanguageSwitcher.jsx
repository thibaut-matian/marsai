import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  // On utilise 'common' pour être raccord avec le reste du site
  const { i18n, t } = useTranslation('common');

  const currentLanguage = i18n.language ? i18n.language.split('-')[0].toUpperCase() : 'FR';

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-ghost text-white font-semibold">
        {currentLanguage}
      </button>
      <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box shadow z-50 w-40 p-2 border border-white/20">
        <li>
          <button 
            onClick={() => i18n.changeLanguage('fr')}
            className={i18n.language === 'fr' ? 'bg-white text-black font-semibold' : 'bg-black text-white hover:bg-white/10'}
          >
            {t('fr')}
          </button>
        </li>
        <li>
          <button 
            onClick={() => i18n.changeLanguage('en')}
            className={i18n.language === 'en' ? 'bg-white text-black font-semibold' : 'bg-black text-white hover:bg-white/10'}
          >
            {t('en')}
          </button>
        </li>
      </ul>
    </div>
  );
}