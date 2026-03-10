import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PlateformeLogo from "../../assets/img/logoPlateforme.png";
import MobileFilmLogo from "../../assets/img/logoMobile.png";
import { useHomeData } from "../../hooks/useHomeData";

export default function Footer() {
    const { t } = useTranslation();
    const { content } = useHomeData();

    // ✅ Récupérer les données dynamiques
    const footerData = content?.footer || {};
    const title = footerData.title || 'MarsIA';
    const links = footerData.links || [];
    const logoMobileFilm = footerData.logoMobileFilm || MobileFilmLogo;
    const logoMarsIA = footerData.logoMarsIA || PlateformeLogo;

    return (
        <footer className="flex flex-col bg-neutral-800 border-t border-white/5 p-6 text-center text-white overflow-hidden">
            <div className="flex flex-col items-center mb-4 w-full max-w-md mx-auto justify-center gap-4 md:flex-row">
                <img src={logoMobileFilm} alt="Logo MobileFilm" className="h-20 w-auto md:h-28 object-contain" />
                <p className="text-2xl font-bold">X</p>
                <img src={logoMarsIA} alt="Logo MarsIA" className="h-20 w-auto md:h-28 object-contain" />
            </div>
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-sm">
                    {/* ✅ Liens dynamiques */}
                    {links.map((link, index) => (
                        <Link key={index} to={link.url} className="hover:underline">
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}