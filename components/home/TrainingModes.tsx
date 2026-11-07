import Image from 'next/image';
import Link from 'next/link';
import { trainingModes } from '@/lib/content';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { Reveal } from '@/components/ui/Reveal';

/** Infosys-style: centred headline with one highlighted word, then soft rounded 3D-image cards */
export function TrainingModes() {
  return (
    <section aria-labelledby="modes-title" className="bg-[#f4f5f8] py-section">
      <div className="container-x">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <AnimatedText
            as="h2"
            id="modes-title"
            text="Learn your way, on your schedule"
            highlight={[1, 2]}
            className="font-display text-display-lg font-bold"
          />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            Choose from multiple learning formats that fit your schedule and learning preferences — every one backed by expert trainers and placement support.
          </p>
          <Link href="/contact" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-black px-6 font-semibold text-white transition-colors hover:bg-accent">
            Find your batch <span aria-hidden>↗</span>
          </Link>
        </div>

        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {trainingModes.map((m) => (
            <article key={m.title} data-reveal className="group overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_40px_-12px_rgba(20,20,60,0.12)] transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_60px_-16px_rgba(20,20,60,0.25)]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={m.image} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
              </div>
              <div className="p-7">
                <h3 className="font-display text-xl font-bold">{m.title}</h3>
                <p className="mt-3 text-muted">{m.body}</p>
                <Link href="/contact" className="mt-6 inline-flex items-center gap-1.5 font-semibold">
                  <span className="link-underline">Learn more</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
