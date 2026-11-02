/** A4: items fade up 16px with a 0.06s stagger, once, when their group enters view. */
import { loadGsap } from '../../lib/motion';

export async function initStagger() {
  const { gsap } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    const items = group.querySelectorAll('[data-stagger-item]');
    gsap.fromTo(
      items,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
        scrollTrigger: { trigger: group, start: 'top 80%', once: true },
      },
    );
  });
}
