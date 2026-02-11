import { useState, useEffect } from "react";

export const useEventPlanning = () => {
    const [fridayOpen, setFridayOpen] = useState(false);
    const [saturdayOpen, setSaturdayOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(
        typeof window !== 'undefined' ? window.innerWidth >= 768 : false
    );

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

    const toggleFriday = () => setFridayOpen(!fridayOpen);
    const toggleSaturday = () => setSaturdayOpen(!saturdayOpen);

    return {
        // State
        fridayOpen,
        saturdayOpen,
        isDesktop,
        
        // Data
        fridayEvents,
        saturdayEvents,
        
        // Handlers
        toggleFriday,
        toggleSaturday,
        setFridayOpen,
        setSaturdayOpen
    };
};
