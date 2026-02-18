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
{/* --- NAVBAR --- */}
<div className="navbar bg-[#100b18]/95 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 z-50 px-4 md:px-8">
    
    {/* 1. GAUCHE : Retour Dashboard + Titre */}
    <div className="navbar-start gap-2">
        {/* Flèche de retour - cachée sur le dashboard */}
        {!isActive('/jury/DashboardJury') && (
            <Link 
                to="/jury/DashboardJury" 
                className="btn btn-ghost btn-circle hover:bg-purple-500/10"
                title="Retour au dashboard"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </Link>
        )}
        <Link 
            to="/jury/DashboardJury"
            className="text-lg md:text-xl font-medium"
        >
            Interface de notation
        </Link>
    </div>

    {/* 2. CENTRE : Menu Desktop */}
    <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal bg-white/5 border border-white/10 rounded-2xl px-2 gap-1">
            <li>
                <Link 
                    to="/jury/DashboardJury" 
                    className={`text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${isActive('/jury/DashboardJury') ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'}`}
                >
                    Films à noter
                </Link>
            </li>
            <li>
                <Link 
                    to="/jury/RankingJury" 
                    className={`text-sm font-bold uppercase tracking-widest rounded-xl transition-all ${isActive('/jury/RankingJury') ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'}`}
                >
                    Mon Classement
                </Link>
            </li>
        </ul>
    </div>

    {/* 3. DROITE : Actions & Profil (Desktop) */}
    <div className="navbar-end hidden md:flex gap-4">
        {/* Notification */}
        <button className="btn btn-ghost btn-circle hover:bg-purple-500/10">
            <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
                <span className="w-2 h-2 rounded-full bg-purple-500 indicator-item animate-pulse"></span>
            </div>
        </button>
        
        {/* Divider */}
        <div className="w-px h-8 bg-white/10"></div>

        {/* Profil Jury - Dropdown */}
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost gap-3 hover:bg-purple-500/10">
                <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-white">Marro Veronique</p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Jury 2026</p>
                </div>
                <div className="avatar placeholder">
                    <div className="w-10 h-10 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-[#100b18] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">VM</span>
                    </div>
                </div>
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-[#1a1425] border border-white/10 rounded-2xl z-[1] w-52 p-2 shadow-2xl mt-4">
                <li><a className="rounded-xl hover:bg-purple-500/10 transition-colors">Mon profil</a></li>
                <li><a className="rounded-xl hover:bg-purple-500/10 transition-colors">Paramètres</a></li>
                <li><div className="divider my-1 before:bg-white/10 after:bg-white/10"></div></li>
                <li><a onClick={() => navigate('/')} className="rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">Déconnexion</a></li>
            </ul>
        </div>
    </div>

    {/* 4. MOBILE : Drawer button */}
    <div className="navbar-end md:hidden">
        <button
            className="btn btn-ghost btn-circle hover:bg-purple-500/10"
            onClick={() => setIsOpen(true)}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
    </div>
</div>

{/* --- MENU MOBILE GLASSMORPHISM --- */}
<div className={`fixed inset-0 z-[100] transition-all duration-500 ${isOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
    {/* Backdrop blur */}
    <div 
        className="absolute inset-0 bg-[#100b18]/80 backdrop-blur-xl"
        onClick={() => setIsOpen(false)}
    />
    
    {/* Menu Panel */}
    <div className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-[#1a1425]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-white/10">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Menu Jury
            </span>
            <button 
                onClick={() => setIsOpen(false)}
                className="btn btn-circle btn-ghost btn-sm hover:bg-purple-500/10"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Contenu */}
        <div className="flex flex-col p-6 space-y-8">
            
            {/* Avatar Mobile */}
            <div className="flex flex-col items-center">
                <div className="avatar placeholder mb-4">
                    <div className="w-24 h-24 rounded-full ring-2 ring-purple-500 ring-offset-2 ring-offset-[#1a1425] bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">VM</span>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white">Vero Marro</h3>
                <div className="badge bg-purple-500/20 border-purple-500/50 text-purple-400 mt-2 gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                    Membre du Jury
                </div>
            </div>

            {/* Navigation */}
            <ul className="menu bg-white/5 rounded-2xl w-full border border-white/10 p-2 gap-1">
                <li>
                    <Link 
                        to="/jury/DashboardJury" 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl transition-all ${isActive('/jury/DashboardJury') ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                        </svg>
                        Films à noter
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/jury/RankingJury" 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 rounded-xl transition-all ${isActive('/jury/RankingJury') ? 'bg-purple-500/20 text-purple-400' : 'hover:bg-purple-500/10 text-gray-400 hover:text-white'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Mon Classement
                    </Link>
                </li>
            </ul>

            {/* Actions rapides */}
            <div className="grid grid-cols-2 gap-3">
                <button className="btn btn-ghost bg-white/5 border border-white/10 rounded-xl flex-col h-auto py-4 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-xs">Profil</span>
                </button>
                <button className="btn btn-ghost bg-white/5 border border-white/10 rounded-xl flex-col h-auto py-4 hover:bg-purple-500/10 hover:border-purple-500/30 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs">Paramètres</span>
                </button>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Bouton Quitter */}
            <button 
                onClick={() => { setIsOpen(false); navigate('/'); }}
                className="btn btn-outline border-red-500 text-red-500 hover:bg-red-600 hover:border-red-600 hover:text-white rounded-xl gap-2 w-full transition-all"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Quitter l'espace Jury
            </button>
        </div>
    </div>
</div>
</>
);
}