'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Premium smooth scrolling for mouse / trackpad (desktop) via Lenis, driven by
 * GSAP's ticker so scroll-linked animations stay perfectly in sync.
 * Touch devices keep native momentum scrolling; reduced-motion users get plain scroll.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    window.__lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // smooth in-page anchor links, offset for the fixed header
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href*="#"]');
      if (!a) return;
      const url = new URL(a.href, location.href);
      if (url.pathname !== location.pathname || url.hash.length < 2) return;
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -88 });
    };
    document.addEventListener('click', onClick);

    // pause smooth scroll while a full-screen overlay (menu, search, video) locks the body
    const obs = new MutationObserver(() => (document.body.style.overflow === 'hidden' ? lenis.stop() : lenis.start()));
    obs.observe(document.body, { attributes: true, attributeFilter: ['style'] });

    return () => {
      document.removeEventListener('click', onClick);
      obs.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // reset to top + recalc reveal positions on route change
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
