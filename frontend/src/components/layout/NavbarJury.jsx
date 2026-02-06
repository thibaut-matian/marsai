import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavbarJury() {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
const location = useLocation();

// Empêcher le scroll du body quand le menu mobile est ouvert
useEffect(() => {
if (isOpen) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = 'unset';
}
return () => { document.body.style.overflow = 'unset'; };
}, [isOpen]);

// Fonction pour vérifier si un lien est actif
const isActive = (path) => location.pathname === path;

return (
<>
{/* --- BARRE DE NAVIGATION (Desktop & Mobile Sticky) --- */}
<nav className="w-full h-20 bg-[#0f0c29]/90 backdrop-blur-md border-b border-white/5 fixed top-0 left-0 z-50 px-6 md:px-12 flex items-center justify-between transition-all duration-300">
    
    {/* 1. GAUCHE : Retour Site Public + Titre Page */}
    <div className="flex items-center gap-6 z-50">
        <Link 
            to="/" 
            className="text-white/50 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
            title="Retour au site public"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </Link>
        <span className="text-lg md:text-xl font-medium text-white tracking-wide truncate">
            Interface de notation
        </span>
    </div>

    {/* 2. CENTRE : Menu Desktop (Caché sur mobile) */}
    <div className="hidden md:flex items-center gap-8 bg-black/20 px-8 py-2 rounded-full border border-white/5">
        <Link 
            to="/jury/dashboard" 
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive('/jury/dashboard') ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
            Films à noter
        </Link>
        <div className="w-1 h-1 rounded-full bg-gray-700"></div>
        <Link 
            to="/jury/ranking" 
            className={`text-sm font-bold uppercase tracking-widest transition-colors ${isActive('/jury/ranking') ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
        >
            Mon Classement
        </Link>
    </div>

    {/* 3. DROITE : Actions & Profil (Desktop) */}
    <div className="hidden md:flex items-center gap-6">
        {/* Notification */}
        <button className="text-white/70 hover:text-white relative p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
        </button>
        
        {/* Séparateur */}
        <div className="h-8 w-[1px] bg-white/10"></div>

        {/* Profil Jury */}
        <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right">
                <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">Marro Veronique</p>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">Jury 2026</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[2px] shadow-lg shadow-purple-900/20">
                <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-xs font-bold text-white">VM</div>
            </div>
        </div>
    </div>

    {/* 4. MOBILE : Bouton Burger */}
    <div className="flex-none md:hidden z-50">
        <button
            className="btn btn-ghost btn-circle text-white"
            onClick={() => setIsOpen(true)}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
</nav>

{/* --- OVERLAY MENU MOBILE (Style Jury) --- */}
<div 
    className={`fixed inset-0 z-[60] bg-[#0f0c29] transform transition-all duration-300 ease-in-out flex flex-col ${
        isOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
    }`}
>
    {/* Header du Menu Mobile */}
    <div className="flex justify-between items-center p-6 border-b border-white/10">
        <span className="text-xl font-bold text-white">Menu Jury</span>
        <button 
            onClick={() => setIsOpen(false)}
            className="text-white p-2 hover:text-red-400 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    </div>

    {/* Contenu du menu mobile */}
    <div className="flex flex-col items-center justify-center flex-1 space-y-8 p-6">
        
        {/* Avatar Mobile */}
        <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-[3px] mb-4 shadow-[0_0_20px_rgba(124,58,237,0.3)]">
            <div className="h-full w-full rounded-full bg-black flex items-center justify-center text-2xl font-bold text-white">VM</div>
            </div>
            <h3 className="text-2xl font-bold text-white">Vero Marro</h3>
            <p className="text-blue-400 uppercase tracking-widest text-sm">Membre du Jury</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col items-center space-y-6 w-full">
            <Link 
                to="/jury/dashboard" 
                onClick={() => setIsOpen(false)}
                className={`text-xl font-light transition-colors w-full text-center py-3 border-b border-white/5 ${isActive('/jury/dashboard') ? 'text-white font-bold' : 'text-gray-400'}`}
            >
                Films à noter
            </Link>
            <Link 
                to="/jury/ranking" 
                onClick={() => setIsOpen(false)}
                className={`text-xl font-light transition-colors w-full text-center py-3 border-b border-white/5 ${isActive('/jury/ranking') ? 'text-white font-bold' : 'text-gray-400'}`}
            >
                Mon Classement
            </Link>
        </nav>

        {/* Bouton Quitter */}
        <div className="pt-8 w-full">
            <button 
                onClick={() => { setIsOpen(false); navigate('/'); }}
                className="w-full bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-400 transition-all flex items-center justify-center gap-3"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Quitter l'espace Jury
            </button>
        </div>
    </div>
</div>
</>
);
}