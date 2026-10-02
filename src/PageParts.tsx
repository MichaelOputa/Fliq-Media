import { ArrowUpRight, CalendarDays, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { WhatsAppIcon } from '@/BrandIcons';
import { services, values, whatsappUrl } from '@/siteData';

const featuredWork = [
  { category: 'Corporate Headshots', title: 'The Authority Series', text: 'Portraiture with presence and purpose.', image: '/images/corporateheadshots/IMG_4929.JPG', tall: true },
  { category: 'Personal Branding', title: 'Distinctly You', text: 'A visual identity in every frame.', image: '/images/personalbrandingportraits/CHIOMA169.webp', tall: false },
  { category: 'Commercial', title: 'Boardroom Presence', text: 'Confidence, made visible.', image: '/images/commercial/DSC03481.webp', tall: false },
  { category: 'Editorial', title: 'Modern Heritage', text: 'Culture, character, and craft.', image: '/images/editorial/301521.webp', tall: true },
];

const heroImage = '/images/hero/img-004.jpg';

export function PageHero({ eyebrow, title, italic, image = heroImage }: { eyebrow: string; title: string; italic: string; image?: string }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,9,8,.84), rgba(10,9,8,.32)), url('${image}')` }}>
      <div className="content-width">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}<br /><em>{italic}</em></h1>
      </div>
    </section>
  );
}

export function PageIntro({ eyebrow, title, italic, children }: { eyebrow: string; title: string; italic: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="content-width page-intro">
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}<br /><em>{italic}</em></h2></div>
        <div className="intro-copy">{children}</div>
      </div>
    </section>
  );
}

export function WhatsAppButton({ label, light = false }: { label: string; light?: boolean }) {
  return (
    <a className={`button ${light ? 'button-outline-light' : 'button-dark'}`} href={whatsappUrl} target="_blank" rel="noreferrer">
      <WhatsAppIcon size={16} /> {label}
    </a>
  );
}

export function BookingButton({ light = false }: { light?: boolean }) {
  return (
    <Link className={`button ${light ? 'button-outline-light' : 'button-dark'}`} to="/contact">
      <CalendarDays size={16} /> Book a Consultation
    </Link>
  );
}

export function ServiceGrid({ limit }: { limit?: number }) {
  return (
    <div className="service-grid">
      {services.slice(0, limit).map(([number, title, text, image]) => (
        <article className="service-card" key={number}>
          <div className="service-image"><img src={image} alt={title} loading="lazy" decoding="async" /></div>
          <div className="service-meta"><span>{number}</span><h3>{title}</h3><ArrowUpRight size={19} /></div>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

export function ValueList() {
  return (
    <div className="values-list">
      {values.map(([title, text], index) => (
        <div className="value-row" key={title}>
          <span>0{index + 1}</span>
          <div><h3>{title}</h3><p>{text}</p></div>
          <ChevronRight size={18} />
        </div>
      ))}
    </div>
  );
}

export function PortfolioGrid() {
  return (
    <div className="portfolio-featured">
      {featuredWork.map((item) => (
        <article className={`portfolio-item ${item.tall ? 'portfolio-tall' : ''}`} key={item.title}>
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
          <div className="portfolio-overlay">
            <span>{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to="/contact">View project <ArrowUpRight size={16} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function ContactCta() {
  return (
    <section className="contact-cta">
      <div className="content-width">
        <p className="eyebrow light">Start a conversation</p>
        <h2>Ready to create something that <em>commands attention?</em></h2>
        <BookingButton />
      </div>
    </section>
  );
}

