import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function Planning() {
    const [fridayOpen, setFridayOpen] = useState(false);
    const [saturdayOpen, setSaturdayOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 768 : false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fridayEvents = [
        {
            id: 1,
            title: "Evenement 1",
            time: "10h - 11h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 2,
            title: "Evenement 2",
            time: "11h - 12h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 3,
            title: "Evenement 3",
            time: "12h - 13h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 4,
            title: "Evenement 4",
            time: "13h - 14h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 9,
            title: "Evenement 5",
            time: "14h - 15h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 10,
            title: "Evenement 6",
            time: "15h - 16h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 11,
            title: "Evenement 7",
            time: "16h - 17h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 12,
            title: "Evenement 8",
            time: "17h - 18h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        }
    ];

    const saturdayEvents = [
        {
            id: 5,
            title: "Evenement 1",
            time: "10h - 11h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 6,
            title: "Evenement 2",
            time: "11h - 12h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&h=90&fit=crop"
        },
        {
            id: 7,
            title: "Evenement 3",
            time: "12h - 13h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=150&h=90&fit=crop"
        },
        {
            id: 8,
            title: "Evenement 4",
            time: "13h - 14h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=90&fit=crop"
        },
        {
            id: 13,
            title: "Evenement 5",
            time: "14h - 15h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop"
        },
        {
            id: 14,
            title: "Evenement 6",
            time: "15h - 16h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&h=90&fit=crop"
        },
        {
            id: 15,
            title: "Evenement 7",
            time: "16h - 17h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=150&h=90&fit=crop"
        },
        {
            id: 16,
            title: "Evenement 8",
            time: "17h - 18h",
            description: "Découvrez notre conférence sur xyz",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=90&fit=crop"
        }
    ];

    const EventCard = ({ event }) => (
        <div className="group card bg-base-800/50 border border-cyan-500/30 shadow-md cursor-pointer hover:border-cyan-400 hover:bg-cyan-950/40 hover:shadow-lg transition-all duration-300">
            <div className="card-body p-4">
                <div className="flex gap-4 items-center">
                    <div className="avatar overflow-hidden rounded border border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
                        <div className="w-24 h-16">
                            <img src={event.image}
                                alt={event.title}
                                className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="card-title text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors line-clamp-1">{event.title}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-cyan-300 transition-colors font-semibold">{event.time}</p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-300 mt-1 transition-colors line-clamp-2">{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    const SaturdayEventCard = ({ event }) => (
        <div className="group card bg-base-800/50 border border-cyan-500/30 shadow-md cursor-pointer hover:border-cyan-400 hover:bg-cyan-950/40 hover:shadow-lg transition-all duration-300">
            <div className="card-body p-4">
                <div className="flex gap-4 items-center">
                    <div className="avatar overflow-hidden rounded border border-cyan-500/50 group-hover:border-cyan-400 transition-colors">
                        <div className="w-24 h-16">
                            <img src={event.image}
                                alt={event.title}
                                className="object-cover group-hover:scale-110 transition-transform duration-300" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="card-title text-sm text-cyan-400 group-hover:text-cyan-300 transition-colors line-clamp-1">{event.title}</h3>
                        <p className="text-xs text-gray-400 group-hover:text-cyan-300 transition-colors font-semibold">{event.time}</p>
                        <p className="text-xs text-gray-500 group-hover:text-gray-300 mt-1 transition-colors line-clamp-2">{event.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="text-white bg-gradient-to-b from-black via-slate-900 to-slate-800">
            <style>{`
                .scrollable-events {
                    scrollbar-color: transparent transparent;
                    scrollbar-width: thin;
                    transition: scrollbar-color 300ms ease;
                }
                
                .scrollable-events:hover {
                    scrollbar-color: #06b6d4 #1e293b;
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
                    background: #06b6d4;
                }
            `}</style>
            <div className="container mx-auto px-4 pb-12">
                <h1 className="text-4xl md:text-5xl font-light text-center mb-12 tracking-widest">
                    EVENEMENTS
                </h1>

                <div className="max-w-6xl mx-auto mb-8">
                    {/* MOBILE: ACCORDION / DESKTOP: GRID */}
                    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
                        {/* VENDREDI */}
                        <div className="border-2 border-teal-500 rounded-2xl bg-slate-900/40 backdrop-blur overflow-hidden">
                            {/* MOBILE ACCORDION HEADER */}
                            <button
                                onClick={() => setFridayOpen(!fridayOpen)}
                                className="w-full p-6 text-left bg-slate-900/50 hover:bg-slate-900/70 transition flex justify-between items-center md:hidden"
                            >
                                <h1 className="text-4xl font-normal">VENDREDI</h1>
                                <span className={`text-teal-500 text-2xl transition duration-300 transform ${fridayOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {/* DESKTOP HEADER */}
                            <div className="hidden md:block p-6 bg-slate-900/50">
                                <h1 className="text-4xl font-normal text-center">VENDREDI</h1>
                                <hr className="border-teal-500/80 mt-4" />
                            </div>

                            {/* CONTENT: MOBILE ACCORDION / DESKTOP ALWAYS VISIBLE */}
                            {(fridayOpen || isDesktop) && (
                                <div className="p-6 border-t border-teal-500/80 md:border-t-0 flex flex-col">
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
                        <div className="border-2 border-teal-500 rounded-2xl bg-slate-900/40 backdrop-blur overflow-hidden">
                            {/* MOBILE ACCORDION HEADER */}
                            <button
                                onClick={() => setSaturdayOpen(!saturdayOpen)}
                                className="w-full p-6 text-left bg-slate-900/50 hover:bg-slate-900/70 transition flex justify-between items-center md:hidden"
                            >
                                <h1 className="text-4xl font-normal">SAMEDI</h1>
                                <span className={`text-teal-500 text-2xl transition transform duration-300 ${saturdayOpen ? 'rotate-180' : ''}`}>
                                    <ChevronDown />
                                </span>
                            </button>

                            {/* DESKTOP HEADER */}
                            <div className="hidden md:block p-6 bg-slate-900/50">
                                <h1 className="text-4xl font-normal text-center">SAMEDI</h1>
                                <hr className="border-teal-500/80 mt-4" />
                            </div>

                            {/* CONTENT: MOBILE ACCORDION / DESKTOP ALWAYS VISIBLE */}
                            {(saturdayOpen || isDesktop) && (
                                <div className="p-6 border-t border-teal-500/80 md:border-t-0 flex flex-col">
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
                    <button className="btn bg-teal-400 to-teal-600 border-none text-slate-900 font-semibold hover:scale-105 transition transform">
                        JE RÉSERVE MA PLACE
                    </button>
                </div>
            </div>
        </div>
    );
}