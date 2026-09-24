import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/Layout';
import { AboutPage, ContactPage, CorporatePage, HomePage, PersonalBrandingPage, PortfolioPage, ProcessPage, ServicesPage } from '@/Pages';

function App() {
  return <BrowserRouter><Layout><Routes><Route path="/" element={<HomePage />} /><Route path="/about" element={<AboutPage />} /><Route path="/services" element={<ServicesPage />} /><Route path="/portfolio" element={<PortfolioPage />} /><Route path="/corporate" element={<CorporatePage />} /><Route path="/personal-branding" element={<PersonalBrandingPage />} /><Route path="/process" element={<ProcessPage />} /><Route path="/contact" element={<ContactPage />} /></Routes></Layout></BrowserRouter>;
}

export default App;
