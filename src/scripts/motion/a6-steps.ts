/**
 * A6: threaded steps. The connecting line draws as the section scrolls, and each node
 * fills when the line reaches it.
 */
import { loadGsap } from '../../lib/motion';

export async function initSteps() {
  const { gsap } = await loadGsap();
  document.querySelectorAll<HTMLElement>('[data-steps]').forEach((root) => {
    const fill = root.querySelector('[data-steps-fill]');
    const nodes = [...root.querySelectorAll<HTMLElement>('.tstep-node')];
    if (!fill || !nodes.length) return;
    const last = Math.max(nodes.length - 1, 1);
    const update = (progress: number) => {
      nodes.forEach((node, i) => {
        const threshold = i === 0 ? 0.02 : i / last - 0.01;
        node.classList.toggle('is-empty', progress < threshold);
      });
    };
    update(0);
    gsap.fromTo(
      fill,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top 70%',
          end: 'bottom 55%',
          scrub: 0.4,
          onUpdate: (self) => update(self.progress),
        },
      },
    );
  });
}
