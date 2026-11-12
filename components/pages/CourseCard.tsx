import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/lib/content';
import { CourseLogo } from '@/components/ui/CourseLogo';

/** Image-led course card used in "Explore other courses" rails */
export function CourseCard({ course }: { course: Service }) {
  return (
    <Link href={`/services/${course.slug}`} className="group flex h-full flex-col border-t-[3px] border-transparent bg-surface transition-colors duration-300 hover:border-accent">
      <div className="duo relative aspect-[4/3] overflow-hidden bg-elevated">
        <Image src={course.image} alt="" fill sizes="(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:640px) 46vw, 84vw" className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold text-accent">{course.level}</p>
        <div className="mt-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-bold leading-tight">{course.title}</h3>
          <CourseLogo src={course.logo} size="sm" />
        </div>
        <p className="mt-2 text-base leading-relaxed text-muted">{course.short}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold">
          <span className="link-underline">View course</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </div>
    </Link>
  );
}
