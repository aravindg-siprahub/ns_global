'use client';
import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn, EASE } from '@/lib/utils';

type Field = 'name' | 'email' | 'company' | 'message';
type Errors = Partial<Record<Field, string>>;

const rules: Record<Field, (v: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? 'Please tell us your name.' : undefined),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'Enter a valid work email.' : undefined),
  company: (v) => (v.trim().length < 2 ? 'Which company are you with?' : undefined),
  message: (v) => (v.trim().length < 10 ? 'A sentence or two helps us route you to the right team.' : undefined),
};

const fields: { id: Field; label: string; type?: string; auto?: string; area?: boolean }[] = [
  { id: 'name', label: 'Full name', auto: 'name' },
  { id: 'email', label: 'Work email', type: 'email', auto: 'email' },
  { id: 'company', label: 'Company', auto: 'organization' },
  { id: 'message', label: 'How can we help?', area: true },
];

export function ContactForm({ className }: { className?: string }) {
  const [values, setValues] = useState<Record<Field, string>>({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const validate = (f: Field, v: string) => setErrors((e) => ({ ...e, [f]: rules[f](v) }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    (Object.keys(rules) as Field[]).forEach((f) => (next[f] = rules[f](values[f])));
    setErrors(next);
    setTouched({ name: true, email: true, company: true, message: true });
    const firstBad = (Object.keys(next) as Field[]).find((f) => next[f]);
    if (firstBad) {
      document.getElementById(`cf-${firstBad}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
    } catch {}
    setStatus('sent');
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        {status === 'sent' ? (
          <motion.div key="ok" role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="glass rounded-xl3 p-10">
            <p className="font-display text-3xl font-semibold">Thank you, {values.name.split(' ')[0]}.</p>
            <p className="mt-3 text-muted">A specialist will be in touch within one business day.</p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0, y: -20 }} className="grid gap-x-6 gap-y-8 sm:grid-cols-2">
            {fields.map((f) => {
              const err = touched[f.id] ? errors[f.id] : undefined;
              const ok = touched[f.id] && !errors[f.id] && values[f.id];
              const common = {
                id: `cf-${f.id}`,
                name: f.id,
                value: values[f.id],
                autoComplete: f.auto,
                'aria-invalid': !!err,
                'aria-describedby': err ? `cf-${f.id}-err` : undefined,
                placeholder: ' ',
                onChange: (e: { target: { value: string } }) => {
                  setValues((v) => ({ ...v, [f.id]: e.target.value }));
                  if (touched[f.id]) validate(f.id, e.target.value);
                },
                onBlur: () => {
                  setTouched((t) => ({ ...t, [f.id]: true }));
                  validate(f.id, values[f.id]);
                },
                className: cn(
                  'peer w-full border-b bg-transparent pb-3 pt-6 text-lg text-fg outline-none transition-colors duration-300 focus:border-accent2',
                  err ? 'border-red-400' : 'hairline',
                ),
              };
              return (
                <div key={f.id} className={cn('relative', f.area && 'sm:col-span-2')}>
                  {f.area ? <textarea rows={3} {...common} className={cn(common.className, 'resize-none')} /> : <input type={f.type ?? 'text'} {...common} />}
                  <label
                    htmlFor={`cf-${f.id}`}
                    className="pointer-events-none absolute left-0 top-6 origin-left text-lg text-muted transition-all duration-300 ease-premium peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
                  >
                    {f.label}
                  </label>
                  {ok && (
                    <svg viewBox="0 0 16 16" className="absolute right-0 top-7 h-4 w-4 text-accent2" aria-hidden>
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                  )}
                  <AnimatePresence>
                    {err && (
                      <motion.p id={`cf-${f.id}-err`} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-red-400">
                        {err}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-xs text-muted">By submitting, you agree to our privacy policy. We never share your details.</p>
              <Button type="submit" arrow disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
