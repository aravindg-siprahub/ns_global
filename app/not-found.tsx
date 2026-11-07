import { ButtonLink } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] items-center pt-[var(--header-h)]">
      <div className="container-x">
        <p className="eyebrow mb-6">Error 404</p>
        <h1 className="font-display text-hero font-semibold">This page<br /><span className="text-gradient">took a detour.</span></h1>
        <p className="mt-8 max-w-md text-lg text-muted">The link may be broken or the page may have moved. Let’s get you back on track.</p>
        <div className="mt-10"><ButtonLink href="/" arrow>Back to home</ButtonLink></div>
      </div>
    </section>
  );
}
