'use client';
import { Check, CheckCircle2, Copy, FileText, Flame, ListChecks, MousePointerClick, Plus, ScanText, Sparkles, Tags, UserRound } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { SwipeRail } from '@/components/ui/SwipeRail';
import { cn } from '@/lib/utils';
import { PlatformTag, SectionHeader, SpotlightCard } from './primitives';

type Feature = { title: string; icon: ReactNode; points: string[]; visual: ReactNode; span: string };

function Line({ w, strong }: { w: string; strong?: boolean }) {
  return <span className={cn('block h-1.5 rounded-full', strong ? 'bg-white/25' : 'bg-neutral-100')} style={{ width: w }} />;
}

const ParsingVisual = () => (
  <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
    <div className="pb-panel hidden space-y-2 p-3 sm:block">
      <div className="flex gap-1.5">
        {['PDF', 'DOCX', 'TXT'].map((t) => (
          <span key={t} className="rounded bg-neutral-100 px-1.5 py-0.5 text-[0.6rem] font-semibold text-neutral-700">{t}</span>
        ))}
      </div>
      <Line w="55%" strong />
      <Line w="80%" />
      <span className="block rounded bg-accent/20 px-1.5 py-0.5 text-[0.62rem] text-accent">Bangalore · 2 yrs</span>
      <Line w="70%" />
      <span className="block rounded bg-accent/20 px-1.5 py-0.5 text-[0.62rem] text-accent">Snowflake, SQL, Python</span>
      <Line w="64%" />
    </div>
    <ScanText aria-hidden className="mx-auto hidden h-5 w-5 rotate-90 text-neutral-500 sm:block lg:rotate-0" />
    <div className="pb-panel space-y-2 p-3 text-[0.65rem]">
      {[['City', 'Bangalore'], ['Experience', '2 years'], ['Skills', '9 found'], ['Projects', '2 found']].map(([k, v]) => (
        <div key={k} className="flex items-center justify-between gap-2">
          <span className="text-neutral-500">{k}</span>
          <span className="flex items-center gap-1 text-neutral-800"><Check className="h-3 w-3 text-emerald-600" />{v}</span>
        </div>
      ))}
    </div>
  </div>
);

const SkillsVisual = () => (
  <div className="flex flex-wrap gap-1.5">
    {[['Snowflake', 1], ['SQL', 1], ['Python', 1], ['Dynamic Tables', 2], ['dbt', 0], ['Cortex AI', 2], ['Airflow', 0]].map(([s, st]) => (
      <span key={s} className={cn('inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[0.68rem]', st === 2 ? 'border-orange-200 bg-orange-50 text-orange-700' : st === 1 ? 'border-accent/50 bg-accent/20 text-neutral-950' : 'border-neutral-200 text-neutral-600')}>
        {st === 2 && <Flame className="h-3 w-3" />}
        {s}
      </span>
    ))}
    <span className="inline-flex items-center gap-1 rounded-md border border-dashed border-neutral-300 px-2 py-1 text-[0.68rem] text-neutral-600"><Plus className="h-3 w-3" /> Custom skill</span>
  </div>
);

const NaukriVisual = () => (
  <div className="pb-panel space-y-2.5 p-3">
    <PlatformTag name="Naukri" />
    {[['Resume headline', '148/250'], ['Profile summary', '812/1000'], ['Key skills', '12 skills'], ['Projects', '2 projects']].map(([k, v]) => (
      <div key={k} className="flex items-center justify-between gap-2 rounded-md bg-neutral-50 px-2.5 py-1.5 text-[0.68rem]">
        <span className="text-neutral-800">{k}</span>
        <span className="tabular-nums text-neutral-500">{v}</span>
      </div>
    ))}
  </div>
);

const LinkedInVisual = () => (
  <div className="pb-panel overflow-hidden">
    <div className="h-8 bg-gradient-to-r from-violet-200 to-fuchsia-100" />
    <div className="-mt-4 px-3 pb-3">
      <span className="grid h-9 w-9 place-items-center rounded-full border-2 border-white bg-neutral-200 text-neutral-600"><UserRound className="h-4 w-4" /></span>
      <p className="mt-1.5 text-[0.72rem] font-semibold text-neutral-950">Priya Sharma</p>
      <p className="text-[0.62rem] leading-snug text-neutral-600">Snowflake Data Engineer | SQL, Python | Open to Data Engineer roles</p>
      <div className="mt-2.5 flex items-center justify-between">
        <PlatformTag name="LinkedIn" />
        <span className="text-[0.6rem] text-neutral-500">About · Skills · First post</span>
      </div>
    </div>
  </div>
);

const TrackerVisual = () => (
  <div className="pb-panel p-3">
    <div className="flex items-center justify-between text-[0.68rem]">
      <span className="text-neutral-700">Today’s routine</span>
      <span className="tabular-nums text-emerald-600">3 / 4</span>
    </div>
    <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-100"><span className="block h-full w-3/4 rounded-full bg-emerald-400/80" /></div>
    <ul className="mt-3 space-y-1.5 text-[0.68rem]">
      {[['Swap Naukri headline', 1], ['Apply to 10 relevant jobs', 1], ['5 recruiter connections', 1], ['Comment on 3 posts', 0]].map(([t, d]) => (
        <li key={t} className="flex items-center gap-2">
          <span className={cn('grid h-3.5 w-3.5 place-items-center rounded-[4px] border', d ? 'border-emerald-400/60 bg-emerald-100 text-emerald-600' : 'border-neutral-300')}>{d ? <Check className="h-2.5 w-2.5" /> : null}</span>
          <span className={d ? 'text-neutral-500 line-through' : 'text-neutral-800'}>{t}</span>
        </li>
      ))}
    </ul>
  </div>
);

function CopyVisual() {
  const [done, setDone] = useState(false);
  return (
    <div className="pb-panel p-3" onPointerEnter={() => setDone(true)} onPointerLeave={() => setDone(false)}>
      <div className="flex items-center justify-between">
        <span className="text-[0.68rem] text-neutral-700">Profile summary</span>
        <span className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.65rem] font-medium transition-colors duration-300', done ? 'bg-emerald-100 text-emerald-600' : 'bg-[#9114FF] text-white')}>
          {done ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />} {done ? 'Copied' : 'Copy'}
        </span>
      </div>
      <div className="mt-3 space-y-1.5"><Line w="92%" /><Line w="84%" /><Line w="60%" /></div>
    </div>
  );
}

const features: Feature[] = [
  { title: 'Smart resume parsing', icon: <FileText />, span: 'lg:col-span-4', visual: <ParsingVisual />, points: ['Upload a PDF, DOCX or TXT resume', 'Extracts name, city, experience, skills & projects', 'Fills your profile automatically', 'Review and correct anything before generating'] },
  { title: 'Skills intelligence', icon: <Tags />, span: 'lg:col-span-2', visual: <SkillsVisual />, points: ['Role-specific skill lists', 'Trending 2026 skills highlighted', 'Add your own custom skills'] },
  { title: 'Naukri profile builder', icon: <Sparkles />, span: 'lg:col-span-3', visual: <NaukriVisual />, points: ['Two resume headlines to swap daily', 'Profile summary within the 1,000-char limit', 'Key skills and project descriptions'] },
  { title: 'LinkedIn profile builder', icon: <UserRound />, span: 'lg:col-span-3', visual: <LinkedInVisual />, points: ['Headline and About section', 'Skills list and custom URL', 'Introductory post + recruiter connection note'] },
  { title: 'Career activity tracker', icon: <ListChecks />, span: 'lg:col-span-4', visual: <TrackerVisual />, points: ['Daily job-search checklist', 'Weekly profile maintenance tasks', 'Progress bars that save on your device'] },
  { title: 'One-click copy', icon: <MousePointerClick />, span: 'lg:col-span-2', visual: <CopyVisual />, points: ['Copy any section instantly', 'Clear “Copied” confirmation', 'Live character counts'] },
];

export function FeatureBentoGrid() {
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-24 py-24 md:py-32">
      <div className="container-x">
        <SectionHeader id="features-title" eyebrow="Product overview" title="Everything you need to build a stronger professional presence." intro="Six tools in one flow, from reading your resume to keeping your profiles active every day." />
        <div className="mt-14 md:mt-20">
          <SwipeRail label="Profile Builder features" grid="lg:grid-cols-6 lg:gap-4" slideClasses={features.map((f) => f.span)}>
            {features.map((f) => (
              <SpotlightCard key={f.title} as="article" className="flex h-full flex-col p-6 md:p-7">
                <div className="mb-6 flex-1">{f.visual}</div>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-lg border border-neutral-200 bg-neutral-50 text-accent [&>svg]:h-[18px] [&>svg]:w-[18px]">{f.icon}</span>
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-950">{f.title}</h3>
                </div>
                <ul className="mt-4 space-y-1.5 text-sm text-muted">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-2"><CheckCircle2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />{p}</li>
                  ))}
                </ul>
              </SpotlightCard>
            ))}
          </SwipeRail>
        </div>
      </div>
    </section>
  );
}
