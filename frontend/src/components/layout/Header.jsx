import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../LanguageSwitcher";
import { useHomeData } from "../../hooks/useHomeData";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const { content } = useHomeData();

    // ✅ Récupérer les données dynamiques
    const navData = content?.navigation || {};
    const logoText = navData.logoText || 'MarsAI';
    const navLinks = navData.links || [];
    const submitButton = navData.submitButton || { text: t('nav.submit'), url: '/submit-movie', enabled: true };

    // Empêcher le scroll du body quand le menu est ouvert
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if (location.pathname !== '/') {
                setShowLogo(true);
                return;
            }

            const isPageScrollable = document.documentElement.scrollHeight > window.innerHeight;

            if (window.scrollY > 400 || !isPageScrollable ) {
                setShowLogo(true);
            } else {
                setShowLogo(false);
            }
        };
        
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location.pathname]);

    return (
        <>
            {/* Barre de navigation Principale */}
            <header className="navbar bg-transparent backdrop-blur-md border-b border-white/10 fixed top-0 z-40">
                <div className="flex-1">
                    <Link to="/" 
                        className={`btn btn-ghost text-xl text-white transform transition-all hover:text-black duration-500 ease-in-out ${
                            showLogo 
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 -translate-y-4 pointer-events-none'
                        }`}
                    >
                        {logoText}
                    </Link>                
                </div>

                {/* Menu Desktop */}
                <div className="flex-none hidden md:flex gap-1 items-center">
                    <ul className="menu menu-horizontal px-1 text-white">
                        {/* ✅ Liens dynamiques */}
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <Link to={link.url}>{link.label}</Link>
                            </li>
                        ))}
                        
                        {/* ✅ Bouton CTA conditionnel */}
                        {submitButton.enabled && (
                            <li className="ml-4">
                                <button 
                                    onClick={() => navigate(submitButton.url)}
                                    className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
                                >
                                    {submitButton.text}
                                </button>
                            </li>
                        )}
                    </ul>
                    <LanguageSwitcher />
                </div>

                {/* Bouton Burger (Mobile) */}
                <div className="flex-none md:hidden">
                    <button
                        className="btn btn-ghost btn-circle text-white"
                        onClick={() => setIsOpen(true)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </header>

            {/* OVERLAY MENU MOBILE */}
            <header 
                className={`fixed inset-0 z-50 bg-[#1a1a1d] transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
            >
                {/* Bouton Fermer */}
                <button 
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 text-white p-2 hover:text-gray-300 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Contenu du menu centré */}
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    
                    {/* Liens de navigation */}
                    <nav className="flex flex-col items-center space-y-8 text-white">
                        <Link 
                            to="/" 
                            onClick={() => setIsOpen(false)}
                            className="text-2xl font-light hover:text-gray-400 transition-colors"
                        >
                            {t('nav.home')}
                        </Link>
                        
                        {/* ✅ Liens dynamiques mobile */}
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index}
                                to={link.url} 
                                onClick={() => setIsOpen(false)}
                                className="text-2xl font-light hover:text-gray-400 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Bouton d'action principal */}
                    <div className="pt-4 flex flex-col items-center gap-6">
                        {/* ✅ Bouton CTA mobile conditionnel */}
                        {submitButton.enabled && (
                            <button 
                                onClick={() => { setIsOpen(false); navigate(submitButton.url); }}
                                className="bg-white text-black px-8 py-3 rounded-md font-medium text-lg hover:scale-105 transition-transform"
                            >
                                {submitButton.text}
                            </button>
                        )}
                        
                        {/* Sélecteur de langue */}
                        <div className="flex gap-6">
                            <button
                                onClick={() => { i18n.changeLanguage('fr'); setIsOpen(false); }}
                                className={`font-medium transition-colors text-lg ${
                                    i18n.language === 'fr'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                Français
                            </button>
                            <button
                                onClick={() => { i18n.changeLanguage('en'); setIsOpen(false); }}
                                className={`font-medium transition-colors text-lg ${
                                    i18n.language === 'en'
                                        ? 'text-white'
                                        : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                English
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pied de page (AIF 2026) */}
                <div className="absolute bottom-12 left-0 right-0 text-center">
                    <p className="text-white/30 text-4xl font-bold tracking-widest uppercase">
                        MarsAI 2026 <span className="text-xs align-top opacity-50">INFO</span>
                    </p>
                </div>
            </header>
        </>
    );
}