'use client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: 'expo.out', duration: 1.1 });
}

export { gsap, ScrollTrigger };

/**
 * Runs `cb` once when `el` enters the viewport. IntersectionObserver is used
 * instead of ScrollTrigger for one-shot reveals so content can never stay
 * hidden if trigger positions go stale; a 3s safety timer also reveals it.
 */
export function onEnter(el: Element, cb: () => void) {
  let done = false;
  const fire = () => {
    if (done) return;
    done = true;
    io.disconnect();
    window.clearTimeout(safety);
    cb();
  };
  const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && fire(), { rootMargin: '0px 0px -8% 0px' });
  io.observe(el);
  const safety = window.setTimeout(() => {
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) fire();
  }, 3000);
  return () => {
    done = true;
    io.disconnect();
    window.clearTimeout(safety);
  };
}
