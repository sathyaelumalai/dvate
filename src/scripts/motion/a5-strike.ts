/** A5: a red line draws through each "What DVATE removes" title as it enters view. */
import { loadGsap } from '../../lib/motion';

export async function initStrikes() {
  const { gsap } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-strike]').forEach((line) => {
    gsap.fromTo(
      line,
      { clipPath: 'inset(0 100% 0 0)' },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: line, start: 'top 85%', once: true },
      },
    );
  });
}
