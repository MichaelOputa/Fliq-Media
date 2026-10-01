import { ContactCta, PageHero, PageIntro, ServiceGrid, WhatsAppButton } from '@/PageParts';

export function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services / 02" title="Built around" italic="your ambition." image="/images/services/img-005.jpg" />
      <PageIntro eyebrow="01 / The offering" title="What We" italic="Do">
        <p>Purposeful visual communication for people, brands, and organizations moving with intention. Choose a focused service or combine disciplines for a complete visual campaign.</p>
      </PageIntro>
      <section className="section services"><div className="content-width"><ServiceGrid /></div></section>
      <section className="feature-section" id="corporate">
        <div className="feature-image"><img src="/images/services/img-005.jpg" alt="Corporate visual storytelling" loading="lazy" decoding="async" /></div>
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
