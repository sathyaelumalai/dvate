/**
 * A7: the 17 module tiles fill one by one, then the counters count up to their values.
 * Counters use tabular numbers and a fixed minimum width so nothing shifts.
 */
import { loadGsap } from '../../lib/motion';

export async function initModules() {
  const { gsap } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-modules]').forEach((root) => {
    const fills = root.querySelectorAll('[data-tile-fill]');
    const counts = [...root.querySelectorAll<HTMLElement>('[data-count]')];

    gsap.set(fills, { scale: 0, opacity: 0 });
    counts.forEach((el) => (el.textContent = '0'));

    const tl = gsap.timeline({
      scrollTrigger: { trigger: root, start: 'top 75%', once: true },
    });
    tl.to(fills, { scale: 1, opacity: 1, duration: 0.3, ease: 'power2.out', stagger: 0.04 });
    counts.forEach((el, i) => {
      const target = Number(el.dataset.count);
      const state = { value: 0 };
      tl.to(
        state,
        {
          value: target,
          duration: 1.1,
          ease: 'power2.out',
          onUpdate: () => (el.textContent = String(Math.round(state.value))),
        },
        i === 0 ? 0.2 : '<0.15',
      );
    });
  });
}
