'use client';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

// Server HTML and the first view render fully visible; only client navigations fade in.
let hasNavigated = false;

/** Rendered from app/template.tsx: a quick, quiet fade between pages. */
export function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const animate = hasNavigated && !reduce;
  useEffect(() => {
    hasNavigated = true;
  }, []);
  if (!animate) return <>{children}</>;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}
