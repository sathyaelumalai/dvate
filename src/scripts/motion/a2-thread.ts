/**
 * A2: the thread. The drawn length follows page scroll progress. Each node sits at the
 * scroll position where its section reaches the middle of the viewport, so the line
 * reaches a node at the moment that node fills.
 */
import { loadGsap } from '../../lib/motion';

export async function initThread() {
  const { gsap, ScrollTrigger } = await loadGsap();
  const fill = document.querySelector('[data-thread-fill]');
  const bar = document.querySelector('[data-thread-bar]');
  const nodes = [...document.querySelectorAll<HTMLElement>('[data-thread-node]')];
  const sections = [...document.querySelectorAll<HTMLElement>('[data-thread]')];
  if (!fill || !bar) return;

  const progress = { trigger: document.documentElement, start: 0, end: 'max', scrub: 0.3 } as const;
  gsap.fromTo(fill, { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { ...progress } });
  gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, ease: 'none', scrollTrigger: { ...progress } });

  const place = () => {
    const max = ScrollTrigger.maxScroll(window) || 1;
    const half = window.innerHeight / 2;
    sections.forEach((section, i) => {
      const node = nodes[i];
      if (!node) return;
      const top = section.getBoundingClientRect().top + window.scrollY;
      const at = Math.min(Math.max((top - half) / max, 0), 1);
      node.style.top = `${at * 100}%`;
    });
  };

  sections.forEach((section, i) => {
    const node = nodes[i];
    if (!node) return;
    node.classList.add('is-empty');
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      onEnter: () => node.classList.remove('is-empty'),
      onLeaveBack: () => node.classList.add('is-empty'),
    });
  });

  ScrollTrigger.addEventListener('refresh', place);
  place();
}
