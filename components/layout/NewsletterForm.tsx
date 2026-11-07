'use client';
import { useState, type FormEvent } from 'react';

export function NewsletterForm() {
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get('email')?.toString() ?? '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setState('error');
    // TODO: connect to your email platform (e.g. POST to /api/newsletter)
    setState('done');
  };

  if (state === 'done') return <p className="mt-8 text-accent2" role="status">You’re in. Watch your inbox.</p>;

  return (
    <form onSubmit={submit} noValidate className="mt-8 max-w-md">
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex items-center gap-2 rounded-full border hairline bg-surface/60 p-1.5 focus-within:border-accent">
        <input
          id="nl-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={state === 'error'}
          aria-describedby={state === 'error' ? 'nl-err' : undefined}
          onInput={() => state === 'error' && setState('idle')}
          className="min-w-0 flex-1 bg-transparent px-4 py-2 text-fg placeholder:text-muted focus:outline-none"
        />
        <button type="submit" className="h-10 shrink-0 rounded-full bg-fg px-5 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-white">
          Subscribe
        </button>
      </div>
      {state === 'error' && <p id="nl-err" className="mt-2 pl-4 text-sm text-red-400">Please enter a valid email address.</p>}
    </form>
  );
}
