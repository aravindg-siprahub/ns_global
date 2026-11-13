import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]) => clsx(inputs);

/** Premium easing used everywhere – cubic-bezier(0.16, 1, 0.3, 1) */
export const EASE = [0.16, 1, 0.3, 1] as const;
export const EASE_CSS = 'cubic-bezier(0.16, 1, 0.3, 1)';
/** GSAP equivalent of the premium curve (expo.out is visually identical) */
export const GSAP_EASE = 'expo.out';

export const unsplash = (id: string, w = 1600, q = 75) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=${q}`;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.nsglobaltech.com';
