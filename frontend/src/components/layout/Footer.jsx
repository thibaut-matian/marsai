import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PlateformeLogo from "../../assets/img/logoPlateforme.png";
import MobileFilmLogo from "../../assets/img/logoMobile.png";

export default function Footer() {
    const { t } = useTranslation();
    return (
        <footer className="flex flex-col bg-neutral-800 border-t border-white/5 p-6 text-center text-white overflow-hidden">
            <div className="flex flex-col items-center mb-4 w-full max-w-md mx-auto justify-center gap-4 md:flex-row">
                <img src={MobileFilmLogo} alt="Logo MobileFilm" className="h-20 w-auto md:h-28 object-contain" />
                <p className="text-2xl font-bold">X</p>
                <img src={PlateformeLogo} alt="Logo MarsIA" className="h-20 w-auto md:h-28 object-contain" />
            </div>
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <h2 className="text-lg font-semibold">MarsIA</h2>
                <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-end gap-x-4 gap-y-2 text-sm">
                    <Link to="/submission" className="hover:underline">{t('footer.submit')}</Link>
                    <Link to="" className="hover:underline">{t('footer.legal')}</Link>
                    <Link to="" className="hover:underline">{t('footer.cgu')}</Link>
                    <Link to="" className="hover:underline">{t('footer.privacy')}</Link>
                    <Link to="/FAQ" className="hover:underline">{t('footer.faq')}</Link>
                </div>
            </div>
        </footer>
    );
}