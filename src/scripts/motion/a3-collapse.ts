/**
 * A3: the old way collapses into the DVATE way. The six old-way steps slide together and
 * fade to 20% while the DVATE step scales in and the red line runs straight into it.
 * Home: pinned for about 1.5 viewport heights and scrubbed to scroll.
 * Briefing: the same timeline, played on "Next" (collapseTimeline is exported for it).
 */
import { loadGsap } from '../../lib/motion';

type Gsap = Awaited<ReturnType<typeof loadGsap>>['gsap'];

export function collapseTimeline(gsap: Gsap, root: Element, vars: gsap.TimelineVars = {}) {
  const steps = [...root.querySelectorAll<HTMLElement>('[data-old-step]')];
  const dvate = root.querySelector('[data-dvate-step]');
  const line = root.querySelector('[data-red-line]');
  const caption = root.querySelector('[data-collapse-caption]');
  const chain = root.querySelector('[data-chain]');
  const mid = (steps.length - 1) / 2;
  const stepGap = steps.length > 1 ? steps[1].offsetTop - steps[0].offsetTop : 40;

  const tl = gsap.timeline(vars);
  tl.fromTo(
    steps,
    { y: 0, opacity: 1 },
    {
      // Each step moves toward the middle of the chain, closing the gaps.
      y: (i: number) => (mid - i) * stepGap * 0.55,
      opacity: 0.2,
      duration: 1,
      ease: 'power2.inOut',
      stagger: { each: 0.04, from: 'edges' },
    },
  )
    .fromTo(chain, { scaleY: 1, opacity: 1 }, { scaleY: 0.45, opacity: 0.3, duration: 1, ease: 'power2.inOut' }, 0)
    .fromTo(
      dvate,
      { scale: 0.86, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'power2.out' },
      0.45,
    )
    .fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, ease: 'power1.inOut' }, 0.7)
    .fromTo(caption, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power1.out' }, 1);
  return tl;
}

export async function initCollapse() {
  const { gsap, ScrollTrigger } = await loadGsap();
  const header = document.querySelector<HTMLElement>('[data-header]');

  document.querySelectorAll<HTMLElement>('[data-collapse="scroll"]').forEach((root) => {
    const section = root.closest('section') ?? root;
    const line = root.querySelector('[data-red-line]');
    if (line) gsap.set(line, { strokeDasharray: 1 });

    const mm = gsap.matchMedia();
    mm.add('(min-width: 768px) and (min-height: 680px)', () => {
      section.classList.add('is-pinned');
      collapseTimeline(gsap, root, {
        scrollTrigger: {
          trigger: section,
          start: () => `top ${header?.offsetHeight ?? 0}px`,
          end: () => `+=${Math.round(window.innerHeight * 1.5)}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      return () => section.classList.remove('is-pinned');
    });
    mm.add('(max-width: 767px), (max-height: 679px)', () => {
      collapseTimeline(gsap, root, {
        scrollTrigger: { trigger: root, start: 'top 65%', end: 'bottom 70%', scrub: 0.6 },
      });
    });
  });

  // Pinning adds scroll height, so every other trigger needs fresh positions.
  ScrollTrigger.refresh();
}
