import Link from 'next/link';
import { company } from '@/lib/content';
import { FooterNews } from './FooterNews';

const links = [
  { label: 'Courses', href: '/services' },
  { label: 'Training Modes', href: '/#modes-title' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Free Demo', href: '/contact' },
  { label: 'Privacy Policy', href: '/about' },
  { label: 'Terms & Conditions', href: '/about' },
];

/** Accenture-style footer: news slider, brand lockup, one row of links, copyright */
export function Footer() {
  return (
    <footer className="theme-dark">
      <div className="container-x pb-[max(6rem,env(safe-area-inset-bottom))] pt-16 md:pt-24">
        <FooterNews />

        <div className="mt-20 md:mt-32">
          <p className="font-display text-lg font-black uppercase tracking-wide md:text-2xl">Launch your career with</p>
          <p className="mt-1 pl-[8%] font-display text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold lowercase leading-none tracking-[-0.03em] md:pl-28">
            ns<span className="text-accent">/</span>global
          </p>
        </div>

        <nav aria-label="Footer" className="mt-14">
          <ul className="flex flex-wrap gap-x-8 gap-y-1 text-lg font-semibold">
            {links.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="inline-block py-2"><span className="link-underline">{l.label}</span></Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-1 text-white/70 md:flex-row md:flex-wrap md:gap-x-8">
          <span>{company.address}</span>
          <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`} className="py-2 hover:text-white">{company.phone}</a>
          <a href={`mailto:${company.email}`} className="py-2 hover:text-white">{company.email}</a>
        </div>

        <p className="mt-10 text-lg">© {new Date().getFullYear()} N S Global Tech. All rights reserved.</p>
      </div>
    </footer>
  );
}
