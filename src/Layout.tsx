import { useState } from 'react';
import { ArrowUpRight, Instagram, Linkedin, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { FacebookIcon, GoogleIcon, PinterestIcon, TikTokIcon, WhatsAppIcon, XIcon } from '@/BrandIcons';
import { facebookUrl, googleBusinessUrl, instagramUrl, navItems, pinterestUrl, tiktokUrl, whatsappNumber, whatsappUrl, xUrl } from '@/siteData';

export function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className="site-nav">
        <Link className="brand-mark" to="/" onClick={closeMenu} aria-label="FliQ Media home">
          <img src="/fliq_media_logo.png" alt="FliQ Media Photography" />
        </Link>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          {navItems.map(([label, path]) => (
            <Link className={location.pathname === path ? 'active' : ''} to={path} key={path} onClick={closeMenu}>{label}</Link>
          ))}
          <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={15} /> Book a Consultation
          </a>
        </nav>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="content-width">
        <div className="footer-top">
          <Link className="footer-logo" to="/"><img src="/fliq_media_logo.png" alt="FliQ Media Photography" /></Link>
          <p>Premium Photography, Visual Storytelling<br />& Strategic Brand Communication.</p>
          <a className="footer-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppIcon size={16} /> {whatsappNumber}
          </a>
          <div className="socials">
            <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href={xUrl} target="_blank" rel="noreferrer" aria-label="X">
              <XIcon size={16} />
            </a>
            <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
              <FacebookIcon size={17} />
            </a>
            <a href={tiktokUrl} target="_blank" rel="noreferrer" aria-label="TikTok">
              <TikTokIcon size={16} />
            </a>
            <a href={pinterestUrl} target="_blank" rel="noreferrer" aria-label="Pinterest">
              <PinterestIcon size={17} />
            </a>
            <a href={googleBusinessUrl} target="_blank" rel="noreferrer" aria-label="FliQ Media on Google">
              <GoogleIcon size={17} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin size={17} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 FliQ Media. All Rights Reserved.</span>
          <div>{navItems.slice(0, 4).map(([label, path]) => <Link to={path} key={path}>{label}</Link>)}</div>
          <Link to="/contact">Start a conversation <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </footer>
  );
}
