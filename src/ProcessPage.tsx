import { ContactCta, PageHero, PageIntro } from '@/PageParts';
import { clients, industries } from '@/siteData';

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
            {[
              ['01', 'Discover', "Understand the client's vision, goals, audience, and objectives."],
              ['02', 'Strategize', 'Develop a creative strategy and visual direction.'],
              ['03', 'Produce', 'Execute photography and video production with precision.'],
              ['04', 'Refine', 'Apply professional post-production and maintain brand consistency.'],
              ['05', 'Deliver', "Provide polished, high-quality assets aligned with the client's objectives."],
            ].map(([number, title, text]) => (
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
