/**
 * Search + social copy for course pages, built only from facts already on the
 * site (course topics, level, formats, placement support, free demo).
 */
import { company, type Service } from './content';
import { SITE_URL } from './utils';

export const courseUrl = (s: Service) => `${SITE_URL}/services/${s.slug}`;

/** ≤ ~60 chars so Google shows it whole: what people actually type in */
export const courseTitle = (s: Service) => `${s.title} Training in Bangalore | ${company.name}`;

/** ~155 chars: topics + proof points */
export const courseDescription = (s: Service) =>
  `Learn ${s.title} with NS Global Tech: ${s.capabilities.join(', ')}. Live online & classroom batches, real projects, recordings and 100% placement support. Book a free demo.`;

export const courseFaqs = (s: Service) => [
  {
    q: `What will I learn in the ${s.title} course?`,
    a: `The ${s.title} program covers ${s.capabilities.slice(0, -1).join(', ')} and ${s.capabilities[s.capabilities.length - 1]}. Every module is taught live by working professionals and ends with a hands-on project you can show in interviews.`,
  },
  {
    q: `Who is the ${s.title} course for?`,
    a: `It is built for ${s.level.toLowerCase()} learners: freshers, career switchers and working professionals who want job-ready ${s.title} skills.`,
  },
  {
    q: 'Is placement support included?',
    a: 'Yes. Every course includes 100% placement assistance: resume support, weekly mock interviews and dedicated help until you get hired.',
  },
  {
    q: 'Can I learn online or on weekends?',
    a: 'Yes. Choose live online classes, classroom training in Bangalore, weekend batches or self-paced videos. Every live session is recorded so you never miss a class.',
  },
  {
    q: 'Can I attend a free demo class first?',
    a: 'Yes. Book a free demo to meet your trainer, see the curriculum and ask anything, with no commitment.',
  },
];

const provider = { '@type': 'EducationalOrganization', name: company.name, url: SITE_URL };

export const courseJsonLd = (s: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: `${s.title} Training`,
  description: courseDescription(s),
  url: courseUrl(s),
  image: s.image,
  provider,
  educationalLevel: s.level,
  teaches: s.capabilities,
  inLanguage: 'en',
  hasCourseInstance: [
    { '@type': 'CourseInstance', courseMode: 'Online', name: `${s.title} — live online batch` },
    {
      '@type': 'CourseInstance',
      courseMode: 'Onsite',
      name: `${s.title} — classroom batch, Bangalore`,
      location: { '@type': 'Place', name: company.name, address: company.address },
    },
  ],
});

export const faqJsonLd = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

export const breadcrumbJsonLd = (crumbs: { label: string; href: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ label: 'Home', href: '' }, ...crumbs].map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.label,
    item: `${SITE_URL}${c.href}`,
  })),
});

export const courseListJsonLd = (list: Service[]) => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${company.name} IT courses`,
  itemListElement: list.map((s, i) => ({ '@type': 'ListItem', position: i + 1, url: courseUrl(s), name: `${s.title} Training` })),
});
