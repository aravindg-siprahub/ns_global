import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

/*
 * Tall editorial card (Accenture-style).
 * Front: label + title on top, 3D image below, in four alternating styles.
 * Hover / keyboard focus: flips in 3D to a black details panel.
 * Touch screens (no hover): a plain link sits under the card instead.
 */
const fronts = [
  { card: 'bg-black text-white', img: 'inset-0', overlay: 'bg-gradient-to-b from-black/85 via-black/25 to-transparent' },
  { card: 'bg-white text-black', img: 'inset-x-0 bottom-0 top-[44%]', overlay: '' },
  { card: 'bg-[#0b0b1e] text-white', img: 'inset-x-0 bottom-0 top-[44%]', overlay: '' },
  { card: 'bg-[#efefef] text-black', img: 'inset-x-0 bottom-0 top-[44%]', overlay: '' },
];

export type EditorialCardProps = {
  variant: number;
  label: string;
  title: string;
  short?: string;
  image: string;
  backLabel?: string;
  description: string;
  items?: string[];
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  height?: string;
};

export function EditorialCard({ variant, label, title, short, image, backLabel, description, items = [], primary, secondary, height = 'h-[520px]' }: EditorialCardProps) {
  const f = fronts[variant % fronts.length];
  return (
    <article className="group [perspective:1600px]">
      <div
        className={cn(
          'relative w-full transition-transform duration-700 [transform-style:preserve-3d] motion-reduce:transition-none [@media(hover:hover)]:group-hover:[transform:rotateY(180deg)] [@media(hover:hover)]:group-focus-within:[transform:rotateY(180deg)]',
          height,
        )}
      >
        {/* Front */}
        <div className={cn('absolute inset-0 overflow-hidden [backface-visibility:hidden]', f.card)}>
          <div className={cn('absolute', f.img)}>
            <Image src={image} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover" />
            {f.overlay && <div className={cn('absolute inset-0', f.overlay)} />}
          </div>
          <div className="relative p-7">
            <p className="text-sm font-semibold uppercase tracking-wide">{label}</p>
            <h3 className="mt-5 font-display text-[1.65rem] font-bold leading-tight">{title}</h3>
            {short && <p className="mt-2 opacity-80">{short}</p>}
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col border border-white/20 bg-black p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">{backLabel ?? label}</p>
          <h3 className="mt-5 font-display text-[1.65rem] font-bold leading-tight">{title}</h3>
          <p className="mt-3 text-white/80">{description}</p>
          {items.length > 0 && (
            <ul className="mt-6 space-y-2.5">
              {items.map((c) => (
                <li key={c} className="flex items-center gap-3 text-[0.95rem]">
                  <span className="h-[2px] w-4 bg-white" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <Link href={primary.href} className="inline-flex h-12 items-center bg-white px-6 font-semibold text-black transition-colors hover:bg-accent hover:text-white">
              {primary.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="font-semibold">
                <span className="link-underline">{secondary.label}</span> →
              </Link>
            )}
          </div>
        </div>
      </div>

      <Link href={secondary?.href ?? primary.href} className="mt-3 block font-semibold [@media(hover:hover)]:hidden">
        <span className="link-underline">{secondary?.label ?? primary.label}</span> →
      </Link>
    </article>
  );
}
