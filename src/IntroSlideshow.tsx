import { useCallback, useEffect, useState } from 'react';

const slides = [
  '/images/hero/img-004.jpg',
  '/images/portfolio/img-011.jpg',
  '/images/portfolio/img-044.jpg',
  '/images/portfolio/img-050.jpg',
  '/images/portfolio/img-020.jpg',
  '/images/hero/img-pricing.jpg',
];
const SLIDE_MS = 1700;
const STORAGE_KEY = 'fliq-intro-seen';

function shouldShow() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return sessionStorage.getItem(STORAGE_KEY) !== '1';
  } catch {
    return true;
  }
}

export function IntroSlideshow() {
  const [visible, setVisible] = useState(shouldShow);
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [index, setIndex] = useState(0);

  const finish = useCallback(() => {
    setLeaving(true);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    window.setTimeout(() => setVisible(false), 900);
  }, []);

  // Preload every slide (with a safety timeout) so the show never stutters.
  useEffect(() => {
    if (!visible) return;
    let done = false;
    const start = () => { if (!done) { done = true; setReady(true); } };
    const timeout = window.setTimeout(start, 4000);
    Promise.all(slides.map((src) => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = src;
    }))).then(() => { window.clearTimeout(timeout); start(); });
    return () => window.clearTimeout(timeout);
  }, [visible]);

  // Advance slides, then leave after the last one.
  useEffect(() => {
    if (!visible || !ready || leaving) return;
    const timer = window.setTimeout(() => {
      if (index >= slides.length - 1) finish();
      else setIndex((i) => i + 1);
    }, SLIDE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, ready, leaving, index, finish]);

  // Lock page scroll while the intro is on screen.
  useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`intro${leaving ? ' intro-leaving' : ''}`} role="dialog" aria-label="FliQ Media introduction">
      {slides.map((src, i) => (
        <div
          key={src}
          className={`intro-slide${ready && i === index ? ' active' : ''}`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
      <div className="intro-shade" />
      <img className="intro-logo" src="/fliq_media_logo.png" alt="FliQ Media" />
      <div className="intro-footer">
        <span className="intro-count">{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</span>
        <div className="intro-progress"><i key={index} className={ready ? 'run' : ''} style={{ animationDuration: `${SLIDE_MS}ms` }} /></div>
        <button type="button" className="intro-skip" onClick={finish}>Skip</button>
      </div>
    </div>
  );
}
