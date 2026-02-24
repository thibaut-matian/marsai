import { useState, useEffect } from "react";

export const useEventPlanning = () => {
  const [fridayOpen, setFridayOpen] = useState(false);
  const [saturdayOpen, setSaturdayOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fridayEvents = [
    {
      id: 1,
      title: "planning.event1.title",
      time: "10h - 11h",
      description: "planning.event1.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 2,
      title: "planning.event2.title",
      time: "11h - 12h",
      description: "planning.event2.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 3,
      title: "planning.event3.title",
      time: "12h - 13h",
      description: "planning.event3.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 4,
      title: "planning.event4.title",
      time: "13h - 14h",
      description: "planning.event4.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 5,
      title: "planning.event5.title",
      time: "14h - 15h",
      description: "planning.event5.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 6,
      title: "planning.event6.title",
      time: "15h - 16h",
      description: "planning.event6.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 7,
      title: "planning.event7.title",
      time: "16h - 17h",
      description: "planning.event7.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 8,
      title: "planning.event8.title",
      time: "17h - 18h",
      description: "planning.event8.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
  ];

  const saturdayEvents = [
    {
      id: 1,
      title: "planning.event1.title",
      time: "10h - 11h",
      description: "planning.event1.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 2,
      title: "planning.event2.title",
      time: "11h - 12h",
      description: "planning.event2.description",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&h=90&fit=crop",
    },
    {
      id: 3,
      title: "planning.event3.title",
      time: "12h - 13h",
      description: "planning.event3.description",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=150&h=90&fit=crop",
    },
    {
      id: 4,
      title: "planning.event4.title",
      time: "13h - 14h",
      description: "planning.event4.description",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=90&fit=crop",
    },
    {
      id: 5,
      title: "planning.event5.title",
      time: "14h - 15h",
      description: "planning.event5.description",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=150&h=90&fit=crop",
    },
    {
      id: 6,
      title: "planning.event6.title",
      time: "15h - 16h",
      description: "planning.event6.description",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=150&h=90&fit=crop",
    },
    {
      id: 7,
      title: "planning.event7.title",
      time: "16h - 17h",
      description: "planning.event7.description",
      image:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=150&h=90&fit=crop",
    },
    {
      id: 8,
      title: "planning.event8.title",
      time: "17h - 18h",
      description: "planning.event8.description",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=150&h=90&fit=crop",
    },
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
    setSaturdayOpen,
  };
};
