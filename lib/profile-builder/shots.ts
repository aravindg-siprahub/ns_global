import type { Platform } from './engine';

/**
 * Real screenshots shown in the step guide (from the NS Global Tech team's own
 * accounts). Add more by dropping a file in /public/guides and adding an entry.
 * `spot` is the place to click, in % of the image.
 */
export type Shot = { src: string; w: number; h: number; caption: string; spot: { x: number; y: number; w: number; h: number; round?: boolean } };

const NK_HOME = { src: '/guides/naukri-home.webp', w: 362, h: 618 };
const NK_PROFILE = { src: '/guides/naukri-profile.webp', w: 1055, h: 617 };
const NK_IT = { src: '/guides/naukri-itskills.webp', w: 810, h: 105 };
const LI_PROFILE = { src: '/guides/linkedin-profile.webp', w: 1191, h: 747 };
const LI_URL = { src: '/guides/linkedin-url.webp', w: 470, h: 288 };
const LI_INTRO = { src: '/guides/linkedin-edit-intro.webp', w: 1200, h: 714 };

const quick = (label: string, y: number, w = 14): Shot => ({
  ...NK_PROFILE,
  caption: `On your Naukri profile: click “${label}” in Quick links (left side)`,
  spot: { x: 1.8, y, w, h: 5.4 },
});

export const shots: Record<Platform, Record<string, Shot[]>> = {
  naukri: {
    menu: [{ ...NK_HOME, caption: 'On naukri.com: click “View profile” on your home page', spot: { x: 27.9, y: 45.6, w: 43.9, h: 7.4 } }],
    Resume: [{ ...NK_PROFILE, caption: 'Click “Update resume” and choose your renamed PDF', spot: { x: 55.5, y: 40.5, w: 12, h: 6 } }],
    'Resume headline': [{ ...NK_PROFILE, caption: 'Click the ✎ pencil next to “Resume headline”', spot: { x: 37, y: 62, w: 4.2, h: 7, round: true } }],
    'Key skills': [{ ...NK_PROFILE, caption: 'Click the ✎ pencil next to “Key skills”', spot: { x: 31.8, y: 80.8, w: 4.2, h: 7, round: true } }],
    'IT skills': [{ ...NK_IT, caption: 'Scroll to “IT skills” and click “Add details”', spot: { x: 84.5, y: 12, w: 13.5, h: 36 } }],
    Projects: [quick('Projects', 52.6, 13)],
    'Profile summary': [quick('Profile summary', 59.6)],
    Accomplishments: [quick('Accomplishments', 66.8, 15)],
    'Career profile': [quick('Career profile', 73.8)],
    'Personal details': [quick('Personal details', 81)],
  },
  linkedin: {
    'Photo & banner': [{ ...LI_PROFILE, caption: 'On your LinkedIn profile: click your photo (or the banner) to change it', spot: { x: 3.2, y: 21.4, w: 20, h: 31.9, round: true } }],
    Headline: [
      { ...LI_PROFILE, caption: 'Click the ✎ pencil next to your intro', spot: { x: 93.2, y: 45.3, w: 4.2, h: 6.6, round: true } },
      { ...LI_INTRO, caption: 'In “Edit intro”, clear the Headline box, paste yours, then click Save', spot: { x: 3, y: 65.2, w: 92, h: 11.8 } },
    ],
    'Open to work': [{ ...LI_PROFILE, caption: 'Click “Open to” → Finding a new job', spot: { x: 3, y: 91.2, w: 9.8, h: 7 } }],
    'Public profile & URL': [{ ...LI_URL, caption: 'On the right side of your profile: click ✎ next to “Public profile & URL”', spot: { x: 84.5, y: 57.5, w: 9.5, h: 14, round: true } }],
  },
};
