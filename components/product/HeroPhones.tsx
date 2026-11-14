'use client';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { guides, linkedin, naukri, screenContent } from '@/lib/profile-builder/engine';
import { roles } from '@/lib/profile-builder/roles';
import { sampleForm } from '@/lib/profile-builder/sample';
import { PhoneMock } from './PhoneMock';

/** Two live phones (Naukri + LinkedIn) that walk through the real steps on a loop */
export function HeroPhones() {
  const reduce = useReducedMotion();
  const role = roles[0];
  const form = useMemo(() => sampleForm(role), [role]);
  const g = useMemo(() => guides(role), [role]);
  const nk = useMemo(() => naukri(form, role), [form, role]);
  const li = useMemo(() => linkedin(form, role), [form, role]);
  const nkSteps = g.naukri.filter((s) => s.outputs);
  const liSteps = g.linkedin.filter((s) => s.outputs);
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setT((x) => x + 1), 4200);
    return () => window.clearInterval(id);
  }, [reduce]);

  const n = nkSteps[t % nkSteps.length];
  const l = liSteps[(t + 2) % liSteps.length];
  const nDone = nkSteps.slice(0, t % nkSteps.length).map((s) => s.focus);
  const lDone = ['Photo & banner', 'Open to work', ...liSteps.slice(0, (t + 2) % liSteps.length).map((s) => s.focus)];

  return (
    <div className="relative flex items-end justify-center gap-6 sm:gap-10">
      <PhoneMock platform="naukri" focus={n.focus} action={n.action} name={form.name} content={screenContent('naukri', form, role, nk)} done={nDone} className="mx-0 [&>figcaption]:hidden" />
      <PhoneMock platform="linkedin" focus={l.focus} action={l.action} name={form.name} content={screenContent('linkedin', form, role, li)} done={lDone} className="mx-0 hidden translate-y-8 sm:block [&>figcaption]:hidden" />
    </div>
  );
}
