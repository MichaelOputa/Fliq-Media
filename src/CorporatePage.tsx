import { ContactCta, PageHero, PageIntro } from '@/PageParts';

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
              <div className="process-step" key={text}><span>0{index + 1}</span><h3>{['Align', 'Plan', 'Adapt', 'Refine', 'Deliver'][index]}</h3><p>{text}</p></div>
            ))}
          </div>
          <p className="statement">Our deliverables are designed to extend the life and value of your event far beyond the day it happened.</p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
