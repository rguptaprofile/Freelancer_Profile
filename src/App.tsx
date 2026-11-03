import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PedigreeBar } from './components/PedigreeBar';
import { TrustPledge } from './components/TrustPledge';
import { ServiceCatalog } from './components/ServiceCatalog';
import { WorkShowcase } from './components/WorkShowcase';
import { WorkflowSection } from './components/WorkflowSection';
import { CoFoundersSection } from './components/CoFoundersSection';
import { ScopeEstimatorSection } from './components/ScopeEstimatorSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { ArchitectureModal } from './components/ArchitectureModal';
import { CapabilitiesRateCardModal } from './components/CapabilitiesRateCardModal';
import { ProjectItem, EditorialArticle } from './types';

export function App() {
  const [selectedArticle, setSelectedArticle] = useState<EditorialArticle | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isRateCardOpen, setIsRateCardOpen] = useState<boolean>(false);
  const [estimatorService, setEstimatorService] = useState<string>('bundle');

  const handleSelectServiceFromCatalog = (serviceId: string) => {
    setEstimatorService(serviceId);
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToEstimator = () => {
    const estimatorEl = document.getElementById('estimator');
    if (estimatorEl) {
      estimatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 flex flex-col font-sans selection:bg-blue-600/30 selection:text-blue-200">
      {/* Sticky Header */}
      <Navbar
        onOpenEstimator={scrollToEstimator}
        onOpenRateCard={() => setIsRateCardOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Section 1: Hero Section Above The Fold */}
        <Hero
          onOpenEstimator={scrollToEstimator}
          onOpenRateCard={() => setIsRateCardOpen(true)}
        />

        {/* Section 2: Verified Pedigree & Experience Bar */}
        <PedigreeBar />

        {/* Section 1 Philosophy: The Anti-Hype Trust Pledge */}
        <TrustPledge />

        {/* Section 3: Dual-Engine Service Catalog (3 Pillars) */}
        <ServiceCatalog onSelectService={handleSelectServiceFromCatalog} />

        {/* Section 3/4/5: Dual Interactive Work Showcase (Tab A Builds & Tab B Quora Editorial) */}
        <WorkShowcase
          onSelectProject={(project) => setSelectedProject(project)}
          onSelectArticle={(article) => setSelectedArticle(article)}
        />

        {/* Section 4: The 4-Step Transparent Workflow */}
        <WorkflowSection />

        {/* Section 5: Meet The Co-Founders (Authentic Bios & Links) */}
        <CoFoundersSection />

        {/* Section 6: Frictionless Inquiry & Scope Estimator */}
        <ScopeEstimatorSection initialService={estimatorService} />
      </main>

      {/* Footer */}
      <Footer
        onOpenRateCard={() => setIsRateCardOpen(true)}
        onOpenEstimator={scrollToEstimator}
      />

      {/* Interactive Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      <ArchitectureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CapabilitiesRateCardModal
        isOpen={isRateCardOpen}
        onClose={() => setIsRateCardOpen(false)}
      />
    </div>
  );
}

export default App;
