type LenisLike = { scrollTo: (t: number, o: { duration?: number; lock?: boolean; force?: boolean }) => void };

/**
 * Glide so `el` sits just below the fixed site header. Uses an exact pixel
 * target (computed after the new step is on screen) and goes through Lenis when
 * the site's smooth scroll is active, so the two never fight.
 */
export function scrollToTop(el: HTMLElement | null, offset = 92) {
  if (!el) return;
  const top = el.getBoundingClientRect().top;
  if (Math.abs(top - offset) < 12) return; // already in place
  const target = Math.max(0, window.scrollY + top - offset);
  const lenis = (window as Window & { __lenis?: LenisLike }).__lenis;
  if (lenis) lenis.scrollTo(target, { duration: 0.7, lock: true, force: true });
  else window.scrollTo({ top: target, behavior: 'smooth' });
}
