/**
 * "Profile pack": a branded, print-ready document with everything the user
 * generated (Naukri + LinkedIn content, step-by-step checklists, routine).
 * Opens in a new tab and triggers the browser's Save-as-PDF dialog, so emoji,
 * Indian names and every character render exactly as on screen. No server.
 */
import { company } from '@/lib/content';
import { guides, linkedin, naukri, type OutputBlock, type ProfileForm } from './engine';
import type { Role } from './roles';

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] as string);
const rich = (s: string) => esc(s).replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');

const blockHtml = (b: OutputBlock) => `
  <div class="block">
    <div class="bh"><span>${esc(b.title)}</span>${b.limit ? `<em>${b.text.length}/${b.limit} characters</em>` : ''}</div>
    <div class="bt">${esc(b.text)}</div>
  </div>`;

const list = (items: string[]) => `<ol class="check">${items.map((t) => `<li><span class="box"></span><span>${rich(t)}</span></li>`).join('')}</ol>`;

export function buildPackHtml(form: ProfileForm, role: Role) {
  const nk = naukri(form, role);
  const li = linkedin(form, role);
  const g = guides(role);
  const name = form.name.trim() || 'Your Name';
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  const nkSteps = g.naukri.map((s) => `**${s.title}:** ${s.text}`);
  const liSteps = g.linkedin.map((s) => `**${s.title}:** ${s.text}`);

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(name)} – Profile Pack – ${esc(company.name)}</title>
<style>
  @page { size: A4; margin: 16mm 14mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 13px/1.55 -apple-system, "Segoe UI", Roboto, "Noto Sans", Arial, sans-serif; color: #171717; background: #f5f5f5; }
  .page { max-width: 820px; margin: 24px auto; background: #fff; padding: 36px 40px; border-radius: 16px; box-shadow: 0 10px 40px -20px rgba(0,0,0,.25); }
  .bar { display:flex; justify-content:space-between; align-items:center; gap:16px; padding: 12px 16px; margin: -8px 0 28px; border-radius: 12px; background: #f5edff; color:#4c0d8f; font-size:12px; }
  .bar button { border:0; background:#9114FF; color:#fff; font-weight:600; padding:9px 16px; border-radius:999px; cursor:pointer; font-size:12px; }
  header { border-bottom: 2px solid #9114FF; padding-bottom: 18px; margin-bottom: 24px; }
  .brand { font-weight: 800; letter-spacing: -.02em; font-size: 14px; } .brand i { color:#9114FF; font-style: normal; }
  h1 { font-size: 26px; letter-spacing: -.03em; margin: 14px 0 4px; }
  .meta { color: #525252; }
  .chips { margin-top: 10px; display:flex; flex-wrap:wrap; gap:6px; }
  .chips span { background:#f5edff; color:#5b0aa8; border-radius:999px; padding:2px 10px; font-size:11px; font-weight:600; }
  h2 { font-size: 17px; margin: 30px 0 12px; display:flex; align-items:center; gap:8px; }
  h2 .n { display:inline-grid; place-items:center; width:24px; height:24px; border-radius:999px; background:#9114FF; color:#fff; font-size:12px; }
  h3 { font-size: 13px; margin: 18px 0 8px; color:#404040; text-transform: uppercase; letter-spacing: .08em; }
  .block { border: 1px solid #e5e5e5; border-radius: 10px; margin: 0 0 10px; break-inside: avoid; overflow:hidden; }
  .bh { display:flex; justify-content:space-between; gap:10px; background:#fafafa; border-bottom:1px solid #eee; padding:7px 12px; font-weight:600; font-size:12px; }
  .bh em { font-style: normal; color:#737373; font-weight:500; }
  .bt { padding: 10px 12px; white-space: pre-wrap; word-wrap: break-word; }
  ol.check { list-style:none; padding:0; margin:0; }
  ol.check li { display:flex; gap:10px; padding:7px 0; border-bottom:1px solid #f0f0f0; break-inside: avoid; }
  .box { flex:none; width:14px; height:14px; border:1.5px solid #a3a3a3; border-radius:4px; margin-top:3px; }
  .tip { background:#fffbeb; border:1px solid #fde68a; color:#78350f; border-radius:10px; padding:10px 12px; margin-top:16px; font-size:12px; }
  footer { margin-top: 32px; padding-top: 14px; border-top:1px solid #e5e5e5; color:#737373; font-size: 11px; display:flex; justify-content:space-between; gap:12px; }
  .pb { break-before: page; }
  @media print { body { background:#fff; } .page { margin:0; padding:0; box-shadow:none; max-width:none; } .bar { display:none; } }
</style></head><body><div class="page">
  <div class="bar"><span>Save this pack: choose <b>“Save as PDF”</b> as the printer.</span><button onclick="window.print()">Download PDF</button></div>
  <header>
    <div class="brand">ns<i>/</i>global tech · Profile Builder</div>
    <h1>${esc(name)} · Profile Pack</h1>
    <div class="meta">${esc(role.title)}${form.city ? ` · ${esc(form.city)}` : ''} · Created ${esc(date)}</div>
    <div class="chips">${form.skills.slice(0, 10).map((s) => `<span>${esc(s)}</span>`).join('')}</div>
  </header>

  <h2><span class="n">1</span> Naukri profile</h2>
  ${nk.map(blockHtml).join('')}
  <h3>Update steps</h3>
  ${list(nkSteps)}

  <h2 class="pb"><span class="n">2</span> LinkedIn profile</h2>
  ${li.map(blockHtml).join('')}
  <h3>Update steps</h3>
  ${list(liSteps)}

  <h2 class="pb"><span class="n">3</span> Keep your profiles active</h2>
  <h3>Every day · 10 minutes</h3>
  ${list(g.daily)}
  <h3>Every week</h3>
  ${list(g.weekly)}
  <div class="tip">Do every update yourself in the official Naukri and LinkedIn apps. Bots and auto-apply tools can get your account restricted.</div>

  <footer><span>${esc(company.name)} · ${esc(company.phone)} · ${esc(company.email)}</span><span>nsglobaltech.com/products/profile-builder</span></footer>
</div>
<script>window.addEventListener('load',function(){setTimeout(function(){window.print()},400)})</script>
</body></html>`;
}

/** Opens the pack in a new tab (falls back to downloading the .html file if pop-ups are blocked) */
export function openProfilePack(form: ProfileForm, role: Role) {
  const html = buildPackHtml(form, role);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const w = window.open(url, '_blank');
  if (!w) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(form.name.trim() || 'Profile').replace(/\s+/g, '_')}_Profile_Pack.html`;
    a.click();
  }
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
