import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [workServicePrefill, setWorkServicePrefill] = useState<string>(
    'Full-Stack Web Application & Custom Portal'
  );

  // Photo Lightbox Modal State
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageSrc: string;
    name: string;
    title: string;
  }>({
    isOpen: false,
    imageSrc: '',
    name: '',
    title: '',
  });

  const handleOpenPhoto = (imageSrc: string, name: string, title: string) => {
    setLightboxData({
      isOpen: true,
      imageSrc,
      name,
      title,
    });
  };

  const handleClosePhoto = () => {
    setLightboxData((prev) => ({ ...prev, isOpen: false }));
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectServiceFromCatalog = (serviceTitle: string) => {
    setWorkServicePrefill(serviceTitle);
    handleNavigate('work');
  };

  // Scroll listener to sync active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'work', 'catalog', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Flow: Strictly the 5 Sections */}
      <main className="flex-1">
        {/* 1. HOME SECTION: Full overview, ratings, guarantees */}
        <HomeSection onNavigate={handleNavigate} />

        {/* 2. ABOUT SECTION: Rahul & Jyoti profiles, full photo with open modal, NeGD/HCL, BIT Mesra, public profiles */}
        <AboutSection onOpenPhoto={handleOpenPhoto} />

        {/* 3. WORK SECTION: Pitch scope (startups, banks, shops), 40%-10%-50% Bond Paper, Payment Integration, Direct Mail */}
        <WorkSection initialServiceId={workServicePrefill} />

        {/* 4. CATALOG SECTION: Dual-engine service catalog, deliverables, pricing & hire CTA */}
        <CatalogSection onSelectService={handleSelectServiceFromCatalog} />

        {/* 5. CONTACT SECTION: Studio summary & query form directly to inbox */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Full Photo Lightbox Modal */}
      <PhotoLightboxModal
        isOpen={lightboxData.isOpen}
        onClose={handleClosePhoto}
        imageSrc={lightboxData.imageSrc}
        name={lightboxData.name}
        title={lightboxData.title}
      />
    </div>
  );
}

export default App;
