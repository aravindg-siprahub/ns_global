'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Monitor, MousePointer2 } from 'lucide-react';
import type { Shot } from '@/lib/profile-builder/shots';
import { cn, EASE } from '@/lib/utils';

/** Real screenshot with an animated "click here" ring + cursor on the exact spot */
export function RealShot({ shot, n }: { shot: Shot; n?: number }) {
  const { spot } = shot;
  return (
    <figure className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
      <figcaption className="flex items-center gap-2 border-b border-neutral-200 bg-white px-4 py-2.5 text-[0.8rem] font-medium text-neutral-700">
        {n ? <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-neutral-900 text-[0.65rem] font-bold text-white">{n}</span> : <Monitor className="h-4 w-4 shrink-0 text-[#9114FF]" />}
        {shot.caption}
      </figcaption>
      <div className="p-3 sm:p-4">
        <div className="relative mx-auto overflow-hidden rounded-xl shadow-[0_12px_30px_-16px_rgba(0,0,0,0.35)] ring-1 ring-neutral-200" style={{ maxWidth: Math.min(shot.w, 640) }}>
          <Image src={shot.src} alt={shot.caption} width={shot.w} height={shot.h} sizes="(min-width:1024px) 640px, 92vw" className="h-auto w-full" />
          {/* dim everything except the spot */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, scale: 1.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
            className={cn('absolute border-[3px] border-[#9114FF] shadow-[0_0_0_9999px_rgba(15,15,20,0.32)]', spot.round ? 'rounded-full' : 'rounded-lg')}
            style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.w}%`, height: `${spot.h}%` }}
          >
            <span className={cn('pb-tap absolute inset-0 bg-[#9114FF]/30', spot.round ? 'rounded-full' : 'rounded-lg')} />
          </motion.span>
          <motion.span
            aria-hidden
            initial={{ opacity: 0, x: 60, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: [1, 1, 0.8, 1] }}
            transition={{ duration: 1, ease: EASE, delay: 0.6, scale: { times: [0, 0.7, 0.85, 1], duration: 1, delay: 0.6 } }}
            className="pointer-events-none absolute text-neutral-900 drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
            style={{ left: `calc(${spot.x + spot.w * 0.6}% )`, top: `calc(${spot.y + spot.h * 0.55}% )` }}
          >
            <MousePointer2 className="h-6 w-6 fill-white" strokeWidth={1.6} />
          </motion.span>
        </div>
        <p className="mt-2.5 text-center text-[0.72rem] text-neutral-500">Real screen from naukri.com / linkedin.com</p>
      </div>
    </figure>
  );
}
