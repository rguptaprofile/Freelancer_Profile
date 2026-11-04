import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomeSection } from './components/HomeSection';
import { AboutSection } from './components/AboutSection';
import { WorkSection } from './components/WorkSection';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { DedicatedPaymentPage } from './components/DedicatedPaymentPage';
import { ProjectPitchData } from './types';

// Section Routes & Metadata for Clean Path URLs (e.g. /about, /work, /catalog, /contact, /payment)
interface SectionMeta {
  id: string;
  path: string;
  title: string;
  badge: string;
}

const SECTION_ROUTES: Record<string, SectionMeta> = {
  home: {
    id: 'home',
    path: '/',
    title: 'Welcome Onboard | Rahul & Jyoti Studio',
    badge: 'Home Overview',
  },
  about: {
    id: 'about',
    path: '/about',
    title: 'About Founders (IIT Patna & BIT Mesra) | Rahul & Jyoti Studio',
    badge: 'About Founders',
  },
  work: {
    id: 'work',
    path: '/work',
    title: 'Hire & Pitch Project | 40%-10%-50% Milestone Deed | Studio',
    badge: 'Hire & Pitch',
  },
  catalog: {
    id: 'catalog',
    path: '/catalog',
    title: 'Dual-Engine Service Catalog & Pricing | Rahul & Jyoti Studio',
    badge: 'Service Catalog',
  },
  contact: {
    id: 'contact',
    path: '/contact',
    title: 'Contact Studio Directly | Rahul & Jyoti Studio',
    badge: 'Contact Studio',
  },
  payment: {
    id: 'payment',
    path: '/payment',
    title: 'Razorpay Secure Payment Terminal (18% GST) | Rahul & Jyoti Studio',
    badge: 'Payment Terminal',
  },
};

// Helper: Map current pathname or hash to Section ID
const getSectionIdFromLocation = (): { sectionId: string; isPayment: boolean } => {
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  const hash = window.location.hash.toLowerCase().replace('#', '');

  if (pathname === '/payment' || pathname === '/checkout' || hash === 'payment' || hash === 'checkout') {
    return { sectionId: 'payment', isPayment: true };
  }
  if (pathname === '/about' || hash === 'about') {
    return { sectionId: 'about', isPayment: false };
  }
  if (pathname === '/work' || pathname === '/hire' || pathname === '/pitch' || hash === 'work') {
    return { sectionId: 'work', isPayment: false };
  }
  if (pathname === '/catalog' || pathname === '/services' || hash === 'catalog') {
    return { sectionId: 'catalog', isPayment: false };
  }
  if (pathname === '/contact' || hash === 'contact') {
    return { sectionId: 'contact', isPayment: false };
  }
  return { sectionId: 'home', isPayment: false };
};

export function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [workServicePrefill, setWorkServicePrefill] = useState<string>(
    'Full-Stack Web Application & Custom Portal'
  );

  // Dedicated Payment Page State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutPitchData, setCheckoutPitchData] = useState<ProjectPitchData | null>(null);

  // Prevent scroll events from fighting manual navigation clicks
  const isProgrammaticScroll = useRef<boolean>(false);

  // Current active path string for display
  const currentPath = isCheckoutOpen
    ? '/payment'
    : activeSection === 'home'
    ? '/'
    : `/${activeSection}`;

  // ================= 1. INITIAL ROUTE DETECTION ON MOUNT =================
  useEffect(() => {
    const { sectionId, isPayment } = getSectionIdFromLocation();

    if (isPayment) {
      setIsCheckoutOpen(true);
      document.title = SECTION_ROUTES.payment.title;
      if (window.location.pathname !== '/payment') {
        window.history.replaceState({ sectionId: 'payment' }, '', '/payment');
      }
    } else {
      setActiveSection(sectionId);
      const meta = SECTION_ROUTES[sectionId] || SECTION_ROUTES.home;
      document.title = meta.title;

      if (window.location.pathname !== meta.path && !window.location.hash) {
        window.history.replaceState({ sectionId }, '', meta.path);
      }

      // Smoothly scroll to the requested section if not home
      if (sectionId !== 'home') {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      }
    }
  }, []);

  // ================= 2. BROWSER BACK/FORWARD (POPSTATE) HANDLER =================
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const stateSection = event.state?.sectionId;
      const { sectionId, isPayment } = getSectionIdFromLocation();
      const targetSection = stateSection || sectionId;

      if (isPayment || targetSection === 'payment') {
        setIsCheckoutOpen(true);
        document.title = SECTION_ROUTES.payment.title;
      } else {
        setIsCheckoutOpen(false);
        setActiveSection(targetSection);
        const meta = SECTION_ROUTES[targetSection] || SECTION_ROUTES.home;
        document.title = meta.title;

        const el = document.getElementById(targetSection);
        if (el) {
          isProgrammaticScroll.current = true;
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setTimeout(() => {
            isProgrammaticScroll.current = false;
          }, 800);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // ================= 3. SCROLL SPY & DYNAMIC URL UPDATE =================
  useEffect(() => {
    if (isCheckoutOpen) return;

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;

      const sections = ['home', 'about', 'work', 'catalog', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPos >= top && scrollPos < top + height) {
            if (activeSection !== sectionId) {
              setActiveSection(sectionId);
              const meta = SECTION_ROUTES[sectionId] || SECTION_ROUTES.home;
              document.title = meta.title;

              // Debounce URL replaceState to prevent thrashing browser history
              if (scrollTimeout) clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                if (window.location.pathname !== meta.path && !window.location.hash) {
                  window.history.replaceState({ sectionId }, '', meta.path);
                }
              }, 120);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [activeSection, isCheckoutOpen]);

  // ================= 4. NAVIGATION HANDLER =================
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'payment') {
      handleOpenDedicatedPayment();
      return;
    }

    setIsCheckoutOpen(false);
    setActiveSection(sectionId);

    const meta = SECTION_ROUTES[sectionId] || SECTION_ROUTES.home;
    document.title = meta.title;

    // Push new path to browser history so URL changes in address bar
    if (window.location.pathname !== meta.path) {
      window.history.pushState({ sectionId }, '', meta.path);
    }

    isProgrammaticScroll.current = true;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 800);
  };

  // Dedicated Payment Page Triggers
  const handleOpenDedicatedPayment = (pitchData?: ProjectPitchData) => {
    if (pitchData) {
      setCheckoutPitchData(pitchData);
    }
    setIsCheckoutOpen(true);
    document.title = SECTION_ROUTES.payment.title;
    window.history.pushState({ sectionId: 'payment' }, '', '/payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseDedicatedPayment = () => {
    setIsCheckoutOpen(false);
    handleNavigate('work');
  };

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

  const handleSelectServiceFromCatalog = (serviceTitle: string) => {
    setWorkServicePrefill(serviceTitle);
    handleNavigate('work');
  };

  // If dedicated checkout page is active, render full-screen checkout terminal
  if (isCheckoutOpen) {
    return (
      <DedicatedPaymentPage
        pitchData={checkoutPitchData}
        onBack={handleCloseDedicatedPayment}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Top Navbar with Active Path Awareness */}
      <Navbar
        activeSection={activeSection}
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Main Flow: The 5 Sections with Dynamic URLs */}
      <main className="flex-1">
        {/* 1. HOME SECTION: Full overview, ratings, guarantees -> Path: / */}
        <HomeSection onNavigate={handleNavigate} />

        {/* 2. ABOUT SECTION: Rahul & Jyoti profiles, photo modal, credentials -> Path: /about */}
        <AboutSection onOpenPhoto={handleOpenPhoto} />

        {/* 3. WORK SECTION: Pitch scope, 40%-10%-50% Bond, Razorpay Integration -> Path: /work */}
        <WorkSection
          initialServiceId={workServicePrefill}
          onOpenDedicatedPayment={handleOpenDedicatedPayment}
        />

        {/* 4. CATALOG SECTION: Dual-engine service catalog & deliverables -> Path: /catalog */}
        <CatalogSection onSelectService={handleSelectServiceFromCatalog} />

        {/* 5. CONTACT SECTION: Direct query & message dispatch -> Path: /contact */}
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
