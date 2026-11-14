import { emptyForm, type ProfileForm } from './engine';
import type { Role } from './roles';

const strip = (s: string) => s.replace(/^e\.g\.\s*/i, '');

/** Demo persona used on the product page — real engine output, fictional person */
export function sampleForm(role: Role): ProfileForm {
  return {
    ...emptyForm(role),
    name: 'Priya Sharma',
    city: 'Bangalore',
    type: 'switch',
    years: '2',
    current: strip(role.examples.current),
    pref: 'Bangalore, Hyderabad, Remote',
    certs: strip(role.examples.cert).split(',')[0],
    p1: strip(role.examples.p1),
    p2: strip(role.examples.p2),
    notice: '30 days',
    skills: [...role.defaults.slice(0, 6), ...role.skills.filter((s) => s.trending).slice(0, 2).map((s) => s.name)],
  };
}

export const sampleFileName = (role: Role) => `Priya_Sharma_${role.fileName}.pdf`;
