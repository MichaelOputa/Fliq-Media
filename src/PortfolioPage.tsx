import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactCta, PageHero, PageIntro } from '@/PageParts';
import { portfolioImages } from './portfolioImages';

const portfolioCategories = ['Commercial', 'Corporate Headshots', 'Editorial', 'Events', 'Lifestyle', 'Music Concerts', 'Personal Branding', 'Weddings'];
const featuredWork = [
  { category: 'Corporate Headshots', title: 'The Authority Series', text: 'Portraiture with presence and purpose.', image: '/images/corporateheadshots/DSC02301.webp', tall: true },
  { category: 'Personal Branding', title: 'Distinctly You', text: 'A visual identity in every frame.', image: '/images/personalbrandingportraits/DSC02027.webp', tall: false },
  { category: 'Commercial', title: 'Boardroom Presence', text: 'Confidence, made visible.', image: '/images/commercial/DSC03481.webp', tall: false },
  { category: 'Editorial', title: 'Modern Heritage', text: 'Culture, character, and craft.', image: '/images/editorial/301521.webp', tall: true },
];

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? portfolioImages : portfolioImages.filter((image) => image.category === activeCategory);

  return (
    <>
      <PageHero eyebrow="Portfolio / 03" title="Work with" italic="intention." />
      <section className="section portfolio">
        <div className="content-width">
          <PageIntro eyebrow="01 / Selected work" title="Made to be" italic="Remembered.">
            <p>Our work is built to do more than look exceptional. It is designed to clarify, elevate, and make an impression that lasts.</p>
          </PageIntro>
          <div className="portfolio-featured">
            {featuredWork.map((item) => (
              <article className={`portfolio-item ${item.tall ? 'portfolio-tall' : ''}`} key={item.title}>
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                <div className="portfolio-overlay">
                  <span>{item.category}</span><h3>{item.title}</h3><p>{item.text}</p>
                  <Link to="/contact">View project <ArrowUpRight size={16} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div className="portfolio-gallery-heading">
            <p className="eyebrow">02 / Full gallery</p>
            <div className="portfolio-filters">
              <button className={activeCategory === 'All' ? 'active' : ''} onClick={() => setActiveCategory('All')}>All</button>
              {portfolioCategories.map((category) => (
                <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)}>{category}</button>
              ))}
            </div>
          </div>
          <div className="portfolio-gallery">
            {filtered.map((slot) => (
              <article className="gallery-slot" key={slot.path}>
                <div className="gallery-slot-inner"><img src={slot.path} alt={`${slot.category} photography`} loading="lazy" /></div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
