import React, { useState } from "react";

export default function Planning() {
    const [fridayIndex, setFridayIndex] = useState(0);
    const [saturdayIndex, setSaturdayIndex] = useState(0);

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
        }
    ];

    const EventCard = ({ event }) => (
        <div className="border-t border-b border-teal-500/80 pb-1 mb-1 hover:bg-teal-300/55 p-1 rounded-lg transition">
            <div className="flex gap-4">
                <img src={event.image}
                    alt={event.title}
                    className="w-36 h-20 object-cover rounded-lg" />
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-normal">{event.title}</h3>
                        <span className="text-sm text-gray-300">{event.time}</span>
                    </div>
                    <p className="text-sm text-gray-400">{event.description}</p>
                </div>
            </div>
        </div>
    );

    const SaturdayEventCard = ({ event }) => (
        <div className="border-b border-teal-500/30 pb-4 mb-4 hover:bg-teal-500/20 p-2 rounded-lg transition">
            <div className="flex gap-4">
                <img src={event.image}
                    alt={event.title}
                    className="w-36 h-20 object-cover rounded-lg border-2 border-teal-500/50" />
                <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-normal">{event.title}</h3>
                        <span className="text-sm text-gray-300">{event.time}</span>
                    </div>
                    <p className="text-sm text-gray-400">{event.description}</p>
                </div>
            </div>
        </div>
    );

    const getVisibleEvents = (events, startIndex, count = 4) => {
        return Array.from({ length: count }, (_, i) => events[(startIndex + i) % events.length]);
    };

    const handleFridayPrev = () => {
        setFridayIndex((prev) => (prev - 1 + fridayEvents.length) % fridayEvents.length);
    };

    const handleFridayNext = () => {
        setFridayIndex((prev) => (prev + 1) % fridayEvents.length);
    };

    const handleSaturdayPrev = () => {
        setSaturdayIndex((prev) => (prev - 1 + saturdayEvents.length) % saturdayEvents.length);
    };

    const handleSaturdayNext = () => {
        setSaturdayIndex((prev) => (prev + 1) % saturdayEvents.length);
    };

    return (
        <div className="text-white bg-black">
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl md:text-5xl font-light text-center mb-12 tracking-widest">
                    EVENEMENTS
                </h1>

                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
                    {/* VENDREDI CAROUSEL */}
                    <div className="flex flex-col">
                        <div className="border-2 rounded-2xl p-6 backdrop-blur flex-1 flex flex-col">
                            <h1 className="text-4xl font-normal text-center mb-4">VENDREDI</h1>
                            <hr className="border-teal-500/80 mb-6" />
                            <div className="space-y-0 flex-1 overflow-hidden">
                                {getVisibleEvents(fridayEvents, fridayIndex).map((event) => (
                                    <div key={event.id}>
                                        <EventCard event={event} />
                                        <div className="flex justify-center mt-1">
                                            <div className="w-1 h-3 bg-teal-500 rounded-full"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Navigation Arrows - VENDREDI */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={handleFridayPrev}
                                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold p-2 rounded-full transition transform hover:scale-110"
                                aria-label="Événement précédent"
                            >
                                ▲
                            </button>
                            <button
                                onClick={handleFridayNext}
                                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold p-2 rounded-full transition transform hover:scale-110"
                                aria-label="Événement suivant"
                            >
                                ▼
                            </button>
                        </div>
                    </div>

                    {/* SAMEDI CAROUSEL */}
                    <div className="flex flex-col">
                        <div className="border-2 border-white rounded-2xl p-6 backdrop-blur flex-1 flex flex-col">
                            <h1 className="text-4xl font-normal text-center mb-4">SAMEDI</h1>
                            <hr className="border-teal-500/80 mb-6" />
                            <div className="space-y-0 flex-1 overflow-hidden">
                                {getVisibleEvents(saturdayEvents, saturdayIndex).map((event) => (
                                    <div key={event.id}>
                                        <SaturdayEventCard event={event} />
                                        <div className="flex justify-center mt-3">
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Navigation Arrows - SAMEDI */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                onClick={handleSaturdayPrev}
                                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold p-2 rounded-full transition transform hover:scale-110"
                                aria-label="Événement précédent"
                            >
                                ▲
                            </button>
                            <button
                                onClick={handleSaturdayNext}
                                className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold p-2 rounded-full transition transform hover:scale-110"
                                aria-label="Événement suivant"
                            >
                                ▼
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button className="bg-teal-500 hover:bg-teal-300 text-slate-900 font-semibold px-8 py-3 rounded-lg transition transform hover:scale-105">
                        JE RÉSERVE MA PLACE
                    </button>
                </div>
            </div>
        </div>
    );
}