import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleIcon, WhatsAppIcon } from '@/BrandIcons';
import { clients, firstbankDeckClients, firstbankProject, googleBusinessUrl, industries, services, values, whatsappNumber, whatsappUrl } from '@/siteData';

const heroImage = '/images/hero/img-004.jpg';
const featuredWork: { category: string; title: string; text: string; image: string; tall: boolean; wide?: boolean; href?: string }[] = [
  { category: 'Executive Portraits', title: 'The Authority Series', text: 'Portraiture with presence and purpose.', image: '/images/portfolio/img-001.jpg', tall: true },
  { category: 'Personal Branding', title: 'Distinctly You', text: 'A visual identity in every frame.', image: '/images/portfolio/img-002.jpg', tall: false },
  { category: 'Corporate', title: 'Boardroom Presence', text: 'Confidence, made visible.', image: '/images/portfolio/img-003.jpg', tall: false },
  { category: 'Campaigns', title: 'Modern Heritage', text: 'Culture, character, and craft.', image: '/images/portfolio/img-004.jpg', tall: true },
  { category: firstbankProject.category, title: firstbankProject.client, text: firstbankProject.title, image: firstbankProject.heroImage, tall: false, wide: true, href: `/corporate/${firstbankProject.slug}` },
];

const portfolioCategories = ['Corporate', 'Executive Portraits', 'Personal Branding', 'Events', 'Commercial', 'Documentary', 'Campaigns'];

// 92 full-gallery slots, populated with the client's portfolio images (img-005.jpg through img-096.jpg).
const placeholderSlots: { id: number; path: string; category: string }[] = Array.from({ length: 92 }, (_, i) => {
  const categories = portfolioCategories;
  const fileNumber = String(i + 5).padStart(3, '0');
  return { id: i + 1, path: `/images/portfolio/img-${fileNumber}.jpg`, category: categories[i % categories.length] };
});

function PageHero({ eyebrow, title, italic, image = heroImage }: { eyebrow: string; title: string; italic: string; image?: string }) {
  return (
    <section className="page-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(10,9,8,.84), rgba(10,9,8,.32)), url('${image}')` }}>
      <div className="content-width">
        <p className="eyebrow light">{eyebrow}</p>
        <h1>{title}<br /><em>{italic}</em></h1>
      </div>
    </section>
  );
}

function PageIntro({ eyebrow, title, italic, children }: { eyebrow: string; title: string; italic: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <div className="content-width page-intro">
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}<br /><em>{italic}</em></h2></div>
        <div className="intro-copy">{children}</div>
      </div>
    </section>
  );
}

function WhatsAppButton({ label = 'Book a Consultation', light = false }: { label?: string; light?: boolean }) {
  return (
    <a className={`button ${light ? 'button-outline-light' : 'button-dark'}`} href={whatsappUrl} target="_blank" rel="noreferrer">
      <WhatsAppIcon size={16} /> {label}
    </a>
  );
}

// Sets the document title/description for a single page and restores the
// site-wide defaults on unmount. No metadata library in this project, so
// this stays a small, self-contained effect rather than a new dependency.
function usePageMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    const metaEl = document.querySelector('meta[name="description"]');
    const prevDescription = metaEl?.getAttribute('content') ?? '';
    document.title = title;
    metaEl?.setAttribute('content', description);
    return () => {
      document.title = prevTitle;
      metaEl?.setAttribute('content', prevDescription);
    };
  }, [title, description]);
}

// Subtle scroll-triggered fade/slide-up entrance, used sparingly on the
// FirstBank case study. Respects prefers-reduced-motion via the global
// transition-duration override already defined at the bottom of index.css.
function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}>{children}</div>;
}

export function HomePage() {
  return (
    <>
      <section className="hero" aria-label="FliQ Media introduction">
        <div className="hero-image logo-hero" />
        <div className="hero-wash" />
        <div className="hero-content content-width">
          <p className="eyebrow light">FliQ Media / Creative direction &amp; visual storytelling</p>
          <h1>Visuals That<br /><em>Build Influence.</em></h1>
          <p className="hero-copy">Premium photography, visual storytelling, and strategic brand communication for individuals, organizations, and brands that value excellence.</p>
          <div className="button-row">
            <Link className="button button-light" to="/portfolio">Explore Our Work <ArrowUpRight size={16} /></Link>
            <WhatsAppButton light />
          </div>
        </div>
        <div className="hero-footer content-width">
          <span>01 / 04</span><span className="hero-line" /><span>Scroll to explore <ArrowDown size={15} /></span>
        </div>
      </section>

      <PageIntro eyebrow="01 / The perspective" title="More Than" italic="Photography.">
        <p className="lead">We create visual identity.</p>
        <p>FliQ Media is a premium creative media company dedicated to producing exceptional visual content and strategic branding solutions. We operate at the intersection of creativity, strategy, and corporate communication.</p>
        <Link className="text-link" to="/about">Discover our perspective <MoveRight size={18} /></Link>
      </PageIntro>

      <section className="dark-section mission">
        <div className="content-width mission-grid">
          <p className="eyebrow light">02 / The foundation</p>
          <div className="mission-card"><span className="mission-label">Vision</span><p>To be Africa's most respected premium creative media company, recognized globally for producing iconic visual experiences and redefining excellence in visual storytelling.</p></div>
          <div className="mission-card"><span className="mission-label">Mission</span><p>To create exceptional visual content and branding solutions that inspire confidence, communicate value, and position our clients as industry leaders.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="content-width">
          <div className="section-heading">
            <div><p className="eyebrow">03 / The offering</p><h2>What We <em>Do</em></h2></div>
            <Link className="text-link" to="/services">View all services <MoveRight size={18} /></Link>
          </div>
          <ServiceGrid limit={3} />
        </div>
      </section>

      <section className="values-section">
        <div className="content-width values-grid">
          <div className="values-intro">
            <p className="eyebrow light">04 / The standard</p>
            <h2>Why<br /><em>FliQ Media</em></h2>
            <p>Every frame is an opportunity to shape perception, strengthen a reputation, and create lasting value.</p>
          </div>
          <ValueList />
        </div>
      </section>

      <section className="section portfolio">
        <div className="content-width">
          <div className="section-heading">
            <div><p className="eyebrow">05 / Selected work</p><h2>Made to be<br /><em>Remembered.</em></h2></div>
            <Link className="text-link" to="/portfolio">View all work <MoveRight size={18} /></Link>
          </div>
          <PortfolioGrid />
        </div>
      </section>

      <section className="promise">
        <div className="content-width">
          <p className="eyebrow light">The FliQ promise</p>
          <h2>Exceptional creative experiences<br />that exceed <em>expectations.</em></h2>
          <p>Every project receives the same level of attention, professionalism, and dedication regardless of its size or scope.</p>
        </div>
      </section>

      <ContactCta />
    </>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About FliQ Media / 01" title="A sharper point" italic="of view." image="/images/portfolio/img-001.jpg" />
      <PageIntro eyebrow="01 / The perspective" title="More Than" italic="Photography.">
        <p className="lead">We create visual identity.</p>
        <p>FliQ Media is a premium creative media company dedicated to producing exceptional visual content and strategic branding solutions for executives, organizations, institutions, businesses, public figures, and global brands.</p>
        <p>Creativity, precision, strategic thinking, and technical excellence guide every project. We understand how powerful visuals shape perception and influence decisions.</p>
      </PageIntro>
      <section className="dark-section mission">
        <div className="content-width mission-grid">
          <p className="eyebrow light">02 / The foundation</p>
          <div className="mission-card"><span className="mission-label">Vision</span><p>To be Africa's most respected premium creative media company, recognized globally for producing iconic visual experiences, building influential brands, and redefining excellence.</p></div>
          <div className="mission-card"><span className="mission-label">Mission</span><p>To create exceptional visual content and branding solutions that inspire confidence, communicate value, and position our clients as industry leaders.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="content-width capability-large">
          <p className="eyebrow">03 / Our capabilities</p>
          <div className="capability-strip"><span>Photography</span><span>Visual storytelling</span><span>Creative direction</span><span>Brand storytelling</span><span>Digital media</span></div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services / 02" title="Built around" italic="your ambition." image="/images/services/img-005.jpg" />
      <PageIntro eyebrow="01 / The offering" title="What We" italic="Do">
        <p>Purposeful visual communication for people, brands, and organizations moving with intention. Choose a focused service or combine disciplines for a complete visual campaign.</p>
      </PageIntro>
      <section className="section services">
        <div className="content-width"><ServiceGrid /></div>
      </section>
      <section className="feature-section" id="corporate">
        <div className="feature-image"><img src="/images/services/img-005.jpg" alt="Corporate visual storytelling" /></div>
        <div className="feature-copy">
          <p className="eyebrow">Corporate events</p>
          <h2>Captured<br />With <em>Purpose.</em></h2>
          <p>We understand corporate events as strategic platforms for brand positioning, stakeholder engagement, and public perception.</p>
          <div className="approach-list">
            {['Pre-event consultation and alignment', 'Strategic shot planning and coverage mapping', 'Real-time adaptability during live events', 'Precision-driven post-production'].map((item, index) => (
              <div key={item}><span>0{index + 1}</span><p>{item}</p></div>
            ))}
          </div>
          <WhatsAppButton label="Plan your production" />
        </div>
      </section>
      <ContactCta />
    </>
  );
}

export function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const filtered = activeCategory === 'All' ? placeholderSlots : placeholderSlots.filter((s) => s.category === activeCategory);

  return (
    <>
      <PageHero eyebrow="Portfolio / 03" title="Work with" italic="intention." />
      <section className="section portfolio">
        <div className="content-width">
          <PageIntro eyebrow="01 / Selected work" title="Made to be" italic="Remembered.">
            <p>Our work is built to do more than look exceptional. It is designed to clarify, elevate, and make an impression that lasts.</p>
          </PageIntro>
          <PortfolioGrid />

          <div className="portfolio-gallery-heading">
            <p className="eyebrow">02 / Full gallery</p>
            <div className="portfolio-filters">
              <button className={activeCategory === 'All' ? 'active' : ''} onClick={() => setActiveCategory('All')}>All</button>
              {portfolioCategories.map((cat) => (
                <button key={cat} className={activeCategory === cat ? 'active' : ''} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
          </div>

          <div className="portfolio-gallery">
            {filtered.map((slot) => (
              <article className="gallery-slot" key={slot.id}>
                <div className="gallery-slot-inner">
                  {slot.path ? (
                    <img src={slot.path} alt={`Portfolio ${slot.id}`} />
                  ) : (
                    <div className="gallery-placeholder">
                      <span className="placeholder-number">{String(slot.id).padStart(2, '0')}</span>
                      <span className="placeholder-label">{slot.category}</span>
                      <span className="placeholder-hint">Add image</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

export function CorporatePage() {
  return (
    <>
      <PageHero eyebrow="Corporate / 04" title="Presence made" italic="visible." image="/images/services/img-005.jpg" />
      <PageIntro eyebrow="01 / Corporate events" title="Captured With" italic="Purpose.">
        <p>We understand corporate events as strategic platforms for brand positioning, stakeholder engagement, and public perception. Our visual outputs are high-impact assets organizations can deploy across multiple platforms.</p>
      </PageIntro>
      <section className="section">
        <div className="content-width">
          <div className="process-grid">
            {['Pre-event consultation and alignment with communication goals', 'Strategic shot planning and coverage mapping', 'Real-time adaptability during live events', 'Precision-driven post-production for brand consistency', 'Media-ready delivery for every platform'].map((text, index) => (
              <div className="process-step" key={text}>
                <span>0{index + 1}</span>
                <h3>{['Align', 'Plan', 'Adapt', 'Refine', 'Deliver'][index]}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <p className="statement">Our deliverables are designed to extend the life and value of your event far beyond the day it happened.</p>
        </div>
      </section>
      <section className="feature-section">
        <div className="feature-image"><img src={firstbankProject.heroImage} alt={firstbankProject.client} /></div>
        <div className="feature-copy">
          <p className="eyebrow">Case study</p>
          <h2>{firstbankProject.client}<br /><em>{firstbankProject.title}.</em></h2>
          <p>{firstbankProject.description}</p>
          <Link className="button button-dark" to={`/corporate/${firstbankProject.slug}`}>View Case Study <ArrowUpRight size={16} /></Link>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

// ---------------------------------------------------------------------------
// FirstBank x FliQ Media — corporate photography case study.
// Content sourced from the FIRST BANK X FLIQ MEDIA presentation deck.
// ---------------------------------------------------------------------------

const firstbankObjectives = [
  ['01', 'Brand Consistency', "Our role ensures that the bank's visual identity remains consistent across all digital platforms. This consistency helps build trust and recognition among customers and potential clients."],
  ['02', 'Engagement', "Through our photography, we tell compelling stories about the bank's mission, values, and community involvement — helping to humanize the institution and connect with its audience on a deeper level."],
  ['03', 'Reputation Enhancement', 'As a creative and digital photography brand, our high-resolution, quality images contribute to the reputation, differentiation, and trustworthiness of the bank — a crucial factor in the financial industry.'],
] as const;

const firstbankTechniques = [
  ['01', 'Composition', 'We experiment with different poses, angles, and positions to create visually interesting compositions.'],
  ['02', 'Lighting', 'Natural and artificial lighting techniques are used to shape the mood and atmosphere of each photograph.'],
  ['03', 'Storytelling', 'Photographs are built to capture a story or a moment in time, encouraging subjects to interact and show relationships, feeling, or emotion — candid or carefully staged.'],
  ['04', 'Location & Background', 'The choice of location and background is considered carefully, complementing the visual interpretation, story, and theme of each project.'],
  ['05', 'Color & Style', 'Color grading and post-processing techniques are used to create a unique, cohesive visual style.'],
  ['06', 'Props & Accessories', 'Props and accessories add layers of creativity, revealing personality and enhancing the overall theme.'],
  ['07', 'Perspective', 'We play with different camera angles and perspectives — high above, ground level, or unusual viewpoints — for a fresh, creative view of the subject.'],
  ['08', 'Editing & Retouching', 'Post-production techniques are applied to enhance the visual impact of every photograph.'],
  ['09', 'Emotions & Expressions', 'We encourage genuine emotions and expressions — spontaneous moments that capture raw, authentic feeling and resonate with viewers.'],
] as const;

const fliqStandard = ['Technical Proficiency', 'Creativity and Innovation', 'Attention to Detail', 'Consistency', 'Adaptability', 'Communication Skills', 'Emotional Intelligence', 'Professionalism', 'Continuous Learning', 'Ethical Standards', 'Portfolio and Body of Work', 'Collaboration'] as const;

const firstbankProcess = [
  ['01', 'Pre-Shoot Preparation', 'We consult with clients on themes, locations, wardrobe, and special requests, build a moodboard, prepare a shot list and equipment, and arrange any permits the location requires.'],
  ['02', 'Photography Session', 'We arrive on time, set up lighting, cameras, and accessories, then direct and guide subjects to capture the desired shots while keeping the experience comfortable and enjoyable.'],
  ['03', 'Post-Processing & Editing', 'RAW files are processed and adjusted, images are edited and retouched to meet quality standards and client expectations, and backups are created to prevent data loss.'],
  ['04', 'Client Delivery', 'Final edited images are shared through a secure, efficient method — an online gallery, USB drive, or physical prints — with access to view, download, or purchase additional prints or products.'],
  ['05', 'Invoicing & Payments', 'We generate and send invoices for services and any additional products, monitor payment schedules, follow up on overdue payments, and maintain accurate financial records.'],
  ['06', 'Legal & Administration', "We read and understand the legal imperatives of photographing each client, stay compliant with local business regulations and tax requirements, and keep organized records of expenses, income, and contracts."],
  ['07', 'Client Feedback & Follow-Up', 'We request feedback to evaluate service quality and identify areas for improvement, then follow up with clients after the shoot to ensure satisfaction and address any concerns.'],
] as const;

const firstbankGallerySlots = Array.from({ length: 8 }, (_, i) => i + 1);

export function FirstBankPage() {
  usePageMeta('FirstBank × FliQ Media | Digital Marketing Photography', 'A FirstBank corporate photography case study by FliQ Media, focused on brand consistency, engagement, reputation and visual storytelling.');

  return (
    <>
      <PageHero eyebrow="FirstBank × FliQ Media" title="Digital Marketing" italic="Photography." image={firstbankProject.heroImage} />

      <section className="case-meta-bar">
        <div className="content-width case-meta-row">
          <div><span>Client</span><span>{firstbankProject.client}</span></div>
          <div><span>Category</span><span>{firstbankProject.category}</span></div>
          <div><span>Focus</span><span>{firstbankProject.title}</span></div>
          <div><span>Partner</span><span>FliQ Media Photography</span></div>
        </div>
      </section>

      <section className="feature-section">
        <div className="feature-image"><img src="/images/firstbank/overview.jpg" alt="FirstBank digital marketing photography overview" /></div>
        <div className="feature-copy">
          <p className="eyebrow">01 / Overview</p>
          <h2>Presence, <em>Made Consistent.</em></h2>
          <p>FliQ Media partnered with FirstBank, Nigeria to deliver digital marketing photography built to support the bank's communication across digital platforms. The engagement was guided by three core objectives — brand consistency, engagement, and reputation enhancement — each carried through every frame we produced.</p>
          <WhatsAppButton label="Discuss a similar project" />
        </div>
      </section>

      <section className="section">
        <div className="content-width">
          <div className="section-heading">
            <div><p className="eyebrow">02 / Project objectives</p><h2>Our Objectives,<br /><em>In Three Fold.</em></h2></div>
          </div>
          <div className="objectives-grid">
            {firstbankObjectives.map(([number, title, text]) => (
              <Reveal key={number}>
                <div className="objective-card">
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="dark-section creative-section">
        <div className="content-width">
          <p className="eyebrow light">03 / Creative direction</p>
          <h2>Our Creative<br /><em>Capacity.</em></h2>
          <div className="creative-gallery">
            {['creative-01', 'creative-02', 'creative-03', 'creative-04', 'creative-05', 'creative-06'].map((file, index) => (
              <article className="portfolio-item" key={file}>
                <img src={`/images/firstbank/${file}.jpg`} alt={`FliQ Media creative direction, frame ${index + 1}`} />
              </article>
            ))}
          </div>
          <div className="values-list">
            {firstbankTechniques.map(([number, title, text]) => (
              <div className="value-row" key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
                <ChevronRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section portfolio">
        <div className="content-width">
          <div className="portfolio-gallery-heading" style={{ paddingTop: 0, borderTop: 0 }}>
            <div><p className="eyebrow">04 / Photography gallery</p><h2>The FirstBank<br /><em>Gallery.</em></h2></div>
          </div>
          <p style={{ maxWidth: 560, margin: '0 0 45px', color: '#69645d', fontSize: 13, lineHeight: 1.7 }}>This gallery is reserved for the final FirstBank photography. Once delivered, the images will appear here in the same editorial standard as the rest of our portfolio.</p>
          <div className="portfolio-gallery">
            {firstbankGallerySlots.map((slot) => (
              <article className="gallery-slot" key={slot}>
                <div className="gallery-slot-inner">
                  <div className="gallery-placeholder">
                    <span className="placeholder-number">{String(slot).padStart(2, '0')}</span>
                    <span className="placeholder-label">FirstBank</span>
                    <span className="placeholder-hint">Add photo</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="content-width">
          <p className="eyebrow light">05 / The FliQ standard</p>
          <h2>The Quality Behind<br /><em>Every Frame.</em></h2>
          <p style={{ maxWidth: 460, marginTop: 24, color: '#a7a39d', fontSize: 13, lineHeight: 1.7 }}>The quality of photographers on our team is the secret behind our success.</p>
          <div className="attribute-grid" style={{ borderTop: '1px solid #4f4d49', marginTop: 45 }}>
            {fliqStandard.map((quality, index) => (
              <span key={quality} style={{ borderBottom: '1px solid #4f4d49', color: 'white' }}>{String(index + 1).padStart(2, '0')} / {quality}</span>
            ))}
          </div>
          <p className="statement" style={{ color: '#d5d1c9' }}>In a creative team, the combined skill, experience, and creative synergy of our photographers produce work greater than the sum of individual talent.</p>
        </div>
      </section>

      <section className="process-section">
        <div className="content-width">
          <p className="eyebrow light">06 / Execution</p>
          <h2>How The Project<br /><em>Was Executed.</em></h2>
          <div className="timeline">
            {firstbankProcess.map(([number, title, text]) => (
              <div className="timeline-step" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="trusted">
        <div className="content-width">
          <p className="eyebrow">07 / Selected clients</p>
          <h2 style={{ fontSize: 'clamp(36px, 4.5vw, 56px)', marginBottom: 10 }}>Trusted Across<br /><em>Industries.</em></h2>
          <div className="client-grid">{firstbankDeckClients.map((client) => <span key={client}>{client}</span>)}</div>
        </div>
      </section>

      <section className="case-closing" style={{ backgroundImage: `url('/images/firstbank/closing.jpg')` }}>
        <div className="content-width">
          <p className="eyebrow light">FirstBank × FliQ Media Photography</p>
          <h2>Visual storytelling,<br /><em>built with purpose.</em></h2>
          <p className="closing-copy">Every frame produced for this engagement was built to strengthen brand consistency, deepen engagement, and enhance reputation — for FirstBank, and for every organization we partner with.</p>
          <WhatsAppButton label="Start Your Project" />
        </div>
      </section>

      <ContactCta />
    </>
  );
}

export function PersonalBrandingPage() {
  return (
    <>
      <PageHero eyebrow="Personal Branding / 05" title="People buy" italic="perception." image="/images/portfolio/img-002.jpg" />
      <PageIntro eyebrow="01 / Personal branding" title="We create" italic="visual identities.">
        <p className="lead">People buy products. They buy people. They buy stories. They buy perception.</p>
        <p>A person's image is often their first introduction before their voice, work, or reputation speaks. We translate who you are, what you stand for, and the value you represent into images that communicate without words.</p>
      </PageIntro>
      <section className="section personal">
        <div className="content-width">
          <div className="attribute-grid">
            {['Authority', 'Trust', 'Confidence', 'Professionalism', 'Personality', 'Relevance'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="personal-process">
            <p className="eyebrow">02 / Our approach</p>
            <h2>Designed around<br /><em>your world.</em></h2>
            <p>We study your industry, personality, audience, goals, and message, then design a photography session that visually aligns with your brand positioning.</p>
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

export function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Process / 06" title="From intention" italic="to impact." />
      <PageIntro eyebrow="01 / The process" title="A considered" italic="approach">
        <p>Every project starts with clarity. We bring structure to the creative process so each decision serves the larger story and your objectives.</p>
      </PageIntro>
      <section className="process-section">
        <div className="content-width">
          <div className="process-grid">
            {[['01', 'Discover', "Understand the client's vision, goals, audience, and objectives."], ['02', 'Strategize', 'Develop a creative strategy and visual direction.'], ['03', 'Produce', 'Execute photography and video production with precision.'], ['04', 'Refine', 'Apply professional post-production and maintain brand consistency.'], ['05', 'Deliver', "Provide polished, high-quality assets aligned with the client's objectives."]].map(([number, title, text]) => (
              <div className="process-step" key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section industries">
        <div className="content-width industries-grid">
          <div><p className="eyebrow">02 / The community</p><h2>Who<br /><em>We Serve</em></h2></div>
          <div className="industry-list">{industries.map((industry) => <span key={industry}>{industry}</span>)}</div>
        </div>
      </section>
      <section className="trusted">
        <div className="content-width">
          <p className="eyebrow">03 / Trusted by</p>
          <div className="client-grid">{clients.map((client) => <span key={client}>{client}</span>)}</div>
        </div>
      </section>
      <ContactCta />
    </>
  );
}

export function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact / 07" title="Let's create" italic="with purpose." image="/images/hero/img-004.jpg" />
      <section className="section contact">
        <div className="content-width contact-grid">
          <div>
            <p className="eyebrow">01 / Start a conversation</p>
            <h2>Make your next move <em>memorable.</em></h2>
            <p>Book a consultation directly on WhatsApp and tell us about your project.</p>
            <div className="contact-links">
              <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} /> WhatsApp <strong>{whatsappNumber}</strong></a>
              <a href={googleBusinessUrl} target="_blank" rel="noreferrer"><GoogleIcon size={17} /> Find FliQ Media on Google</a>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}

function ServiceGrid({ limit }: { limit?: number }) {
  return (
    <div className="service-grid">
      {services.slice(0, limit).map(([number, title, text, image]) => (
        <article className="service-card" key={number}>
          <div className="service-image"><img src={image} alt={title} /></div>
          <div className="service-meta"><span>{number}</span><h3>{title}</h3><ArrowUpRight size={19} /></div>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function ValueList() {
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

function PortfolioGrid() {
  return (
    <div className="portfolio-featured">
      {featuredWork.map((item) => (
        <article className={`portfolio-item ${item.tall ? 'portfolio-tall' : ''} ${item.wide ? 'portfolio-wide' : ''}`} key={item.title}>
          <img src={item.image} alt={item.title} />
          <div className="portfolio-overlay">
            <span>{item.category}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <Link to={item.href ?? '/contact'}>View project <ArrowUpRight size={16} /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function ContactCta() {
  return (
    <section className="contact-cta">
      <div className="content-width">
        <p className="eyebrow light">Start a conversation</p>
        <h2>Ready to create something that <em>commands attention?</em></h2>
        <WhatsAppButton />
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  return submitted ? (
    <div className="form-success">
      <div><Check size={22} /></div>
      <h3>Thank you for reaching out.</h3>
      <p>We'll be in touch soon to discuss how we can create with purpose.</p>
    </div>
  ) : (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Full name<input required placeholder="Your name" /></label>
        <label>Company / organization<input placeholder="Company name" /></label>
      </div>
      <div className="form-row">
        <label>Email address<input required type="email" placeholder="you@company.com" /></label>
        <label>Phone number<input placeholder="Your phone number" /></label>
      </div>
      <label>Service required<select defaultValue="" required>
        <option value="" disabled>Select a service</option>
        <option>Corporate Photography</option>
        <option>Personal Branding</option>
        <option>Corporate Events</option>
        <option>Commercial Photography</option>
      </select></label>
      <label>Project details<textarea required placeholder="Tell us about your project" rows={5} /></label>
      <button className="button button-dark" type="submit">Start a Conversation <ArrowUpRight size={16} /></button>
    </form>
  );
}
