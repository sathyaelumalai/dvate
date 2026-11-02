/**
 * A6 (home): stacking step cards. Each card's bar draws in as it arrives, and the card
 * beneath eases back (scale) as the next one slides over it.
 */
import { loadGsap } from '../../lib/motion';

export async function initStack() {
  const { gsap } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-stack]').forEach((stack) => {
    const cards = [...stack.querySelectorAll<HTMLElement>('[data-stack-card]')];
    cards.forEach((card, i) => {
      const bar = card.querySelector('.stack-bar');
      gsap.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 45%', scrub: 0.5 } },
      );
      const next = cards[i + 1];
      if (!next) return;
      gsap.to(card, {
        scale: 0.94,
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top 85%', end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`, scrub: 0.5, invalidateOnRefresh: true },
      });
    });
  });
}
