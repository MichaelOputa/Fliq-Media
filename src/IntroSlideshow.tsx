import { useCallback, useEffect, useRef, useState } from 'react';

// Small, screen-fit copies live in /public/images/intro (generated from the
// full-resolution portfolio photos) so the first frame appears almost
// instantly instead of waiting on multi-hundred-KB originals.
const slides = [
  '/images/intro/slide-01.jpg',
  '/images/intro/slide-02.jpg',
  '/images/intro/slide-03.jpg',
  '/images/intro/slide-04.jpg',
  '/images/intro/slide-05.jpg',
  '/images/intro/slide-06.jpg',
];
const SLIDE_MS = 900;
const FIRST_SLIDE_TIMEOUT_MS = 350; // never block the reveal for long
const STORAGE_KEY = 'fliq-intro-seen';

// Kick preloading off the moment this module is evaluated — before the
// component even mounts — and cache one shared promise per image so re-runs
// (StrictMode, re-mounts) don't refetch.
const preloadCache = new Map<string, Promise<void>>();
function preload(src: string) {
  let promise = preloadCache.get(src);
  if (!promise) {
    promise = new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = src;
    });
    preloadCache.set(src, promise);
  }
  return promise;
}
slides.forEach(preload);

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
  const advancing = useRef(false);

  const finish = useCallback(() => {
    setLeaving(true);
    try { sessionStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
    window.setTimeout(() => setVisible(false), 450);
  }, []);

  // Reveal the instant the first slide is ready — don't wait on the rest.
  useEffect(() => {
    if (!visible) return;
    let cancelled = false;
    const timeout = window.setTimeout(() => { if (!cancelled) setReady(true); }, FIRST_SLIDE_TIMEOUT_MS);
    preload(slides[0]).then(() => {
      if (cancelled) return;
      window.clearTimeout(timeout);
      setReady(true);
    });
    return () => { cancelled = true; window.clearTimeout(timeout); };
  }, [visible]);

  // Advance slides. If the next image hasn't finished loading yet (slow
  // connection), briefly hold the current one instead of flashing blank.
  useEffect(() => {
    if (!visible || !ready || leaving || advancing.current) return;
    const timer = window.setTimeout(() => {
      advancing.current = true;
      const isLast = index >= slides.length - 1;
      const next = isLast ? index : index + 1;
      const proceed = () => {
        advancing.current = false;
        if (isLast) finish(); else setIndex(next);
      };
      Promise.race([preload(slides[next]), new Promise((r) => window.setTimeout(r, 1200))]).then(proceed);
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
