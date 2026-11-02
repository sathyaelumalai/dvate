/**
 * A8: Device Map. A vertical tab list (arrow keys, Home and End) chooses a device. On
 * change, the previous path retracts, the new one draws along the vein, its tip pops in,
 * the flow animation starts and the panel details stagger in. A sliding indicator marks
 * the selected tab. With reduced motion every change is instant.
 */
import { loadGsap } from '../../lib/motion';

export function initDeviceMap(root: HTMLElement, animate: boolean) {
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[data-device-button]')];
  const markers = [...root.querySelectorAll<HTMLButtonElement>('[data-device-marker]')];
  const indicator = root.querySelector<HTMLElement>('[data-indicator]');
  const groups = new Map([...root.querySelectorAll<SVGGElement>('[data-device]')].map((g) => [g.dataset.device!, g]));
  const panels = new Map(
    [...root.querySelectorAll<HTMLElement>('[data-device-panel]')].map((p) => [p.dataset.devicePanel!, p]),
  );
  let current = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.deviceButton ?? 'picc';

  const moveIndicator = () => {
    const tab = tabs.find((t) => t.dataset.deviceButton === current);
    if (!tab || !indicator) return;
    indicator.style.transform = `translateY(${tab.offsetTop}px)`;
    indicator.style.height = `${tab.offsetHeight}px`;
  };

  const syncStatic = () => {
    tabs.forEach((t) => {
      const on = t.dataset.deviceButton === current;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
    });
    markers.forEach((m) => m.classList.toggle('is-active', m.dataset.deviceMarker === current));
    panels.forEach((panel, key) => (panel.hidden = key !== current));
    moveIndicator();
  };

  syncStatic();
  root.classList.add('is-ready');
  window.addEventListener('resize', moveIndicator);

  async function select(key: string, focus = false) {
    if (key === current) return;
    const prev = current;
    current = key;
    syncStatic();
    if (focus) tabs.find((t) => t.dataset.deviceButton === key)?.focus();

    const prevGroup = groups.get(prev);
    const nextGroup = groups.get(key);
    if (!animate) {
      prevGroup?.classList.remove('is-active');
      nextGroup?.classList.add('is-active');
      return;
    }

    const { gsap } = await loadGsap();
    if (current !== key) return; // a newer selection already took over
    groups.forEach((g) => gsap.killTweensOf(g.querySelectorAll('*')));

    if (prevGroup) {
      const prevPath = prevGroup.querySelector('.dm-path');
      gsap.to(prevPath, { strokeDashoffset: 1, duration: 0.4, ease: 'power2.in' });
      gsap.to(prevGroup.querySelectorAll('.dm-flow, .dm-start, .dm-tip'), { opacity: 0, duration: 0.2 });
      gsap.delayedCall(0.4, () => {
        if (current !== prev) prevGroup.classList.remove('is-active');
      });
    }

    if (nextGroup) {
      nextGroup.classList.add('is-active');
      const path = nextGroup.querySelector('.dm-path');
      const flow = nextGroup.querySelector('.dm-flow');
      const start = nextGroup.querySelector('.dm-start');
      const tip = nextGroup.querySelector('.dm-tip');
      gsap
        .timeline({ delay: 0.15 })
        .fromTo(start, { opacity: 0, scale: 0, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(3)' })
        .fromTo(path, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.95, ease: 'power3.inOut' }, '-=0.15')
        .fromTo(tip, { opacity: 0, scale: 0.2, transformOrigin: '50% 50%' }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2.5)' }, '-=0.2')
        .fromTo(flow, { opacity: 0 }, { opacity: 0.9, duration: 0.4 }, '-=0.3');
    }

    const panel = panels.get(key);
    if (panel) {
      gsap.fromTo(
        panel.querySelectorAll('[data-panel-item]'),
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.05 },
      );
    }
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab.dataset.deviceButton!));
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      let next = -1;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = last;
      if (next < 0) return;
      e.preventDefault();
      select(tabs[next].dataset.deviceButton!, true);
    });
  });
  markers.forEach((m) => m.addEventListener('click', () => select(m.dataset.deviceMarker!)));
}
