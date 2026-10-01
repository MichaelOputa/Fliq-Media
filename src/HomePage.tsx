import { ArrowDown, ArrowUpRight, MoveRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactPage } from '@/ContactPage';
import { PageIntro, PortfolioGrid, ServiceGrid, ValueList, WhatsAppButton } from '@/PageParts';

const clientReviews = [
  { name: 'BeatFM', quote: 'The best pictures were the night pics. Impressive work, bro.' },
  { name: 'Dr Priscilla Canada', quote: 'I received the package, and both Gab and I really like the quality and the way the photos were arranged in the album. It looks beautiful! We wish you had printed more calendars because we would love to give some to our parents.' },
  { name: 'Daniel Coast', quote: 'Thanks a lot, man. The photos you took were lovely.' },
  { name: 'Labake', quote: 'Hope the rest of your weekend went well. The photos are so lovely! Thank you.' },
  { name: 'Stella Uko', quote: 'The photos are lovely. Many thanks.' },
  { name: 'Sir Dickson', quote: 'The pictures are really good.' },
  { name: 'Leap Africa', quote: 'Thank you so much for today. I truly appreciate your timeliness and professionalism. The team said you were professional, smart, composed, and fully prepared. You and your colleague were calm and never pressured anything. They praised the quality of your work and your ability to direct without crossing boundaries.' },
  { name: 'Dora', quote: "It's so nice that you still have all of these. Thank you for the nice photos, worth a thousand memories." },
];

export function HomePage() {
  return (
    <>
      <section className="hero" aria-label="FliQ Media introduction">
        <div className="hero-image" style={{ backgroundImage: "url('/images/hero/homepage.jpeg')" }} />
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

      <section className="section reviews">
        <div className="content-width">
          <div className="section-heading">
            <div><p className="eyebrow">06 / Client notes</p><h2>Seen through<br /><em>their eyes.</em></h2></div>
            <p className="reviews-intro">A few words from the people and teams who trusted us with their moments.</p>
          </div>
          <div className="reviews-grid">
            {clientReviews.map((review) => (
              <figure className="review-item" key={review.name}>
                <blockquote>{review.quote}</blockquote>
                <figcaption>{review.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="promise">
        <div className="content-width">
          <p className="eyebrow light">The FliQ promise</p>
          <h2>Exceptional creative experiences<br />that exceed <em>expectations.</em></h2>
          <p>Every project receives the same level of attention, professionalism, and dedication regardless of its size or scope.</p>
        </div>
      </section>
      <ContactPage />
    </>
  );
}
