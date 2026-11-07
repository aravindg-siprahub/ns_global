'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { MobileMenu } from './MobileMenu';
import { SearchOverlay } from './SearchOverlay';
import { nav, services, products, industries, insights, images } from '@/lib/content';
import { cn } from '@/lib/utils';

type MenuLink = { label: string; href: string; desc?: string };
type Panel = { intro: string; image: string; cta: { label: string; href: string }; links: MenuLink[] };

const panels: Record<string, Panel> = {
  services: { intro: 'End-to-end capabilities, from first strategy to always-on operations.', image: images.meeting, cta: { label: 'All services', href: '/services' }, links: services.map((s) => ({ label: s.title, href: `/services/${s.slug}`, desc: s.short })) },
  products: { intro: 'Software we build, own and run inside the world’s largest enterprises.', image: images.team, cta: { label: 'All products', href: '/products' }, links: products.map((p) => ({ label: p.name, href: `/products/${p.slug}`, desc: p.category })) },
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

  useEffect(() => {
    setOpen(null);
    setMobile(false);
    setSearch(false);
  }, [pathname]);

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
      <header className="fixed inset-x-0 top-0 z-[80] border-b hairline bg-ink" onMouseLeave={hide}>
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <button type="button" className="grid h-10 w-10 place-items-center lg:hidden" aria-label="Open menu" aria-expanded={mobile} onClick={() => setMobile(true)}>
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span className="block h-[2px] w-6 bg-fg" />
                <span className="block h-[2px] w-6 bg-fg" />
                <span className="block h-[2px] w-6 bg-fg" />
              </span>
            </button>
            <Link href="/" aria-label="NS Global Tech home">
              <Logo />
            </Link>
          </div>

          <nav aria-label="Primary" className="hidden h-full lg:block">
            <ul className="flex h-full items-stretch">
              {nav.map((item) => (
                <li key={item.key} className="flex" onMouseEnter={() => show(item.key)}>
                  <button
                    type="button"
                    aria-expanded={open === item.key}
                    aria-controls="mega-menu"
                    onClick={() => (open === item.key ? setOpen(null) : show(item.key))}
                    className={cn(
                      'border-b-[3px] px-4 pt-[3px] text-[0.95rem] font-semibold transition-colors',
                      open === item.key || pathname.startsWith(item.href) ? 'border-accent text-fg' : 'border-transparent text-fg/80 hover:text-fg',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setSearch(true)} aria-label="Search" className="grid h-10 w-10 place-items-center hover:text-accent">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
              </svg>
            </button>
            <Link href="/contact" className="hidden h-10 items-center bg-fg px-5 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-white sm:inline-flex">
              Contact us
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
                    <Link href={l.href} className="block py-4">
                      <span className="link-underline font-semibold">{l.label}</span>
                      {l.desc && <span className="mt-1 block text-sm text-muted">{l.desc}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="duo relative col-span-4 aspect-[4/3] overflow-hidden bg-black">
                <Image src={panel.image} alt="" fill sizes="30vw" className="object-cover" />
              </div>
            </div>
          </div>
        )}
      </header>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
      <SearchOverlay open={search} onClose={() => setSearch(false)} />
    </>
  );
}
