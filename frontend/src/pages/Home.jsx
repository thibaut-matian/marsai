import { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MovieTimeline from '../components/features/home/timeline';
import HeroSection from '../components/features/home/HeroSection';
import AboutSection from '../components/features/home/AboutSection';
import CriteriaSection from '../components/features/home/CriteriaSection';
import RewardsSection from '../components/features/home/RewardsSection';
import JurySection from '../components/features/home/JurySection';
import ContactSection from '../components/features/home/ContactSection';
import { useHomeData } from '../hooks/useHomeData';

export default function Home() {
  const { content, isLoading } = useHomeData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection 
        videoUrl={content?.hero?.videoUrl || ''} 
        buttonText={content?.hero?.buttonText || ''} 
        buttonEnabled={content?.hero?.buttonEnabled}
      />

      {/* Timeline */}
      <MovieTimeline 
        phases={content?.timeline?.phases || []} 
        activeStep={content?.timeline?.activeStep || 1}
      />

      {/* À propos */}
      <AboutSection
        title={content?.about?.title}
        paragraph1={content?.about?.paragraph1}
        paragraph2={content?.about?.paragraph2}
      />

      <hr />

      {/* Critères */}
      <CriteriaSection
        title={content?.criteria?.title}
        items={content?.criteria?.items || []}
      />

      {/* Récompenses */}
      <RewardsSection
        title={content?.rewards?.title}
        items={content?.rewards?.items || []}
      />

      {/* Jury */}
      <JurySection
        title={content?.jury?.title}
        description={content?.jury?.description}
        members={content?.jury?.members || []}
      />

      <hr />

      {/* Contact */}
      <ContactSection
        title={content?.contact?.title}
        phone={content?.contact?.phone}
        email={content?.contact?.email}
        address={content?.contact?.address}
        mapUrl={content?.contact?.mapUrl}
      />
    </div>
  );
}