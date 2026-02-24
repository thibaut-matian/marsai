import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-sm btn-ghost text-white font-semibold">
        {i18n.language.toUpperCase()}
      </button>
      <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box shadow z-50 w-40 p-2 border border-white/20">
        <li>
          <button onClick={() => i18n.changeLanguage('fr')}
             className={i18n.language === 'fr' ? 'bg-white text-black font-semibold' : 'bg-black text-white hover:bg-white/10'}>
            Français
          </button>
        </li>
        <li>
          <button onClick={() => i18n.changeLanguage('en')}
             className={i18n.language === 'en' ? 'bg-white text-black font-semibold' : 'bg-black text-white hover:bg-white/10'}>
            English
          </button>
        </li>
      </ul>
    </div>
  );
}
