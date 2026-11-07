'use client';
import { useMemo } from 'react';

export type SplitWord = { word: string; index: number };

/**
 * Splits text into words (keeping spaces) so each can be wrapped in a
 * mask for staggered reveals. Pure + SSR-safe — no DOM mutation, so the
 * full sentence is present in server HTML for SEO and no-JS users.
 */
export function useSplitText(text: string) {
  return useMemo<SplitWord[]>(
    () => text.split(/\s+/).filter(Boolean).map((word, index) => ({ word, index })),
    [text],
  );
}

/** Split into lines on explicit "\n" then words */
export function splitLines(text: string) {
  return text.split('\n').map((line) => line.split(/\s+/).filter(Boolean));
}
