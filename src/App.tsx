import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/Layout';
import { IntroSlideshow } from '@/IntroSlideshow';
import { ScrollToTop } from '@/ScrollToTop';
import { AboutPage } from '@/AboutPage';
import { ContactPage } from '@/ContactPage';
import { CorporatePage } from '@/CorporatePage';
import { HomePage } from '@/HomePage';
import { PersonalBrandingPage } from '@/PersonalBrandingPage';
import { PortfolioPage } from '@/PortfolioPage';
import { PricingPage } from '@/PricingPage';
import { ProcessPage } from '@/ProcessPage';
import { ServicesPage } from '@/ServicesPage';

const InvoiceAdminPage = lazy(() => import('@/InvoiceAdminPage').then((module) => ({ default: module.InvoiceAdminPage })));

function App() {
  return <BrowserRouter><IntroSlideshow /><ScrollToTop /><Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/portfolio" element={<PortfolioPage />} /><Route path="/corporate" element={<CorporatePage />} /><Route path="/personal-branding" element={<PersonalBrandingPage />} /><Route path="/process" element={<ProcessPage />} /><Route path="/pricing" element={<PricingPage />} /><Route path="/contact" element={<ContactPage />} /><Route path="/admin/invoices" element={<Suspense fallback={<div className="invoice-admin">Loading staff tools…</div>}><InvoiceAdminPage /></Suspense>} /></Routes></Layout></BrowserRouter>;
}

export default App;
