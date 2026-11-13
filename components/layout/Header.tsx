'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { nav, services, product, industries, insights, images } from '@/lib/content';
import { cn } from '@/lib/utils';
import { CourseLogo } from '@/components/ui/CourseLogo';

type MenuLink = { label: string; href: string; desc?: string; logo?: string };
type Panel = { intro: string; image?: string; cta: { label: string; href: string }; links: MenuLink[] };

const panels: Record<string, Panel> = {
  services: { intro: 'End-to-end capabilities, from first strategy to always-on operations.', image: images.meeting, cta: { label: 'All services', href: '/services' }, links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, desc: s.short, logo: s.logo })) },
  products: {
    intro: 'Career tools from NS Global Tech, starting with a resume-to-profile builder for Naukri and LinkedIn.',
    cta: { label: `Open ${product.name}`, href: product.appHref },
    links: [
      { label: product.name, href: product.href, desc: `${product.category} · Naukri & LinkedIn` },
      { label: 'Interactive demo', href: `${product.href}#showcase`, desc: 'See real output for every role' },
      { label: `Open ${product.name}`, href: product.appHref, desc: `${services.length} IT career tracks with trending skills` },
      { label: 'How it works', href: `${product.href}#how-it-works`, desc: 'Five steps, about 15 minutes' },
    ],
  },
  industries: { intro: 'Deep domain teams for the sectors that run the world.', image: images.city, cta: { label: 'All industries', href: '/industries' }, links: industries.map((i) => ({ label: i.title, href: `/industries/${i.slug}` })) },
  insights: { intro: 'Research, perspectives and conversations on what comes next.', image: insights[0].image, cta: { label: 'All insights', href: '/insights' }, links: insights.slice(0, 4).map((i) => ({ label: i.title, href: `/insights/${i.slug}`, desc: i.type })) },
  careers: { intro: '12,000 builders across 28 countries. There is room for one more.', image: images.careers, cta: { label: 'Open roles', href: '/careers#roles' }, links: [{ label: 'Life at NS Global', href: '/careers' }, { label: 'Open roles', href: '/careers#roles' }, { label: 'About us', href: '/about' }] },
};

/** Solid white header: logo, primary nav with mega-menu, search, contact. */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const timer = useRef<number>();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setSearch(false);
  }, [pathname]);

  // Dynamic header: hide while scrolling down, reveal on scroll up.
  // Runs directly in the passive scroll handler (React skips no-op state updates).
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 6 && y >= 120) return; // ignore jitter
      setScrolled(y > 8);
      if (y < 120) setHidden(false);
      else setHidden(delta > 0);
      lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // never hide while a menu or overlay is open
  const isHidden = hidden && !open && !mobile && !search;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const show = (k: string) => {
    window.clearTimeout(timer.current);
    setOpen(k);
  };
  const hide = () => {
    timer.current = window.setTimeout(() => setOpen(null), 150);
  };
  const panel = open ? panels[open] : null;

  return (
    <>
      <a href="#main" className="sr-only z-[130] bg-black px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <header
        className={cn(
          'theme-dark fixed inset-x-0 top-0 z-[80] transition-[transform,background-color,box-shadow] duration-500 ease-premium will-change-transform',
          isHidden ? '-translate-y-full' : 'translate-y-0',
          scrolled ? 'bg-black/95 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md' : 'bg-black',
        )}
        onMouseLeave={hide}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button type="button" className="grid h-10 w-10 place-items-center lg:hidden" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}>
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-6 bg-white" />
                <span className="block h-[2px] w-6 bg-white" />
                <span className="block h-[2px] w-6 bg-white" />
              </span>
            </button>
            <Link href="/" aria-label="NS Global Tech home">
              <Logo />
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-stretch gap-1 xl:gap-3">
              {nav.map((item) => (
                <li key={item.key} className="flex" onMouseEnter={() => show(item.key)}>
                  <button
                    type="button"
                    aria-expanded={open === item.key}
                    aria-controls="mega-menu"
                    onClick={() => (open === item.key ? setOpen(null) : show(item.key))}
                    className={cn(
                      'group/nav flex items-center gap-1.5 border-b-2 px-3 pt-[2px] text-[0.95rem] font-normal text-white transition-colors',
                      open === item.key || pathname.startsWith(item.href) ? 'border-accent' : 'border-transparent hover:border-white/40',
                    )}
                  >
                    {item.label}
                    <svg viewBox="0 0 12 12" aria-hidden className={cn('h-3 w-3 transition-transform duration-300', open === item.key && 'rotate-180')}>
                      <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 xl:gap-5">
            <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="grid h-11 w-11 place-items-center text-white transition-colors hover:text-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>
            <Link href="/contact" className="hidden items-center gap-1.5 py-2 text-[0.95rem] text-white sm:inline-flex">
              <span className="link-underline">Contact us</span>
            </Link>
          </div>
        </div>

        {panel && open && (
          <div id="mega-menu" className="absolute inset-x-0 top-full hidden border-b hairline bg-ink lg:block" onMouseEnter={() => window.clearTimeout(timer.current)}>
            <div className="container-x grid grid-cols-12 gap-10 py-12">
              <div className="col-span-3">
                <p className="font-display text-3xl font-black uppercase leading-none">{nav.find((n) => n.key === open)?.label}</p>
                <p className="mt-5 text-muted">{panel.intro}</p>
                <Link href={panel.cta.href} className="mt-8 inline-block font-semibold text-accent">
                  <span className="link-underline">{panel.cta.label}</span> →
                </Link>
              </div>
              <ul className="col-span-5 grid content-start gap-x-8 sm:grid-cols-2">
                {panel.links.map((l) => (
                  <li key={l.href} className="border-b hairline">
                    <Link href={l.href} className="flex items-center gap-4 py-4">
                      <span className="min-w-0 flex-1">
                        <span className="link-underline font-semibold">{l.label}</span>
                        {l.desc && <span className="mt-1 block text-sm text-muted">{l.desc}</span>}
                      </span>
                      {l.logo && <CourseLogo src={l.logo} size="sm" />}
                    </Link>
                  </li>
                ))}
              </ul>
              {panel.image ? (
                <div className="duo relative col-span-4 aspect-[4/3] overflow-hidden bg-black">
                  <Image src={panel.image} alt="" fill sizes="30vw" className="object-cover" />
                </div>
              ) : (
                <ProductMenuCard />
              )}
            </div>
          </div>
        )}
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}

/** Products mega-menu feature card */
function ProductMenuCard() {
  return (
    <Link href={product.href} className="group relative col-span-4 flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e14] p-6">
      <span aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#7c3aed]/35 blur-[70px] transition-opacity duration-500 group-hover:opacity-80" />
      <span aria-hidden className="absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-[70px]" />
      <span className="relative">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-[#A770FF]" /> New · {product.category}
        </span>
        <span className="mt-4 block font-display text-2xl font-bold tracking-tight text-white">{product.name}</span>
        <span className="mt-2 block text-sm leading-relaxed text-zinc-400">{product.short}</span>
      </span>
      <span className="relative mt-6 flex items-center justify-between gap-4">
        <span className="flex -space-x-1.5">
          {services.map((r) => (
            <span key={r.slug} className="grid h-7 w-7 place-items-center rounded-full bg-white ring-2 ring-[#0d0e14]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.logo} alt="" className="h-4 w-4 object-contain" />
            </span>
          ))}
        </span>
        <span className="text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">Explore →</span>
      </span>
    </Link>
  );
}
