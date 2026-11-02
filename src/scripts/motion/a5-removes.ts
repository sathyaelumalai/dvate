/** A5: a red slash draws across each "What DVATE removes" icon as its card enters view. */
import { loadGsap } from '../../lib/motion';

export async function initRemoves() {
  const { gsap } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-removes] .remove').forEach((card) => {
    const slashes = card.querySelectorAll('[data-slash]');
    const icon = card.querySelector('.remove-icon');
    gsap
      .timeline({ scrollTrigger: { trigger: card, start: 'top 82%', once: true } })
      .fromTo(icon, { scale: 0.8, rotate: -8 }, { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)' }, 0.25)
      .fromTo(slashes, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.45, ease: 'power2.out' }, 0.55);
  });
}
