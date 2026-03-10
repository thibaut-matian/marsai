import React from "react";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useEventPlanning } from "../hooks/useEventPlanning";

export default function Planning() {
    const { t } = useTranslation();
    const { 
        fridayOpen, 
        saturdayOpen, 
        isDesktop, 
        fridayEvents, 
        saturdayEvents, 
        toggleFriday, 
        toggleSaturday 
    } = useEventPlanning();

    const navigate = useNavigate();

    const EventCard = ({ event }) => (
        <div className="group card bg-white/5 border border-white/20 shadow-md cursor-pointer hover:border-white/40 hover:bg-white/10 hover:shadow-lg transition-all duration-300">
            <div className="card-body p-4">
                <div className="flex gap-4 items-center">
                    <div className="avatar overflow-hidden rounded border border-white/30 group-hover:border-white/50 transition-colors">
                        <div className="w-24 h-16">
                            <img src={event.image}
                                alt={t(event.title)}
                                className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="card-title text-sm text-white group-hover:text-white transition-colors line-clamp-1">{t(event.title)}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors font-semibold">{event.time}</p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1 transition-colors line-clamp-2">{t(event.description)}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const SaturdayEventCard = ({ event }) => (
        <div className="group card bg-white/5 border border-white/20 shadow-md cursor-pointer hover:border-white/40 hover:bg-white/10 hover:shadow-lg transition-all duration-300">
            <div className="card-body p-4">
                <div className="flex gap-4 items-center">
                    <div className="avatar overflow-hidden rounded border border-white/30 group-hover:border-white/50 transition-colors">
                        <div className="w-24 h-16">
                            <img src={event.image}
                                alt={t(event.title)}
                                className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="card-title text-sm text-white group-hover:text-white transition-colors line-clamp-1">{t(event.title)}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors font-semibold">{event.time}</p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-400 mt-1 transition-colors line-clamp-2">{t(event.description)}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="text-white bg-black">
            <style>{`
                .scrollable-events {
                    scrollbar-color: transparent transparent;
                    scrollbar-width: thin;
                    transition: scrollbar-color 300ms ease;
                }
                
                .scrollable-events:hover {
                    scrollbar-color: #ffffff #000000;
                }
                
                /* Pour Chrome/Edge */
                .scrollable-events::-webkit-scrollbar {
                    width: 8px;
                }
                
                .scrollable-events::-webkit-scrollbar-track {
                    background: transparent;
                    transition: background 300ms ease;
                }
                
                .scrollable-events::-webkit-scrollbar-thumb {
                    background: transparent;
                    border-radius: 4px;
                    transition: background 300ms ease;
                }
                
                .scrollable-events:hover::-webkit-scrollbar-thumb {
                    background: #ffffff;
                }
            `}</style>
            <div className="container mx-auto px-4 pb-12 pt-28">
                <h1 className="text-4xl md:text-5xl font-light text-center mb-12 tracking-widest">
                    {t('planning.title')}
                </h1>

                <div className="max-w-6xl mx-auto mb-8">
                    {/* MOBILE: ACCORDION / DESKTOP: GRID */}
                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                        {/* VENDREDI */}
                        <div className="border-2 border-white/30 rounded-2xl bg-white/5 backdrop-blur overflow-hidden">
                            {/* MOBILE ACCORDION HEADER */}
                            <button
                                onClick={toggleFriday}
                                className="w-full p-6 text-left bg-white/5 hover:bg-white/10 transition flex justify-between items-center md:hidden"
                            >
                                <h1 className="text-4xl font-normal">{t('planning.friday')}</h1>
                                <span className={`text-white text-2xl transition duration-300 transform ${fridayOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {/* DESKTOP HEADER */}
                            <div className="hidden md:block p-6 bg-white/5">
                                <h1 className="text-4xl font-normal text-center">{t('planning.friday')}</h1>
                                <hr className="border-white/30 mt-4" />
                            </div>

                            {/* CONTENT: MOBILE ACCORDION / DESKTOP ALWAYS VISIBLE */}
                            {(fridayOpen || isDesktop) && (
                                <div className="p-6 border-t border-white/30 md:border-t-0 flex flex-col">
                                    <div className="space-y-3 max-h-96 overflow-y-scroll pr-2 scrollable-events">
                                        {fridayEvents.map((event) => (
                                            <div key={event.id}>
                                                <EventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SAMEDI */}
                        <div className="border-2 border-white/30 rounded-2xl bg-white/5 backdrop-blur overflow-hidden">
                            {/* MOBILE ACCORDION HEADER */}
                            <button
                                onClick={toggleSaturday}
                                className="w-full p-6 text-left bg-white/5 hover:bg-white/10 transition flex justify-between items-center md:hidden"
                            >
                                <h1 className="text-4xl font-normal">{t('planning.saturday')}</h1>
                                <span className={`text-white text-2xl transition transform duration-300 ${saturdayOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {/* DESKTOP HEADER */}
                            <div className="hidden md:block p-6 bg-white/5">
                                <h1 className="text-4xl font-normal text-center">{t('planning.saturday')}</h1>
                                <hr className="border-white/30 mt-4" />
                            </div>

                            {/* CONTENT: MOBILE ACCORDION / DESKTOP ALWAYS VISIBLE */}
                            {(saturdayOpen || isDesktop) && (
                                <div className="p-6 border-t border-white/30 md:border-t-0 flex flex-col">
                                    <div className="space-y-3 max-h-96 overflow-y-scroll pr-2 scrollable-events">
                                        {saturdayEvents.map((event) => (
                                            <div key={event.id}>
                                                <SaturdayEventCard event={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-center pb-12">
                    <button
                        onClick={() => navigate("/reservation")}
                        className="btn-custom-glass">
                        {t('planning.reserve')}
                    </button>
                </div>
            </div>
        </div>
    );
}