import { ContactCta, PageHero, PageIntro } from '@/PageParts';
import { eventHourlyRate, eventTypes, hourlyExtras, lookPackages, preWeddingPackages, weddingPackages } from '@/siteData';

export function PricingPage() {
  return (
    <>
      <PageHero eyebrow="Pricing / 07" title="Investment," italic="made clear." image="/images/hero/img-pricing.jpg" />
      <PageIntro eyebrow="01 / Portraits, fashion & editorial" title="Looks &" italic="Retouching.">
        <p>Priced by the number of looks and finished, retouched images delivered. A look change covers a new outfit, setup, or concept within the same session.</p>
      </PageIntro>
      <section className="section pricing">
        <div className="content-width">
          <div className="pricing-table">
            <div className="pricing-row pricing-head"><span>Looks</span><span>Retouched Images</span><span>Price</span></div>
            {lookPackages.map(([looks, images, price]) => (
              <div className="pricing-row" key={looks + images}>
                <span data-label="Looks">{looks}</span><span data-label="Retouched Images">{images}</span><span data-label="Price">{price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="dark-section pricing-events">
        <div className="content-width">
          <p className="eyebrow light">02 / Corporate & lifestyle events</p>
          <h2>Coverage,<br /><em>by the hour.</em></h2>
          <div className="event-rate-grid">{eventTypes.map((type) => <span key={type}>{type}</span>)}</div>
          <p className="event-rate-value">{eventHourlyRate}</p>
        </div>
      </section>
      <section className="section">
        <div className="content-width">
          <PageIntro eyebrow="03 / Weddings" title="One-Day Wedding" italic="Packages.">
            <p>Choose the tier that matches how you want your wedding day preserved.</p>
          </PageIntro>
          <div className="package-grid">
            {weddingPackages.map(([name, price, features]) => (
              <div className="package-card" key={name}><h3>{name}</h3><span className="package-price">{price}</span><ul>{features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section pricing-alt">
        <div className="content-width">
          <PageIntro eyebrow="04 / Pre-wedding" title="Pre-Wedding" italic="Packages.">
            <p>Standalone pre-wedding sessions, priced by outfit count.</p>
          </PageIntro>
          <div className="package-grid package-grid-compact">
            {preWeddingPackages.map(([name, price, detail]) => (
              <div className="package-card" key={name}><h3>{name}</h3><span className="package-price">{price}</span><p>{detail}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="content-width">
          <p className="eyebrow">05 / Additional services</p>
          <div className="approach-list approach-list-light">
            {hourlyExtras.map(([label, price]) => <div key={label}><span>{price}</span><p>{label}</p></div>)}
          </div>
          <p className="pricing-note">All copyrights to media created during a shoot remain with FliQ Media. Purchased images include print rights for personal use; commercial use, resale, or publication requires prior permission.</p>
        </div>
      </section>
      <ContactCta />
    </>
  );
}
