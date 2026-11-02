/**
 * Site-wide scroll reveals.
 * - Section headings (h2): words slide up from behind a mask, staggered.
 * - [data-reveal]: fades up as it enters view.
 * - [data-reveal-group]: children rise in a staggered wave (ScrollTrigger.batch).
 * Elements already on screen when this runs are left alone, so nothing flickers and
 * the largest contentful paint is never hidden. Skipped entirely with reduced motion.
 */
import { loadGsap } from '../../lib/motion';

const SKIP = '[data-hero], [data-deck], [data-no-reveal], [data-collapse]';

export async function initReveal() {
  if (document.querySelector('[data-deck]')) return;
  const [{ gsap, ScrollTrigger }, { SplitText }] = await Promise.all([loadGsap(), import('gsap/SplitText')]);
  gsap.registerPlugin(SplitText);
  await document.fonts.ready;

  const fold = window.innerHeight * 0.92;
  const belowFold = (el: Element) => el.getBoundingClientRect().top > fold && !el.closest(SKIP);

  /* Headings: masked word reveal. */
  document.querySelectorAll<HTMLElement>('main section h2').forEach((h2) => {
    if (!belowFold(h2) || h2.closest('[data-reveal-group]')) return;
    const split = SplitText.create(h2, { type: 'words', mask: 'words' });
    gsap.from(split.words, {
      yPercent: 110,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.045,
      scrollTrigger: { trigger: h2, start: 'top 88%', once: true },
    });
  });

  /* Single elements and section ledes. */
  const singles = [
    ...document.querySelectorAll<HTMLElement>('[data-reveal], main .section-head > :not(h2)'),
  ].filter(belowFold);
  singles.forEach((el) => {
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.12,
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  /* Groups: children rise in a staggered wave. */
  document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
    const items = [...group.children].filter(belowFold) as HTMLElement[];
    if (!items.length) return;
    gsap.set(items, { y: 48, opacity: 0 });
    ScrollTrigger.batch(items, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08, overwrite: true }),
    });
  });
}
