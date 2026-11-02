/**
 * A1: line and drop. The catheter draws in, the hubs fade in, the drop fills red from
 * bottom to top, then one heartbeat. The final CTA drop pulses once when it enters view.
 * This is the only page-load sequence on the site.
 */
import { loadGsap } from '../../lib/motion';

type Gsap = Awaited<ReturnType<typeof loadGsap>>['gsap'];

function heartbeat(gsap: Gsap, target: Element, origin: string) {
  return gsap
    .timeline()
    .to(target, { scale: 1.06, duration: 0.14, ease: 'power2.out', transformOrigin: origin })
    .to(target, { scale: 1, duration: 0.2, ease: 'power2.in' })
    .to(target, { scale: 1.03, duration: 0.12, ease: 'power2.out' }, '+=0.05')
    .to(target, { scale: 1, duration: 0.24, ease: 'power2.inOut' });
}

/** Builds the draw, fill and pulse timeline for one [data-line-drop] graphic. */
export function lineDropTimeline(gsap: Gsap, root: Element, vars: gsap.TimelineVars = {}) {
  const tubes = root.querySelectorAll('.lad-tube');
  const hubs = root.querySelectorAll('.lad-hubs, .lad-tip');
  const fillRect = root.querySelector('.lad-fill-rect');
  const drop = root.querySelector('.lad-drop');
  const flow = root.querySelector('.lad-flow');

  const tl = gsap.timeline(vars);
  tl.fromTo(tubes, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
    .fromTo(hubs, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power1.out' }, '-=0.3')
    .fromTo(fillRect, { '--fill-y': '250px' }, { '--fill-y': '0px', duration: 1.1, ease: 'power2.inOut' }, '-=0.15')
    .fromTo(flow, { opacity: 0 }, { opacity: 0.75, duration: 0.8 }, '-=0.6');
  if (drop) {
    tl.add(heartbeat(gsap, drop, '50% 60%'));
    // Then a soft heartbeat every few seconds.
    tl.add(() => {
      heartbeat(gsap, drop, '50% 60%').repeat(-1).repeatDelay(3.2);
    });
  }
  return tl;
}

export async function initLineDrop() {
  const { gsap, ScrollTrigger } = await loadGsap();
  const html = document.documentElement;

  // Hero graphic plays on load, unless the failsafe already showed the final state.
  document.querySelectorAll('[data-line-drop]:not([data-manual])').forEach((root) => {
    if (!html.classList.contains('motion-ok')) return;
    lineDropTimeline(gsap, root, { delay: 0.15 });
  });

  // Final call to action: the drop at the end of the page line pulses once.
  document.querySelectorAll('[data-final-cta] .fcta-drop').forEach((drop) => {
    ScrollTrigger.create({
      trigger: drop,
      start: 'top 85%',
      once: true,
      onEnter: () => heartbeat(gsap, drop, '50% 65%'),
    });
  });
}
