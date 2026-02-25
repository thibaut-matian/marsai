import { useTranslation } from 'react-i18next';

const LANGUAGES = {
  fr: 'Français',
  en: 'English',
};

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLang = i18n.language ? i18n.language.split('-')[0] : 'fr';

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="px-4 py-2 text-white text-sm font-normal rounded-lg hover:bg-white/10 transition-colors">
        {currentLang.toUpperCase()}
      </button>
      <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box shadow z-50 w-40 p-2 border border-white/20">
        {Object.entries(LANGUAGES).map(([code, label]) => (
          <li key={code}>
            <button
              onClick={() => i18n.changeLanguage(code)}
              className={currentLang === code ? 'bg-white text-black font-semibold' : 'bg-black text-white hover:bg-white/10'}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}