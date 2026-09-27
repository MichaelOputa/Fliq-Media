export const whatsappNumber = '08134525821';
export const whatsappUrl = `https://wa.me/2348134525821?text=${encodeURIComponent('Hello FliQ Media, I would like to book a consultation.')}`;
export const googleBusinessUrl = 'https://www.google.com/search?sca_esv=033d84a1d3790378&rlz=1CDGOYI_enNG977NG977&hl=en-US&sxsrf=APpeQnvvAqVId2F1cbBnJVdzM_DcU3juvQ%3A1790243184360&kgmid=%2Fg%2F11l5cggt9n&q=FliQMedia&shem=epsd1%2Cltae%2Crimspwouoe&shndl=30&source=sh%2Fx%2Floc%2Fact%2Fm4%2F3';

export const instagramUrl = 'https://instagram.com/fliqmedia_';
export const xUrl = 'https://x.com/fliqmedia';
export const facebookUrl = 'https://facebook.com/Fliqmedia_';
export const tiktokUrl = 'https://tiktok.com/@Fliq.media';
export const pinterestUrl = 'https://pinterest.com/FliQMedia';

export const navItems = [
  ['About', '/about'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Corporate', '/corporate'],
  ['Personal Branding', '/personal-branding'],
  ['Process', '/process'],
  ['Contact', '/contact'],
] as const;

export const services = [
  ['01', 'Corporate Headshots', 'Professional portraits designed to communicate credibility, confidence, and professionalism.', '/images/portfolio/img-001.jpg'],
  ['02', 'Executive Portraits', 'High-end portraits for executives, founders, business leaders, and professionals.', '/images/hero/img-004.jpg'],
  ['03', 'Personal Branding', "Strategic photography built around your industry, personality, audience, goals, and message.", '/images/portfolio/img-002.jpg'],
  ['04', 'Commercial Photography', 'Professional visual content designed to support businesses, campaigns, products, and marketing objectives.', '/images/services/img-005.jpg'],
  ['05', 'Corporate Events', 'Strategic coverage for conferences, summits, launches, executive meetings, and more.', '/images/hero/img-004.jpg'],
  ['06', 'Visual Storytelling', 'Photography and visual content designed to communicate meaningful stories.', '/images/services/img-005.jpg'],
] as const;

export const clients = ['Clinton Foundation', 'Clinton Health Access Initiative', 'Carriagehills', 'Top Global Dubai', 'Smirnoff Ice', 'First Bank of Nigeria', 'VFD Bank', 'VFD Group', 'Sterling Bank', 'Quidax', 'Wirepay', 'Incash Africa', 'Mantra Security'];

// The client roster as presented in the FirstBank x FliQ Media deck (page 6).
// Kept separate from `clients` above (the site's own curated "trusted by" list)
// since this is a verbatim reproduction of the deck's own portfolio slide —
// several names overlap (VFD Group, Sterling Bank, Quidax, Smirnoff Ice,
// Top Global Dubai) and that overlap is intentional, not a data bug.
export const firstbankDeckClients = ['Don Jazzy', 'Davido', 'Rick Ross', 'Tiwa Savage', 'Buju', 'Mayorkun', 'Loose Media', 'Carriage Hill & Co', 'VFD Group', 'Herel Real Estate', 'Transcorp Group', 'Boardroom Apartment', 'The Beat 99.9 FM', 'BBNaija Stars', 'Access Bank', 'Top Global Dubai', 'Monnistries Fashion', 'Eko Hotel & Suites', 'Quidax', 'Smirnoff Ice', 'Mentra Security', 'Sterling Bank', 'WirePay', 'InCash Africa', 'Interswitch'];

export const industries = ['Corporate Organizations', 'Government Institutions', 'Multinational Companies', 'Financial Institutions', 'Healthcare Organizations', 'Educational Institutions', 'Technology Companies', 'Real Estate Firms', 'Hospitality Brands', 'Non-Governmental Organizations', 'Media Companies', 'Entertainment Professionals', 'Sports Organizations', 'Luxury Brands', 'Entrepreneurs', 'Business Leaders'];
export const values = [['Excellence', 'We pursue the highest standards in every project and deliver work that reflects quality, precision, and professionalism.'], ['Creativity', 'We transform ideas into compelling visual experiences that inspire audiences and create meaningful connections.'], ['Integrity', 'We build lasting relationships through honesty, transparency, accountability, and ethical business practices.'], ['Innovation', 'We embrace new ideas, emerging technologies, and creative thinking to remain at the forefront of the industry.'], ['Client Commitment', 'We understand the unique goals of every client and provide tailored solutions that deliver measurable value.'], ['Impact', 'We create visual content that influences perception, strengthens brands, and leaves a lasting impression.']] as const;

// Dedicated corporate case-study project, referenced by both the homepage
// "Selected Work" grid and the /corporate/firstbank case-study page itself.
export const firstbankProject = {
  slug: 'firstbank',
  client: 'FirstBank, Nigeria',
  title: 'Digital Marketing Photography',
  category: 'Corporate Photography',
  description: 'Visual storytelling built to support brand consistency, audience engagement, and reputation for FirstBank, Nigeria.',
  heroImage: '/images/firstbank/hero.jpg',
} as const;
