/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ALL_PRODUCTS, CATALOG_CATEGORIES } from './data/catalogData.ts';
import { Product } from './types/index.ts';

// Modular Sections
import { AnnouncementBar } from './components/AnnouncementBar.tsx';
import { Header } from './components/Header.tsx';
import { HeroSlider } from './components/HeroSlider.tsx';
import { BrandMarquee } from './components/BrandMarquee.tsx';
import { StatsRibbon } from './components/StatsRibbon.tsx';
import { CategoriesSection } from './components/CategoriesSection.tsx';
import { FeaturedShowcaseSlider } from './components/FeaturedShowcaseSlider.tsx';
import { ProductCatalogSection } from './components/ProductCatalogSection.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { ClientTestimonials } from './components/ClientTestimonials.tsx';
import { ProductSpecModal } from './components/ProductSpecModal.tsx';
import { EnquiryModal } from './components/EnquiryModal.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { InquiryToast } from './components/InquiryToast.tsx';
import { AudioToggle } from './components/AudioToggle.tsx';

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  
  // Enquiry Modal state
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState<boolean>(false);
  const [enquiryProductPreference, setEnquiryProductPreference] = useState<string | null>(null);

  // Top-Right Toast state (only triggered upon form submission)
  const [showInquiryToast, setShowInquiryToast] = useState<boolean>(false);
  const [inquiryMessage, setInquiryMessage] = useState<string>(
    'Your Inquiry has been send to MECHTECH, Thanks'
  );

  // Open spec modal from product object or ID
  const handleViewProduct = (productOrId: Product | string) => {
    if (typeof productOrId === 'string') {
      const found = ALL_PRODUCTS.find(
        (p) =>
          p.id === productOrId ||
          p.model?.toLowerCase() === productOrId.toLowerCase() ||
          p.id.toLowerCase().includes(productOrId.toLowerCase())
      );
      if (found) {
        setSelectedProductForModal(found);
      }
    } else {
      setSelectedProductForModal(productOrId);
    }
  };

  // Triggered when user clicks "Enquire Now / Get Quote" or "Send Inquiry to MechTech"
  // Opens the Enquiry Form with all fields (Name, Email, Number, etc.) WITHOUT showing toast yet!
  const handleOpenEnquiryModal = (machineName?: string) => {
    setEnquiryProductPreference(machineName || null);
    setIsEnquiryModalOpen(true);
  };

  // Triggered ONLY after user successfully fills and submits the Enquiry Form
  const handleEnquirySubmitSuccess = (_machineName?: string) => {
    setInquiryMessage('Your Inquiry has been send to MECHTECH, Thanks');
    setShowInquiryToast(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar onInquireClick={() => handleOpenEnquiryModal()} />

      {/* 2. Sticky Header with Logo, Navigation, Mega Menu (No Search Bar as requested) */}
      <Header
        onCategorySelect={setSelectedCategoryId}
        onEnquireClick={() => handleOpenEnquiryModal()}
      />

      <main className="flex-1">
        {/* 3. Hero Carousel (Auto-sliding images & specs, 3s interval) */}
        <HeroSlider
          onViewProduct={handleViewProduct}
          onEnquireProduct={handleOpenEnquiryModal}
        />

        {/* 4. Industries & Application Marquee (Continuous sliding ticker) */}
        <BrandMarquee />

        {/* 5. Operational Statistics Ribbon */}
        <StatsRibbon />

        {/* 6. Featured Equipment Showcase Slider (Sliding cards, 3s interval) */}
        <FeaturedShowcaseSlider
          onViewProduct={handleViewProduct}
          onEnquireProduct={handleOpenEnquiryModal}
        />

        {/* 7. Discover Our Revolutionary Categories (4 Divisions from mechtech-catalog.json) */}
        <CategoriesSection onSelectCategory={setSelectedCategoryId} />

        {/* 8. Full Product Catalog with Category & Sub-category Filters (Search bar removed) */}
        <ProductCatalogSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onViewProduct={handleViewProduct}
          onEnquireProduct={handleOpenEnquiryModal}
        />

        {/* 9. About Us & Leadership Message */}
        <AboutSection />

        {/* 10. Why Choose Mechtech (5 Pillars) */}
        <WhyChooseUs />

        {/* 11. Client Testimonials (Sliding testimonials like home page, 3 sec timer, product images & specs) */}
        <ClientTestimonials
          onViewProduct={handleViewProduct}
          onEnquireProduct={handleOpenEnquiryModal}
        />
      </main>

      {/* 12. Footer */}
      <Footer onCategorySelect={setSelectedCategoryId} />

      {/* 13. Technical Specification Modal */}
      <ProductSpecModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onEnquire={handleOpenEnquiryModal}
      />

      {/* 14. Dedicated Enquiry & Quotation Modal with Name, Email, Phone, Company, Specs fields */}
      <EnquiryModal
        isOpen={isEnquiryModalOpen}
        onClose={() => setIsEnquiryModalOpen(false)}
        selectedProduct={enquiryProductPreference}
        onSubmitSuccess={handleEnquirySubmitSuccess}
      />

      {/* 15. Floating Quick Actions (WhatsApp + Phone) */}
      <FloatingActions onQuickQuote={() => handleOpenEnquiryModal()} />

      {/* 16. Top-Right Notification Toast for 3.5 sec shown ONLY after form submission */}
      <InquiryToast
        isOpen={showInquiryToast}
        onClose={() => setShowInquiryToast(false)}
        duration={3500}
        message={inquiryMessage}
      />

      {/* 17. Background Ambient Music Toggle (bottom-left corner, off by default, no autoplay) */}
      <AudioToggle />
    </div>
  );
}
