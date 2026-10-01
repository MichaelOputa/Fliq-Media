import { ContactCta, PageHero, PageIntro } from '@/PageParts';

export function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About FliQ Media / 01" title="A sharper point" italic="of view." image="/images/corporateheadshots/DSC02301.webp" />
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
