/**
 * Single source of truth for all site copy and data.
 * ─────────────────────────────────────────────────────────────
 * Company facts below (offices, headcount, clients, awards, client
 * names) are PLACEHOLDERS — replace them with your real figures.
 * Client and award names are fictional on purpose.
 */
import { unsplash } from './utils';

export const company = {
  name: 'NS Global Tech',
  short: 'NSGlobal',
  tagline: 'IT Training & Placement in Bangalore',
  description:
    'Job-ready IT training in Bangalore: Snowflake, Informatica, DBT, Azure, Java Full Stack, Salesforce & testing. Live classes, real projects, 100% placement support.',
  /** Real public profiles — used for search-engine "sameAs" links */
  profiles: ['https://www.instagram.com/nsglobaltech/'],
  email: 'connect@nsglobaltech.com',
  phone: '+91 90322 20920',
  address: 'Building no 45, Srinivaspura Kogilu Main Road, Yelahanka, Bangalore 560064',
  founded: 2008,
  social: {
    linkedin: 'https://www.linkedin.com/',
    x: 'https://x.com/',
    youtube: 'https://www.youtube.com/',
    github: 'https://github.com/',
  },
};

export const nav = [
  { label: 'Services', href: '/services', key: 'services' },
  { label: 'Products', href: '/products/profile-builder', key: 'products' },
  { label: 'Industries', href: '/industries', key: 'industries' },
  { label: 'Insights', href: '/insights', key: 'insights' },
  { label: 'Careers', href: '/careers', key: 'careers' },
] as const;

export type Service = {
  slug: string; num: string; title: string; level: string; short: string; description: string;
  image: string; capabilities: string[]; outcomes: { metric: string; label: string }[];
  /** Technology logo (SVG in /public/logos) shown next to the course title */
  logo: string;
};

/** Training programmes (from nsglobaltech.com). capabilities = key topics. */
const support = [{ metric: '100%', label: 'placement assistance' }, { metric: 'Live', label: 'sessions with recordings' }];

export const services: Service[] = [
  { slug: 'snowflake', logo: '/logos/snowflake.svg', num: '01', title: 'Snowflake', level: 'Beginner to Advanced', short: 'Master the Snowflake data cloud.', description: 'Master Snowflake data platform with hands-on projects and real-world scenarios.', image: unsplash('photo-1597733336794-12d05021d510', 900), capabilities: ['Data Warehousing', 'SQL Optimization', 'Performance Tuning', 'Cloud Architecture'], outcomes: support },
  { slug: 'informatica', logo: '/logos/informatica.svg', num: '02', title: 'Informatica', level: 'Beginner to Advanced', short: 'Enterprise ETL, end to end.', description: 'Comprehensive ETL development using Informatica PowerCenter and Cloud platforms.', image: unsplash('photo-1639322537228-f710d846310a', 900), capabilities: ['ETL Development', 'Data Integration', 'Performance Optimization', 'Cloud Migration'], outcomes: support },
  { slug: 'dbt', logo: '/logos/dbt.svg', num: '03', title: 'DBT (Data Build Tool)', level: 'Intermediate', short: 'Modern analytics engineering.', description: 'Learn modern data transformation with DBT for analytics engineering.', image: unsplash('photo-1655635643532-fa9ba2648cbe', 900), capabilities: ['Data Modeling', 'Version Control', 'Testing & Documentation', 'CI/CD Pipelines'], outcomes: support },
  { slug: 'business-analyst', logo: '/logos/business-analyst.svg', num: '04', title: 'Business Analyst', level: 'Beginner to Advanced', short: 'From requirements to results.', description: 'Complete business analyst training covering requirements gathering and analysis.', image: unsplash('photo-1655635949212-1d8f4f103ea1', 900), capabilities: ['Requirements Analysis', 'Process Mapping', 'Stakeholder Management', 'Documentation'], outcomes: support },
  { slug: 'java-full-stack', logo: '/logos/java.svg', num: '05', title: 'Java Full Stack', level: 'Beginner to Advanced', short: 'Frontend, backend and database.', description: 'End-to-end Java development covering frontend, backend, and database technologies.', image: unsplash('photo-1607799279861-4dd421887fb3', 900), capabilities: ['Core Java', 'Spring Framework', 'React/Angular', 'Database Integration'], outcomes: support },
  { slug: 'test-engineer', logo: '/logos/selenium.svg', num: '06', title: 'Test Engineer', level: 'Beginner to Advanced', short: 'Manual and automation testing.', description: 'Comprehensive testing training including manual and automation testing methodologies.', image: unsplash('photo-1542831371-29b0f74f9713', 900), capabilities: ['Manual Testing', 'Selenium Automation', 'API Testing', 'Test Management'], outcomes: support },
  { slug: 'azure', logo: '/logos/azure.svg', num: '07', title: 'Azure', level: 'Intermediate to Advanced', short: 'Cloud infrastructure and DevOps.', description: 'Microsoft Azure cloud services training for modern cloud infrastructure and DevOps.', image: unsplash('photo-1451187580459-43490279c0fa', 900), capabilities: ['Azure Services', 'DevOps Pipelines', 'Cloud Architecture', 'Infrastructure as Code'], outcomes: support },
  { slug: 'salesforce', logo: '/logos/salesforce.svg', num: '08', title: 'Salesforce', level: 'Beginner to Advanced', short: 'Administer and build on Salesforce.', description: 'Master Salesforce CRM platform with comprehensive training on administration and development.', image: unsplash('photo-1667372393119-3d4c48d07fc9', 900), capabilities: ['CRM Administration', 'Apex Development', 'Lightning Components', 'Integration'], outcomes: support },
];

/** Our one product. Landing page: /products/profile-builder, working app: /products/profile-builder/app */
export const product = {
  slug: 'profile-builder',
  name: 'Profile Builder',
  category: 'Career profile builder',
  tagline: 'Your career profile. Engineered for opportunity.',
  short: 'Turn your resume into recruiter-ready Naukri & LinkedIn profiles, for 8 IT career tracks.',
  description:
    'Upload your resume and get a ready-to-paste Naukri and LinkedIn profile: headlines, summaries, skills, projects and posts, tailored to your role. Free, and your resume never leaves your device.',
  href: '/products/profile-builder',
  appHref: '/products/profile-builder/app',
};

export type Industry = { slug: string; title: string; short: string; description: string; image: string; focus: string[] };

export const industries: Industry[] = [
  { slug: 'banking-finance', title: 'Banking & Finance', short: 'Real-time, resilient, regulated.', description: 'Core modernisation, instant payments and AI-driven risk for banks, insurers and capital-markets firms.', image: unsplash('photo-1486406146926-c627a92ad1ab'), focus: ['Core banking modernisation', 'Fraud & financial crime AI', 'Open finance platforms', 'Regulatory reporting'] },
  { slug: 'healthcare', title: 'Healthcare', short: 'Better care, beautifully connected.', description: 'Interoperable data, virtual care and clinical AI that give clinicians time back and patients better outcomes.', image: unsplash('photo-1576091160399-112ba8d25d1d'), focus: ['Clinical data platforms', 'Virtual & remote care', 'Revenue cycle automation', 'Life-sciences R&D'] },
  { slug: 'retail', title: 'Retail', short: 'Every shelf, every screen, in sync.', description: 'Unified commerce, demand forecasting and personalisation that turn browsers into loyal customers.', image: unsplash('photo-1441986300917-64674bd600d8'), focus: ['Unified commerce', 'Demand & inventory AI', 'Personalisation at scale', 'Store operations'] },
  { slug: 'manufacturing', title: 'Manufacturing', short: 'Smart factories, resilient supply.', description: 'Industrial IoT, digital twins and supply-chain intelligence for manufacturers building the next generation of products.', image: unsplash('photo-1581091226825-a6a2a5aee158'), focus: ['Digital twins', 'Predictive maintenance', 'Supply-chain control towers', 'Connected products'] },
  { slug: 'energy', title: 'Energy', short: 'Powering the transition.', description: 'Grid modernisation, asset intelligence and sustainability reporting for utilities and energy companies.', image: unsplash('photo-1509391366360-2e959784a276'), focus: ['Grid analytics', 'Asset performance', 'ESG & carbon accounting', 'Field-force mobility'] },
  { slug: 'telecom', title: 'Telecom', short: 'Networks that think.', description: '5G monetisation, network automation and customer experience platforms for operators and media companies.', image: unsplash('photo-1544197150-b99a580bb7a8'), focus: ['Network automation', 'BSS/OSS modernisation', '5G & edge services', 'Churn prediction'] },
  { slug: 'public-sector', title: 'Public Sector', short: 'Services citizens deserve.', description: 'Secure, accessible digital services and data platforms for governments and public agencies.', image: unsplash('photo-1477959858617-67f85cf4f1df'), focus: ['Digital citizen services', 'Secure cloud for government', 'Data sharing & analytics', 'Legacy modernisation'] },
];

export type CaseStudy = {
  slug: string; client: string; industry: string; title: string; metric: string; metricLabel: string;
  image: string; challenge: string; approach: string[]; results: { value: string; label: string }[]; quote?: { text: string; author: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'arcbank-real-time-core', client: 'Arcbank', industry: 'Banking & Finance',
    title: 'Rebuilding a 40-year-old core bank — without a single hour of downtime.',
    metric: '40%', metricLabel: 'faster deployment',
    image: unsplash('photo-1563986768609-322da13575f3'),
    challenge: 'Arcbank ran 14 million accounts on a mainframe core that took six weeks to change. New products were stuck in the queue, and customers noticed.',
    approach: ['Strangler-pattern migration to a cloud-native core', 'Event streaming for real-time balances', 'Automated regression across 22,000 scenarios', 'Helix analytics embedded for product teams'],
    results: [{ value: '40%', label: 'faster deployment' }, { value: '0', label: 'hours of downtime' }, { value: '$38M', label: 'annual run-cost saved' }],
    quote: { text: 'They moved the heart of the bank while it was still beating.', author: 'Chief Technology Officer, Arcbank' },
  },
  {
    slug: 'meridian-health-ai', client: 'Meridian Health', industry: 'Healthcare',
    title: 'Giving 9,000 clinicians two hours back every week.',
    metric: '2 hrs', metricLabel: 'saved per clinician, weekly',
    image: unsplash('photo-1576091160399-112ba8d25d1d'),
    challenge: 'Documentation overload was driving burnout across 31 hospitals, and patient data lived in eleven disconnected systems.',
    approach: ['FHIR-based clinical data platform', 'Ambient AI note-taking with clinician sign-off', 'Flowgrid for referrals and prior authorisation'],
    results: [{ value: '2 hrs', label: 'saved per clinician each week' }, { value: '27%', label: 'faster referrals' }, { value: '94%', label: 'clinician adoption' }],
  },
  {
    slug: 'voltline-grid', client: 'Voltline Energy', industry: 'Energy',
    title: 'A self-healing grid for 4 million homes.',
    metric: '63%', metricLabel: 'fewer outage minutes',
    image: unsplash('photo-1473341304170-971dccb5ac1e'),
    challenge: 'Extreme weather was multiplying outages, and field crews were dispatched on gut feel.',
    approach: ['Digital twin of 180,000 grid assets', 'Predictive failure models', 'Sentinel to secure OT networks'],
    results: [{ value: '63%', label: 'fewer outage minutes' }, { value: '21%', label: 'lower maintenance cost' }, { value: '0', label: 'OT security breaches' }],
  },
  {
    slug: 'northwind-retail', client: 'Northwind Retail', industry: 'Retail',
    title: 'One customer view across 1,200 stores and every screen.',
    metric: '18%', metricLabel: 'higher basket value',
    image: unsplash('photo-1441986300917-64674bd600d8'),
    challenge: 'Online and in-store were run as separate businesses, with separate data, pricing and loyalty.',
    approach: ['Composable commerce platform', 'Real-time personalisation engine', 'AI demand forecasting at SKU-store level'],
    results: [{ value: '18%', label: 'higher basket value' }, { value: '30%', label: 'less overstock' }, { value: '4.8★', label: 'app rating' }],
  },
];

export type Insight = { slug: string; type: 'Article' | 'Report' | 'Podcast'; category: string; title: string; excerpt: string; readTime: string; date: string; image: string; author: string };

export const insights: Insight[] = [
  { slug: 'agentic-enterprise', type: 'Report', category: 'AI & Data', title: 'The agentic enterprise: what happens when software starts doing the work', excerpt: 'We surveyed 1,400 executives on where autonomous agents are creating value today — and where they are quietly failing.', readTime: '18 min read', date: '2026-10-14', image: unsplash('photo-1639322537228-f710d846310a'), author: 'NS Global Research Institute' },
  { slug: 'zero-trust-is-a-culture', type: 'Article', category: 'Cybersecurity', title: 'Zero trust is a culture, not a product', excerpt: 'Why the most secure organisations treat identity as an operating model.', readTime: '7 min read', date: '2026-09-30', image: unsplash('photo-1526374965328-7f61d4dc18c5'), author: 'Priya Raman, CISO Advisory' },
  { slug: 'finops-next-wave', type: 'Article', category: 'Cloud', title: 'FinOps 2.0: from cutting cost to funding growth', excerpt: 'Cloud savings are only the start. The leaders reinvest them with intent.', readTime: '9 min read', date: '2026-09-12', image: unsplash('photo-1451187580459-43490279c0fa'), author: 'Daniel Okafor, Cloud Practice' },
  { slug: 'future-of-work-podcast', type: 'Podcast', category: 'Consulting', title: 'Build Next, Ep. 42 — Leading through the AI transition', excerpt: 'Three COOs on redesigning roles, not just tasks.', readTime: '46 min listen', date: '2026-08-28', image: unsplash('photo-1573164713988-8665fc963095'), author: 'Build Next Podcast' },
  { slug: 'digital-twins-manufacturing', type: 'Article', category: 'Manufacturing', title: 'Digital twins grow up', excerpt: 'From pretty 3D models to systems that run the plant.', readTime: '6 min read', date: '2026-08-10', image: unsplash('photo-1581091226825-a6a2a5aee158'), author: 'Lena Fischer, Industry X' },
];

export const stats = [
  { value: 650, suffix: '+', label: 'Enterprise clients' },
  { value: 28, suffix: '', label: 'Countries' },
  { value: 12000, suffix: '+', label: 'Engineers & consultants' },
  { value: 18, suffix: '', label: 'Years building' },
];

export const clients = ['Arcbank', 'Meridian Health', 'Northwind', 'Voltline', 'Kestrel Air', 'Orbis Telecom', 'Halcyon', 'Strata Insurance', 'Lumen Foods', 'Vantage Motors', 'Pioneer Gov', 'Atlas Logistics'];

export const awards = [
  { title: 'Leader', org: 'Global Cloud Services Evaluation', year: '2026' },
  { title: 'AI Partner of the Year', org: 'Enterprise AI Awards', year: '2026' },
  { title: 'Top 10 Security Innovator', org: 'CyberTech Index', year: '2025' },
  { title: 'Best Place to Work', org: 'Tech Talent Survey', year: '2025' },
  { title: 'Gold — Digital Experience', org: 'Design for Business Awards', year: '2025' },
  { title: 'Sustainability Champion', org: 'Green IT Council', year: '2025' },
  { title: 'Fastest-Growing Services Firm', org: 'Global Growth 500', year: '2024' },
];

export type Office = { city: string; country: string; lat: number; lng: number; address: string; hq?: boolean };

export const offices: Office[] = [
  { city: 'New York', country: 'United States', lat: 40.71, lng: -74.0, address: '300 Park Avenue, New York, NY 10022', hq: true },
  { city: 'Toronto', country: 'Canada', lat: 43.65, lng: -79.38, address: '100 King Street West, Toronto, ON M5X 1A9' },
  { city: 'London', country: 'United Kingdom', lat: 51.51, lng: -0.13, address: '1 Canada Square, London E14 5AB' },
  { city: 'Frankfurt', country: 'Germany', lat: 50.11, lng: 8.68, address: 'Taunusanlage 8, 60329 Frankfurt' },
  { city: 'Dubai', country: 'UAE', lat: 25.2, lng: 55.27, address: 'Gate Village 4, DIFC, Dubai' },
  { city: 'Bengaluru', country: 'India', lat: 12.97, lng: 77.59, address: 'Outer Ring Road, Bellandur, Bengaluru 560103' },
  { city: 'Chennai', country: 'India', lat: 13.08, lng: 80.27, address: 'Rajiv Gandhi Salai, Taramani, Chennai 600113' },
  { city: 'Singapore', country: 'Singapore', lat: 1.29, lng: 103.85, address: '8 Marina View, Singapore 018960' },
  { city: 'Sydney', country: 'Australia', lat: -33.87, lng: 151.21, address: '1 Martin Place, Sydney NSW 2000' },
  { city: 'São Paulo', country: 'Brazil', lat: -23.55, lng: -46.63, address: 'Av. Brigadeiro Faria Lima 3477, São Paulo' },
];

export const roles = [
  { title: 'Principal AI Engineer', team: 'AI & Data', location: 'Bengaluru · Hybrid' },
  { title: 'Cloud Platform Architect', team: 'Cloud', location: 'London · Hybrid' },
  { title: 'Senior Product Designer', team: 'Digital Engineering', location: 'New York · Hybrid' },
  { title: 'Security Operations Lead', team: 'Cybersecurity', location: 'Singapore · On-site' },
  { title: 'Engagement Manager, Banking', team: 'Consulting', location: 'Frankfurt · Hybrid' },
  { title: 'Site Reliability Engineer', team: 'Managed Services', location: 'Chennai · Remote' },
];

export const values = [
  { title: 'Build, don’t just advise', body: 'We earn trust by shipping. Every strategy we write, we are ready to engineer and run.' },
  { title: 'Curiosity at scale', body: '12,000 people who would rather ask a better question than give a faster answer.' },
  { title: 'Outcomes over hours', body: 'We tie our success to yours — and measure it in results, not timesheets.' },
  { title: 'Responsible by default', body: 'Security, accessibility and ethical AI are part of the work, not an extra line item.' },
];

export const images = {
  careers: unsplash('photo-1522071820081-009f0129c71c', 2000),
  about: unsplash('photo-1497366216548-37526070297c', 2000),
  team: unsplash('photo-1531482615713-2afd69097998', 1600),
  meeting: unsplash('photo-1556761175-5973dc0f32e7', 1600),
  office2: unsplash('photo-1497215728101-856f4ea42174', 1600),
  contact: unsplash('photo-1519389950473-47ba0277781c', 1600),
  city: unsplash('photo-1477959858617-67f85cf4f1df', 2000),
};

export const findBy = <T extends { slug: string }>(list: T[], slug: string) => list.find((x) => x.slug === slug);

/** Homepage video feature. Drop an MP4 in /public and set `src` (e.g. '/showreel.mp4'). */
export const video = {
  eyebrow: 'Leadership conversations',
  title: 'What it really takes to reinvent at scale.',
  poster: unsplash('photo-1556761175-5973dc0f32e7', 2000),
  src: '',
  speakers: [
    { name: 'Maya Chen', role: 'Chief Executive Officer, NS Global Tech' },
    { name: 'David Okoro', role: 'Chief Operating Officer, Strata Insurance' },
  ],
};

/** Flexible training modes (from nsglobaltech.com) */
export const trainingModes = [
  { title: 'Classroom Training', body: 'Interactive face-to-face learning with direct mentor guidance and peer collaboration.', image: unsplash('photo-1622675363311-3e1904dc1885', 900) },
  { title: 'Online Training', body: 'Live virtual sessions with real-time interaction and flexible scheduling options.', image: unsplash('photo-1601132359864-c974e79890ac', 900) },
  { title: 'Weekend Batches', body: 'Perfect for working professionals, with intensive Saturday–Sunday sessions.', image: unsplash('photo-1531297484001-80022131f5a1', 900) },
  { title: 'Corporate Training', body: 'Customised training programs for organisations and enterprise teams.', image: unsplash('photo-1600880292203-757bb62b4baf', 900) },
  { title: 'Project-Based Learning', body: 'Hands-on experience with real-world projects and industry case studies.', image: unsplash('photo-1518770660439-4636190af475', 900) },
  { title: 'Pre-recorded Videos', body: 'Self-paced learning with comprehensive video modules and practice exercises.', image: unsplash('photo-1550745165-9bc0b252726f', 900) },
];

/** Student success stories (from nsglobaltech.com) */
export const testimonials = [
  { name: 'Mani', course: 'Azure DevOps', quote: 'I recently completed the Azure DevOps training and was thoroughly impressed. The trainers were knowledgeable and engaging, making complex concepts easy to understand.', image: unsplash('photo-1629654297299-c8506221ca97', 1200) },
  { name: 'Renuka', course: 'Azure DevOps', quote: 'The trainers went above and beyond to ensure we understood every concept. The placement team supported me throughout my job search journey.', image: unsplash('photo-1558494949-ef010cbdcc31', 1200) },
  { name: 'Krishna', course: 'Snowflake', quote: 'The trainers were highly knowledgeable and the curriculum was comprehensive. I highly recommend N S Global Tech for anyone looking to advance their career.', image: unsplash('photo-1600132806370-bf17e65e942f', 1200) },
  { name: 'Vikram', course: 'Snowflake', quote: 'The training was comprehensive and well-structured. After completing the course, I feel much more confident in my technical abilities.', image: unsplash('photo-1488229297570-58520851e868', 1200) },
  { name: 'Madhusudan', course: 'Looker BI', quote: 'Achieved master-level Looker skills through this program. I want to express my gratitude toward my trainer for the excellent guidance.', image: unsplash('photo-1640340434855-6084b1f4901c', 1200) },
  { name: 'Vimal', course: 'Looker BI', quote: 'The one-on-one doubt clarification sessions were incredibly helpful. The trainer provided in-depth knowledge that boosted my confidence.', image: unsplash('photo-1604964432806-254d07c11f32', 1200) },
];
