/**
 * Journey steps: when the group enters view the track fills, and each node lights up
 * (with its text rising in) as the fill reaches it.
 */
import { loadGsap } from '../../lib/motion';

export async function initJourney() {
  const { gsap, ScrollTrigger } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-journey]').forEach((root) => {
    const fill = root.querySelector('[data-journey-fill]');
    const nodes = [...root.querySelectorAll<HTMLElement>('.journey-node')];
    const bodies = root.querySelectorAll('[data-journey-body]');
    const vertical = !window.matchMedia('(min-width: 900px)').matches;
    const total = 1.6;
    const step = nodes.length > 1 ? total / (nodes.length - 1) : 0;

    nodes.forEach((n) => n.classList.add('is-dim'));
    gsap.set(fill, vertical ? { scaleY: 0 } : { scaleX: 0 });
    gsap.set(bodies, { opacity: 0, y: 16 });

    const tl = gsap.timeline({ paused: true });
    tl.to(fill, { ...(vertical ? { scaleY: 1 } : { scaleX: 1 }), duration: total, ease: 'power1.inOut' }, 0);
    nodes.forEach((node, i) => {
      const at = i * step;
      tl.add(() => node.classList.remove('is-dim'), at)
        .fromTo(node, { scale: 0.8 }, { scale: 1, duration: 0.6, ease: 'back.out(3)' }, at)
        .to(bodies[i], { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, at + 0.05);
    });

    ScrollTrigger.create({ trigger: root, start: 'top 78%', once: true, onEnter: () => tl.play() });
  });
}
