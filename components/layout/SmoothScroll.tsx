'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/gsap';

/** Native scrolling. Resets position and recalculates scroll reveals on route change. */
export function SmoothScroll() {
  const pathname = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => window.clearTimeout(id);
  }, [pathname]);
  return null;
}
