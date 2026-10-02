import { ContactCta, PageHero, PageIntro } from '@/PageParts';

export function PersonalBrandingPage() {
  return (
    <>
      <PageHero eyebrow="Personal Branding / 05" title="People buy" italic="perception." image="/images/personalbrandingportraits/CHIOMA169.webp" />
      <PageIntro eyebrow="01 / Personal branding" title="We create" italic="visual identities.">
        <p className="lead">People buy products. They buy people. They buy stories. They buy perception.</p>
        <p>A person's image is often their first introduction before their voice, work, or reputation speaks. We translate who you are, what you stand for, and the value you represent into images that communicate without words.</p>
      </PageIntro>
      <section className="section personal">
        <div className="content-width">
          <div className="attribute-grid">{['Authority', 'Trust', 'Confidence', 'Professionalism', 'Personality', 'Relevance'].map((item) => <span key={item}>{item}</span>)}</div>
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
