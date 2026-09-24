import { FormEvent, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, ChevronRight, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleIcon, WhatsAppIcon } from '@/BrandIcons';
import { clients, googleBusinessUrl, industries, services, values, whatsappNumber, whatsappUrl } from '@/siteData';

const heroImage = '/images/hero/img-004.jpg';
const featuredWork = [
  { category: 'Executive Portraits', title: 'The Authority Series', text: 'Portraiture with presence and purpose.', image: '/images/portfolio/img-001.jpg', tall: true },
  { category: 'Personal Branding', title: 'Distinctly You', text: 'A visual identity in every frame.', image: '/images/portfolio/img-002.jpg', tall: false },
  { category: 'Corporate', title: 'Boardroom Presence', text: 'Confidence, made visible.', image: '/images/portfolio/img-003.jpg', tall: false },
  { category: 'Campaigns', title: 'Modern Heritage', text: 'Culture, character, and craft.', image: '/images/portfolio/img-004.jpg', tall: true },
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
          <div className="portfolio-featured">
            {featuredWork.map((item) => (
              <article className={`portfolio-item ${item.tall ? 'portfolio-tall' : ''}`} key={item.title}>
                <img src={item.image} alt={item.title} />
                <div className="portfolio-overlay">
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <Link to="/contact">View project <ArrowUpRight size={16} /></Link>
                </div>
              </article>
            ))}
          </div>

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
        <article className={`portfolio-item ${item.tall ? 'portfolio-tall' : ''}`} key={item.title}>
          <img src={item.image} alt={item.title} />
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
