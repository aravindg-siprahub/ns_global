/**
 * Profile Builder engine: resume reading, detail extraction, text generation
 * and checklists. Everything runs in the browser — no file or text is sent
 * to any server.
 */
import { cities, commonExtras, notices, roles, type Role } from './roles';

export type ProfileType = 'fresher' | 'switch' | 'exp';
export type Notice = (typeof notices)[number];

export type ProfileForm = {
  role: string;
  name: string;
  city: string;
  type: ProfileType;
  years: string;
  current: string;
  pref: string;
  otherSkills: string;
  certs: string;
  p1: string;
  p2: string;
  notice: Notice;
  skills: string[];
};

export type OutputBlock = { id: string; key: string; title: string; text: string; limit?: number };

export const emptyForm = (role: Role): ProfileForm => ({
  role: role.id, name: '', city: '', type: 'fresher', years: '', current: '', pref: '', otherSkills: '', certs: '', p1: '', p2: '',
  notice: 'Immediate joiner', skills: [...role.defaults],
});

export const profileTypes = (role: Role): { value: ProfileType; label: string }[] => [
  { value: 'fresher', label: 'Fresher (0–1 yr)' },
  { value: 'switch', label: `Career switcher (from a non-${role.field} role)` },
  { value: 'exp', label: `Experienced (already in ${role.expLabel})` },
];

/* ───────────────────────── Resume reading ───────────────────────── */

/** Reads word/document.xml straight out of the .docx zip (no library needed). */
async function docxText(buf: ArrayBuffer): Promise<string> {
  const u8 = new Uint8Array(buf);
  const dv = new DataView(buf);
  const dec = new TextDecoder();
  let e = u8.length - 22;
  while (e >= 0 && dv.getUint32(e, true) !== 0x06054b50) e--;
  if (e < 0) throw new Error('This Word file looks damaged. Save it again as .docx or PDF.');
  const n = dv.getUint16(e + 10, true);
  let p = dv.getUint32(e + 16, true);
  for (let i = 0; i < n; i++) {
    if (dv.getUint32(p, true) !== 0x02014b50) break;
    const method = dv.getUint16(p + 10, true);
    const csize = dv.getUint32(p + 20, true);
    const nl = dv.getUint16(p + 28, true);
    const el = dv.getUint16(p + 30, true);
    const cl = dv.getUint16(p + 32, true);
    const lho = dv.getUint32(p + 42, true);
    const name = dec.decode(u8.subarray(p + 46, p + 46 + nl));
    if (name === 'word/document.xml') {
      const start = lho + 30 + dv.getUint16(lho + 26, true) + dv.getUint16(lho + 28, true);
      const data = u8.subarray(start, start + csize);
      let xml: string;
      if (method === 0) xml = dec.decode(data);
      else {
        if (typeof DecompressionStream === 'undefined') throw new Error("This browser can't open Word files. Please upload a PDF or paste the text.");
        xml = await new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream('deflate-raw' as CompressionFormat))).text();
      }
      return xml
        .replace(/<w:tab\/>/g, ' ')
        .replace(/<w:br\/>|<\/w:p>/g, '\n')
        .replace(/<[^>]+>/g, '')
        .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
    }
    p += 46 + nl + el + cl;
  }
  throw new Error("Couldn't find text in this Word file. Upload a PDF or paste the text.");
}

/** PDF text via pdf.js, loaded only when someone actually uploads a PDF. */
async function pdfText(buf: ArrayBuffer): Promise<string> {
  const pdfjs = await import('pdfjs-dist');
  // Worker is copied to /public by the predev/prebuild script (keeps it out of the minifier)
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
  const pdf = await pdfjs.getDocument({ data: new Uint8Array(buf) }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const c = await (await pdf.getPage(i)).getTextContent();
    text += c.items.map((it) => ('str' in it ? it.str + (it.hasEOL ? '\n' : ' ') : '')).join('') + '\n';
  }
  return text;
}

export async function readResumeFile(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  let text: string;
  if (/\.pdf$/i.test(file.name)) {
    try {
      text = await pdfText(buf);
    } catch {
      throw new Error("Couldn't read this PDF in your browser. Please paste your resume text instead.");
    }
  } else if (/\.docx$/i.test(file.name)) text = await docxText(buf);
  else if (/\.(txt|text|md)$/i.test(file.name)) text = new TextDecoder().decode(buf);
  else throw new Error('Please upload a PDF, Word (.docx) or .txt file.');
  if (text.trim().length < 50) throw new Error("Couldn't find text in this file (it may be a scanned image). Paste the text instead.");
  return text;
}

/* ───────────────────────── Detail extraction ───────────────────────── */

const wordRe = (s: string) => new RegExp(`(^|[^a-z0-9+#])${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s*')}($|[^a-z0-9+#])`, 'i');

export const detectSkills = (role: Role, text: string) => role.skills.filter((s) => s.re.test(text)).map((s) => s.name);

/** Other technologies in the resume that are not part of this role's list */
export function detectExtras(role: Role, text: string) {
  const own = new Set(role.skills.map((s) => s.name.toLowerCase()));
  const ownHits = role.skills.filter((s) => s.re.test(text));
  return commonExtras
    .filter((x) => !own.has(x.toLowerCase()) && wordRe(x).test(text))
    .filter((x) => !ownHits.some((s) => s.re.test(x)))
    .slice(0, 12);
}

/** Which career track a resume matches best (by share of that role's skills found) */
export function suggestRole(text: string): { role: Role; score: number } {
  const scored = roles.map((r) => ({ role: r, score: r.skills.filter((s) => s.re.test(text)).length / r.skills.length }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0];
}

export type ParseResult = { patch: Partial<ProfileForm>; found: string[] };

export function parseResume(raw: string, role: Role): ParseResult {
  const text = raw.replace(/\r/g, '');
  const lines = text.split('\n').map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const found: string[] = [];
  const patch: Partial<ProfileForm> = {};

  // name: first short line that looks like a name
  const nm = lines.slice(0, 8).find((l) => /^[A-Za-z][A-Za-z.\s]{2,40}$/.test(l) && l.split(' ').length <= 4 && !/resume|curriculum|vitae|profile|summary/i.test(l));
  if (nm) {
    patch.name = nm.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\B\w+/g, (w) => w.toLowerCase());
    found.push('name');
  }
  // city
  const city = cities.find((c) => wordRe(c).test(text.slice(0, 1500))) ?? cities.find((c) => wordRe(c).test(text));
  if (city) {
    patch.city = city;
    found.push('city');
  }
  // years of experience
  const yrs = [...text.matchAll(/(\d{1,2}(?:\.\d)?)\s*\+?\s*(?:years|yrs|year)/gi)].map((m) => parseFloat(m[1])).filter((n) => n > 0 && n < 35);
  const years = yrs.length ? Math.max(...yrs) : 0;
  if (years) {
    patch.years = String(years);
    found.push('experience');
  }
  // skills
  const hits = detectSkills(role, text);
  const extra = detectExtras(role, text);
  patch.skills = hits;
  patch.otherSkills = extra.join(', ');
  if (hits.length + extra.length) found.push(`${hits.length + extra.length} skills`);
  // certifications
  const certs = lines
    .filter((l) => (role.certRe.test(l) || /certified|certification|certificate/i.test(l)) && l.length < 120 && !/^certifications?:?$/i.test(l))
    .filter((l) => /certif|certified|\b[a-z]{2}-\d{3}\b|istqb|snowpro|ocp|ecba|cbap/i.test(l))
    // school / degree lines are education, not certifications ("Secondary School Certificate (SSC) CGPA 10/10")
    .filter((l) => !/\b(ssc|hsc|sslc|puc|cbse|icse|cgpa|gpa|percentage|marks|school|intermediate|board|10th|12th|class\s*(x|xii|10|12)|b\.?\s?tech|m\.?\s?tech|b\.?\s?e\b|b\.?\s?sc|m\.?\s?sc|bca|mca|mba|degree|bachelor|master|diploma|university|college)\b/i.test(l))
    .map((l) => l.replace(/^[•\-–*\d.)\s]+/, ''))
    .slice(0, 3);
  if (certs.length) {
    patch.certs = certs.join(', ');
    found.push('certifications');
  }
  // current role: first line in the experience area with a job word
  const expIdx = lines.findIndex((l) => /^(work |professional )?experience|employment/i.test(l));
  const pool = expIdx >= 0 ? lines.slice(expIdx + 1, expIdx + 12) : lines.slice(0, 25);
  const current = pool.find((l) => /(engineer|developer|analyst|consultant|associate|executive|administrator|intern|lead|specialist|tester|coordinator)/i.test(l) && l.length < 90);
  if (current) {
    patch.current = current.replace(/^[•\-–*\s]+/, '').replace(/\s*[(|]?\s*((19|20)\d\d|present|current).*$/i, '').replace(/,\s*/, ' at ').trim();
    found.push('role');
  }
  // profile type
  const fieldBg = role.backgroundRe.test(pool.join(' '));
  patch.type = !years || (/fresher|graduate|intern/i.test(text.slice(0, 600)) && years < 1) ? 'fresher' : fieldBg ? 'exp' : 'switch';
  // projects
  const pIdx = lines.findIndex((l) => /^(academic |key |personal )?projects?\b/i.test(l) && l.length < 40);
  let projLines: string[] = [];
  if (pIdx >= 0) projLines = lines.slice(pIdx + 1, pIdx + 25).filter((l) => l.length > 45);
  if (!projLines.length) projLines = lines.filter((l) => l.length > 50 && role.projectRe.test(l));
  projLines = projLines.map((l) => l.replace(/^[•\-–*\d.)\s]+/, '')).slice(0, 2);
  if (projLines[0]) {
    patch.p1 = projLines[0].slice(0, 300);
    found.push('projects');
  }
  patch.p2 = projLines[1] ? projLines[1].slice(0, 300) : '';
  // notice period
  const nt = text.match(/immediate(ly)?\s*(joiner|available)?|(\d{2})\s*days?\s*notice|notice[^\n]{0,20}?(\d{2})\s*days?/i);
  if (nt) {
    const d = nt[3] || nt[4];
    const map: Record<string, Notice> = { '15': '15 days', '30': '30 days', '60': '60 days', '90': '90 days' };
    patch.notice = !d ? 'Immediate joiner' : map[d] ?? '30 days';
  }
  return { patch, found };
}

/* ───────────────────────── Text generation ───────────────────────── */

type Data = ProfileForm & { first: string; yrs: string; certList: string[]; projects: string[]; allSkills: string[] };

const unique = (a: string[]) => a.filter((v, i) => a.findIndex((x) => x.toLowerCase() === v.toLowerCase()) === i);
const bar = (...parts: (string | false | undefined)[]) => parts.filter(Boolean).join(' | ');

function prepare(f: ProfileForm): Data {
  const t = (s: string) => s.trim();
  const name = t(f.name) || 'Your Name';
  const other = f.otherSkills.split(',').map(t).filter(Boolean);
  return {
    ...f,
    name,
    city: t(f.city), years: t(f.years), current: t(f.current), pref: t(f.pref), certs: t(f.certs),
    first: name.split(' ')[0],
    yrs: t(f.years) ? `${t(f.years)}+ yrs` : '',
    certList: f.certs.split(',').map(t).filter(Boolean),
    projects: [t(f.p1), t(f.p2)].filter(Boolean),
    allSkills: unique([...f.skills, ...other]),
  };
}

const top = (d: Data, n: number) => d.allSkills.slice(0, n).join(', ');

function shortTitle(p: string) {
  let w = p.replace(/^(e\.g\.\s*)?(built|created|developed|designed|migrated|implemented|deployed|automated|gathered|set up)\s+(an?\s+|the\s+)?/i, '').split(/[:.,]| using | with | from | for /i)[0].trim();
  if (w.length > 60) w = w.slice(0, 60).replace(/\s+\S*$/, '');
  return w.charAt(0).toUpperCase() + w.slice(1);
}

let seq = 0;
const block = (key: string, title: string, text: string, limit?: number): OutputBlock => ({ id: `b${seq++}`, key, title, text, limit });

export function naukri(form: ProfileForm, role: Role): OutputBlock[] {
  const d = prepare(form);
  const cert = d.certList[0];
  const headline =
    d.type === 'fresher'
      ? bar(`Aspiring ${role.title}`, top(d, 5), role.headlineTag.fresher, cert, d.notice)
      : d.type === 'switch'
        ? bar(role.title, d.yrs && `${d.yrs} IT experience`, top(d, 5), role.headlineTag.switch, cert, d.notice)
        : bar(role.title, d.yrs, top(d, 6), role.headlineTag.exp, cert, d.notice);
  const headline2 = headline.replace(role.title, role.titleAlt);

  const intro =
    d.type === 'fresher'
      ? role.intro.fresher
      : d.type === 'switch'
        ? `IT professional with ${d.yrs || 'several years'} of experience${d.current ? ` (currently ${d.current})` : ''}, ${role.intro.switch}`
        : `${role.projectRole} with ${d.yrs || 'several years'} of experience${d.current ? ` (currently ${d.current})` : ''}, ${role.intro.exp}`;

  const summary = [
    intro,
    `Skilled in ${d.allSkills.slice(0, 10).join(', ')}. ${role.core}`,
    d.projects.length ? `Key project: ${d.projects[0]}` : '',
    d.certList.length ? `Certified: ${d.certList.join(', ')}.` : '',
    `Looking for ${role.jobTitles.slice(0, 2).join(' / ')} roles${d.pref ? ` in ${d.pref}` : ''}. ${d.notice}.`,
  ].filter(Boolean).join('\n\n');

  const projs = d.projects
    .map((p, i) => [
      `Project ${i + 1}`,
      `Title: ${shortTitle(p)}`,
      `Role: ${role.projectRole}`,
      `Description: ${p}`,
      `Tools: ${top(d, 6)}`,
      'Responsibilities:',
      ...role.responsibilities.map((r) => `• ${r}`),
    ].join('\n'))
    .join('\n\n');

  const file = `${d.name.split(/\s+/).map((w) => w.replace(/[^A-Za-z]/g, '')).filter(Boolean).join('_') || 'Your_Name'}_${role.fileName}.pdf`;
  return [
    block('file', 'Resume file name', file),
    block('headlineA', 'Resume headline (version A)', headline, 250),
    block('headlineB', 'Resume headline (version B, swap daily)', headline2, 250),
    block('summary', 'Profile summary', summary, 1000),
    block('keyskills', 'Key skills (add one by one)', unique([...d.allSkills, ...role.keySkillsExtra]).join('\n')),
    ...(projs ? [block('projects', 'Project descriptions', projs)] : []),
  ];
}

export function linkedin(form: ProfileForm, role: Role): OutputBlock[] {
  const d = prepare(form);
  let headline =
    d.type === 'fresher'
      ? bar(role.title, top(d, 4), role.liTag.fresher, `Open to ${role.jobTitles[0]} roles`)
      : bar(role.title, top(d, 4), d.yrs && `${d.yrs} in IT`, role.liTag.exp);
  if (d.certList[0]) headline += ` | ${d.certList[0]}`;

  const hl = new Set(role.highlight.items.map((x) => x.toLowerCase()));
  const rest = d.allSkills.filter((s) => !hl.has(s.toLowerCase()) && s.toLowerCase() !== role.highlight.label.toLowerCase()).slice(0, 8);
  const opening =
    d.type === 'fresher'
      ? `I'm a ${role.projectRole.toLowerCase()} trained in ${role.training}. ${role.enjoys}`
      : d.type === 'switch'
        ? `After ${d.yrs || 'several years'} in IT${d.current ? ` as ${d.current}` : ''}, I moved into ${role.field} and now work as a ${role.title}.`
        : `I'm a ${role.projectRole.toLowerCase()} with ${d.yrs || 'several years'} of experience in ${role.field}. ${role.enjoys}`;

  const about = [
    `Hi, I'm ${d.first} 👋`,
    opening,
    `What I work with:\n🔹 ${role.highlight.label}: ${role.highlight.items.join(', ')}${rest.length ? `\n🔹 ${rest.join(' · ')}` : ''}`,
    d.projects.length ? `Recent work:\n${d.projects.map((p) => `✅ ${p}`).join('\n')}` : '',
    d.certList.length ? `🎓 ${d.certList.join(', ')}` : '',
    `I'm open to ${role.jobTitles.slice(0, 2).join(' and ')} roles${d.pref ? ` (${d.pref})` : ''}. Feel free to connect or message me.`,
  ].filter(Boolean).join('\n\n');

  const slug = `${d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}-${role.projectRole.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const firstProject = d.projects[0] ? d.projects[0].charAt(0).toLowerCase() + d.projects[0].slice(1) : `hands-on ${role.field} projects`;
  const post = [
    `Excited to share that I've completed my training in ${role.training}! ${role.emoji}`,
    `Over the past few months I worked on ${firstProject.replace(/^e\.g\.\s*/i, '')}.`,
    `Key things I learned:\n1️⃣ ${role.learnings[0]}\n2️⃣ ${role.learnings[1]}\n3️⃣ ${role.learnings[2]}`,
    `I'm now looking for ${role.jobTitles.slice(0, 2).join(' / ')} opportunities${d.pref ? ` in ${d.pref}` : ''}. Referrals and suggestions are very welcome 🙏`,
    [...role.hashtags, 'OpenToWork', 'Hiring'].map((h) => `#${h}`).join(' '),
  ].join('\n\n');
  const msg = `Hi [Name], I'm a ${role.title}${d.yrs ? ` with ${d.yrs} in IT` : ''} looking for ${role.field} roles. I noticed you hire for ${role.team} at [Company] and would love to connect.`;

  return [
    block('liHeadline', 'Headline', headline, 220),
    block('about', 'About', about, 2600),
    block('url', 'Custom URL suggestion', `linkedin.com/in/${slug}`),
    block('liSkills', 'Skills to add', unique([...d.allSkills, role.keySkillsExtra[0]]).join('\n')),
    block('post', 'First post', post, 3000),
    block('note', 'Connection note for recruiters', msg, 300),
  ];
}

/* ───────────────────────── Guided steps ───────────────────────── */

export type ChecklistGroup = 'naukri' | 'linkedin' | 'daily' | 'weekly';
export type Platform = 'naukri' | 'linkedin';

/** One instruction + the phone screen it happens on + the text to paste there */
export type GuideStep = {
  title: string;
  text: string;
  /** Section highlighted on the illustrated phone screen ('menu' = the app's side menu) */
  focus: string;
  /** What to tap, shown as a bubble on the phone */
  action: string;
  /** Keys of OutputBlocks to show with this step */
  outputs?: string[];
};

/** Sections on the illustrated profile screens (a simplified drawing, not the real app UI) */
export const screens: Record<Platform, string[]> = {
  naukri: ['Resume', 'Resume headline', 'Key skills', 'Employment', 'IT skills', 'Projects', 'Profile summary', 'Accomplishments', 'Career profile', 'Personal details'],
  linkedin: ['Photo & banner', 'Headline', 'Open to work', 'Public profile & URL', 'About', 'Featured', 'Projects', 'Licenses & certifications', 'Skills', 'Start a post'],
};

export function guides(role: Role): { naukri: GuideStep[]; linkedin: GuideStep[]; daily: string[]; weekly: string[] } {
  return {
    naukri: [
      { title: 'Open your profile', text: 'Open the **Naukri app** → tap your **photo** (top left) → **View & Update Profile**.', focus: 'menu', action: 'Tap your photo' },
      { title: 'Upload your resume', text: 'Upload your latest resume as a **PDF**. Rename the file first, like the name below, so recruiters see your role.', focus: 'Resume', action: 'Tap Update resume', outputs: ['file'] },
      { title: 'Resume headline', text: 'Tap ✎ next to **Resume headline** and paste version A. Tomorrow, swap in version B: small edits keep your profile fresh.', focus: 'Resume headline', action: 'Tap ✎ to edit', outputs: ['headlineA', 'headlineB'] },
      { title: 'Key skills', text: 'Tap ✎ on **Key skills**. Delete unrelated skills, then add the skills below **one by one**.', focus: 'Key skills', action: 'Tap ✎ to edit', outputs: ['keyskills'] },
      { title: 'IT skills', text: `Tap **Add** under **IT skills** and add ${role.itSkills}, with version and years of experience.`, focus: 'IT skills', action: 'Tap Add' },
      { title: 'Projects', text: `Tap **Add** under **Projects**. Add each project with the description below and choose role **${role.projectRole}**.`, focus: 'Projects', action: 'Tap Add', outputs: ['projects'] },
      { title: 'Profile summary', text: 'Tap ✎ on **Profile summary** and paste the summary below.', focus: 'Profile summary', action: 'Tap ✎ to edit', outputs: ['summary'] },
      { title: 'Certifications', text: 'Open **Accomplishments → Certifications** and add each certificate with its link.', focus: 'Accomplishments', action: 'Tap Add' },
      { title: 'Career profile', text: `In **Career profile** set desired role **${role.jobTitles[0]}**, job type **Permanent**, your preferred locations and expected salary.`, focus: 'Career profile', action: 'Tap ✎ to edit' },
      { title: 'Notice period & photo', text: 'In **Personal details** set your notice period. Add a clear, professional photo and check your profile reaches **100%**.', focus: 'Personal details', action: 'Tap ✎ to edit' },
    ],
    linkedin: [
      { title: 'Photo & banner', text: `Add a clear, professional **profile photo** and a simple **${role.banner}** banner.`, focus: 'Photo & banner', action: 'Tap the camera' },
      { title: 'Headline', text: 'Tap the **✎ pencil** on your intro, paste the **Headline** below and set your location.', focus: 'Headline', action: 'Tap ✎ to edit', outputs: ['liHeadline'] },
      { title: 'Custom profile URL', text: 'Open **Public profile & URL** → edit your URL to the suggestion below.', focus: 'Public profile & URL', action: 'Tap ✎ to edit', outputs: ['url'] },
      { title: 'About section', text: 'Tap ✎ on **About** (or **Add section → About**) and paste the text below.', focus: 'About', action: 'Tap ✎ to edit', outputs: ['about'] },
      { title: 'Skills', text: `Add the skills below under **Skills**, then pin **${role.pinSkills}** as your top skills.`, focus: 'Skills', action: 'Tap + Add skill', outputs: ['liSkills'] },
      { title: 'Projects', text: 'Under **Projects**, add each project. Link a GitHub repo or demo if you have one.', focus: 'Projects', action: 'Tap + Add' },
      { title: 'Certifications', text: 'Add certificates under **Licenses & certifications** with the credential link.', focus: 'Licenses & certifications', action: 'Tap + Add' },
      { title: 'Open to work', text: `Tap **Open to → Finding a new job**. Job titles: **${role.jobTitles.join(', ')}**. Choose "Recruiters only" if you’re currently employed.`, focus: 'Open to work', action: 'Tap Open to' },
      { title: 'Featured', text: 'Add your GitHub, portfolio or resume link under **Featured**.', focus: 'Featured', action: 'Tap + Add' },
      { title: 'Your first post', text: 'Tap **Start a post**, paste the post below and publish it to announce your skills.', focus: 'Start a post', action: 'Tap Start a post', outputs: ['post'] },
    ],
    daily: [
      'Naukri: make a small edit (swap the headline version, or reorder one key skill) and save.',
      `Naukri: apply to 10 relevant ${role.jobTitles.slice(0, 2).join(' / ')} jobs.`,
      `LinkedIn: send 5 personalised connection requests to recruiters or people in ${role.team}.`,
      `LinkedIn: like or comment on 3 posts about ${role.topic}.`,
    ],
    weekly: [
      `Post one thing you learned on LinkedIn (${role.learnTip}).`,
      'Re-upload your resume on Naukri (even the same file refreshes the update date).',
      'Share your applications and interview calls with your placement coordinator.',
    ],
  };
}

/** Plain checklist text for each group (progress counts) */
export function checklists(role: Role): Record<ChecklistGroup, string[]> {
  const g = guides(role);
  return { naukri: g.naukri.map((s) => s.text), linkedin: g.linkedin.map((s) => s.text), daily: g.daily, weekly: g.weekly };
}

/** What each section of the phone picture shows, filled from the user's own content */
export function screenContent(platform: Platform, form: ProfileForm, role: Role, blocks: OutputBlock[]): Record<string, string> {
  const b = (k: string) => blocks.find((x) => x.key === k)?.text ?? '';
  const first = (t: string) => t.split('\n').find(Boolean) ?? '';
  const skills = (k: string) => b(k).split('\n').filter(Boolean).slice(0, 6).join(' · ');
  const certs = form.certs.trim();
  const projects = [form.p1, form.p2].filter((p) => p.trim()).length;
  if (platform === 'naukri') {
    return {
      Resume: b('file'),
      'Resume headline': b('headlineA'),
      'Key skills': skills('keyskills'),
      Employment: form.current || (form.type === 'fresher' ? 'Fresher' : ''),
      'IT skills': role.itSkills.replace(' and ', ', '),
      Projects: projects ? `${projects} project${projects > 1 ? 's' : ''} · ${role.projectRole}` : '',
      'Profile summary': first(b('summary')),
      Accomplishments: certs,
      'Career profile': `${role.jobTitles[0]} · Permanent${form.pref ? ` · ${form.pref}` : ''}`,
      'Personal details': `${form.notice}${form.city ? ` · ${form.city}` : ''}`,
    };
  }
  return {
    'Photo & banner': '',
    Headline: b('liHeadline'),
    'Open to work': role.jobTitles.join(', '),
    'Public profile & URL': b('url'),
    About: b('about').split('\n').filter(Boolean)[1] ?? '',
    Featured: 'GitHub · Resume',
    Projects: projects ? `${projects} project${projects > 1 ? 's' : ''}` : '',
    'Licenses & certifications': certs,
    Skills: skills('liSkills'),
    'Start a post': first(b('post')),
  };
}

/** How complete the details form is (0–100), shown as the profile ring */
export function completion(f: ProfileForm) {
  const checks = [f.name, f.city, f.current || f.type === 'fresher', f.pref, f.skills.length >= 5, f.certs, f.p1, f.p2, f.years || f.type === 'fresher'];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
