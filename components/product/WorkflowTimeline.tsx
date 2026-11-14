'use client';
import { motion } from 'framer-motion';
import { ClipboardCheck, FileUp, ScanSearch, Send, Wand2 } from 'lucide-react';
import { EASE } from '@/lib/utils';
import { SectionHeader } from './primitives';

const steps = [
  { title: 'Upload your resume', body: 'PDF, Word or text. Or paste it in.', icon: FileUp },
  { title: 'Analyse your background', body: 'Name, experience, skills, projects and certifications are picked out.', icon: ScanSearch },
  { title: 'Review the details', body: 'Fix anything, choose your skills and add trending ones.', icon: ClipboardCheck },
  { title: 'Generate your content', body: 'Headlines, summaries, skills, projects and a first post.', icon: Wand2 },
  { title: 'Update your profiles', body: 'Copy each section into Naukri and LinkedIn, ticking off the checklist.', icon: Send },
];

/** Numbered process with a line that draws itself as it scrolls into view */
export function WorkflowTimeline() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative scroll-mt-24 border-y border-neutral-200 bg-neutral-50 py-24 md:py-32">
      <div className="container-x">
        <SectionHeader id="how-title" eyebrow="How it works" title="From resume to recruiter-ready in five steps." intro="About 15 minutes the first time. After that, ten minutes a day keeps you active." />

        <ol className="relative mt-16 grid gap-10 md:mt-20 lg:grid-cols-5 lg:gap-6">
          {/* connecting line: vertical on mobile, horizontal on desktop */}
          <span aria-hidden className="absolute bottom-6 left-[1.4rem] top-6 w-px bg-neutral-200 lg:hidden" />
          <motion.span aria-hidden initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.6, ease: EASE }} className="absolute bottom-6 left-[1.4rem] top-6 w-px origin-top bg-gradient-to-b from-accent via-accent to-transparent lg:hidden" />
          <span aria-hidden className="absolute left-[10%] right-[10%] top-[1.4rem] hidden h-px bg-neutral-200 lg:block" />
          <motion.span aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 1.8, ease: EASE }} className="absolute left-[10%] right-[10%] top-[1.4rem] hidden h-px origin-left bg-gradient-to-r from-accent via-accent to-accent lg:block" />

          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 * i }}
              className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
            >
              <span className="relative z-10 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-neutral-300 bg-white text-sm font-semibold tabular-nums text-neutral-950 shadow-[0_0_0_6px_#fafafa]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="pt-1.5 lg:pt-0">
                <s.icon aria-hidden className="mb-3 hidden h-5 w-5 text-accent lg:mx-auto lg:mt-6 lg:block" />
                <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
