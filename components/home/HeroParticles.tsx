'use client';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { ParticleField } from './ParticleField';
import { cn } from '@/lib/utils';

// three.js is code-split and only loaded in the browser, after first paint
const Scene = dynamic(() => import('./HeroParticlesScene'), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/**
 * Live 3D particle flower behind the hero. Pauses when the user presses
 * pause, the tab is hidden, or the hero scrolls off-screen. Reduced motion
 * renders a single still frame. Without WebGL it falls back to the 2D
 * canvas ribbon.
 */
export function HeroParticles({ paused, className }: { paused: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<boolean | null>(null);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // wait for idle so the canvas never competes with the headline (LCP)
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number };
    const start = () => setWebgl(hasWebGL());
    if (w.requestIdleCallback) w.requestIdleCallback(start);
    else window.setTimeout(start, 200);

    const onVis = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onVis);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    if (ref.current) io.observe(ref.current);
    return () => {
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
    };
  }, []);

  const running = !paused && visible && inView && !reduced;

  return (
    <div ref={ref} aria-hidden className={cn('pointer-events-none', className)}>
      {webgl === false ? (
        <ParticleField paused={paused} className="h-full w-full" />
      ) : webgl ? (
        <div className={cn('h-full w-full transition-opacity duration-[1500ms] ease-out', ready ? 'opacity-100' : 'opacity-0')}>
          <Scene running={running} reduced={reduced} onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
