/**
 * A3: the old way vs the DVATE way. Two tabs share one stage. Switching to the DVATE way
 * flies the six old-way steps into the centre of the stage, where they collapse into the
 * single DVATE card; switching back reverses it.
 * - Home ('auto'): when the section enters view, the steps cascade in, hold, then collapse.
 *   Any click on the tabs cancels the automatic switch.
 * - Briefing ('stepped'): the deck calls the controller stored on the element.
 * With reduced motion every change is instant and the DVATE way shows first.
 */
import { loadGsap } from '../../lib/motion';

type State = 'old' | 'dvate';

export interface CompareController {
  state(): State;
  show(state: State, animate?: boolean): Promise<void>;
}

export function initCompare(root: HTMLElement, animate: boolean): CompareController {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-cmp-tab]')];
  const stage = root.querySelector<HTMLElement>('[data-cmp-stage]')!;
  const oldPanel = root.querySelector<HTMLElement>('[data-cmp-panel="old"]')!;
  const dvatePanel = root.querySelector<HTMLElement>('[data-cmp-panel="dvate"]')!;
  const steps = [...root.querySelectorAll<HTMLElement>('[data-cmp-step]')];
  const card = root.querySelector<HTMLElement>('[data-cmp-card]')!;
  const mode = root.dataset.compare;
  let current: State = animate ? 'old' : 'dvate';
  let auto: { kill(): void } | null = null;

  const setTabs = (state: State) => {
    tabs.forEach((t) => {
      const on = t.dataset.cmpTab === state;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    root.classList.toggle('show-dvate', state === 'dvate');
  };

  const setStatic = (state: State) => {
    oldPanel.style.visibility = state === 'old' ? 'visible' : 'hidden';
    dvatePanel.style.visibility = state === 'dvate' ? 'visible' : 'hidden';
    oldPanel.style.opacity = state === 'old' ? '1' : '0';
    dvatePanel.style.opacity = state === 'dvate' ? '1' : '0';
  };

  /** Offset from each step's centre to the stage centre. */
  const offsets = () => {
    const s = stage.getBoundingClientRect();
    const cx = s.left + s.width / 2;
    const cy = s.top + s.height / 2;
    return steps.map((el) => {
      const r = el.getBoundingClientRect();
      return { x: cx - (r.left + r.width / 2), y: cy - (r.top + r.height / 2) };
    });
  };

  async function show(state: State, withMotion = animate) {
    if (state === current && withMotion) return;
    current = state;
    setTabs(state);
    if (!withMotion) {
      setStatic(state);
      return;
    }
    const { gsap } = await loadGsap();
    gsap.killTweensOf([oldPanel, dvatePanel, card, ...steps]);
    const off = offsets();

    if (state === 'dvate') {
      gsap
        .timeline()
        .to(steps, {
          x: (i) => off[i].x,
          y: (i) => off[i].y,
          scale: 0.4,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.in',
          stagger: { each: 0.05, from: 'edges' },
        })
        .set(oldPanel, { autoAlpha: 0 })
        .set(steps, { x: 0, y: 0, scale: 1, opacity: 1 })
        .set(dvatePanel, { autoAlpha: 1 })
        .fromTo(card, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'expo.out' }, '-=0.05')
        .fromTo(card.children, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, '-=0.6');
    } else {
      gsap
        .timeline()
        .to(card, { scale: 0.7, opacity: 0, duration: 0.4, ease: 'power3.in' })
        .set(dvatePanel, { autoAlpha: 0 })
        .set(card, { scale: 1, opacity: 1 })
        .set(oldPanel, { autoAlpha: 1 })
        .fromTo(
          steps,
          { x: (i) => off[i].x, y: (i) => off[i].y, scale: 0.4, opacity: 0 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: { each: 0.05, from: 'center' } },
        );
    }
  }

  const userShow = (state: State) => {
    auto?.kill();
    auto = null;
    show(state);
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => userShow(tab.dataset.cmpTab as State));
    tab.addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
      e.preventDefault();
      const next: State = e.key === 'ArrowLeft' || e.key === 'Home' ? 'old' : 'dvate';
      tabs.find((t) => t.dataset.cmpTab === next)?.focus();
      userShow(next);
    });
  });

  setTabs(current);
  setStatic(current);
  root.classList.add('is-ready');

  // Home: cascade the old steps in when the section enters view, then collapse.
  if (animate && mode === 'auto') {
    loadGsap().then(({ gsap, ScrollTrigger }) => {
      gsap.set(steps, { opacity: 0, y: 24 });
      ScrollTrigger.create({
        trigger: stage,
        start: 'top 70%',
        once: true,
        onEnter: () => {
          gsap.to(steps, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.09 });
          auto = gsap.delayedCall(2.4, () => {
            auto = null;
            show('dvate');
          });
        },
      });
    });
  }

  const controller: CompareController = { state: () => current, show };
  (root as HTMLElement & { compare?: CompareController }).compare = controller;
  return controller;
}
