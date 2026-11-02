/**
 * A8: Device Map. Selecting a hotspot retracts the previous device path, draws the new
 * one along the vein (0.7s) and cross-fades the info panel. With reduced motion the
 * change is instant. GSAP loads on the first selection, not on page load.
 */
import { loadGsap } from '../../lib/motion';

export function initDeviceMap(root: HTMLElement, animate: boolean) {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-device-button]')];
  const groups = new Map(
    [...root.querySelectorAll<SVGGElement>('[data-device]')].map((g) => [g.dataset.device!, g]),
  );
  const panels = new Map(
    [...root.querySelectorAll<HTMLElement>('[data-device-panel]')].map((p) => [p.dataset.devicePanel!, p]),
  );
  let current = buttons.find((b) => b.getAttribute('aria-pressed') === 'true')?.dataset.deviceButton ?? 'picc';

  panels.forEach((panel, key) => (panel.hidden = key !== current));
  root.classList.add('is-ready');

  async function select(key: string) {
    if (key === current) return;
    const prev = current;
    current = key;

    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.deviceButton === key)));
    const prevGroup = groups.get(prev);
    const nextGroup = groups.get(key);
    const prevPanel = panels.get(prev);
    const nextPanel = panels.get(key);

    if (!animate) {
      prevGroup?.classList.remove('is-active');
      nextGroup?.classList.add('is-active');
      if (prevPanel) prevPanel.hidden = true;
      if (nextPanel) nextPanel.hidden = false;
      return;
    }

    const { gsap } = await loadGsap();
    const prevPath = prevGroup?.querySelector('.dm-path');
    const nextPath = nextGroup?.querySelector('.dm-path');
    const prevHub = prevGroup?.querySelector('.dm-hub');
    const nextHub = nextGroup?.querySelector('.dm-hub');

    if (prevPath) gsap.to(prevPath, { strokeDashoffset: 1, duration: 0.35, ease: 'power2.in' });
    if (prevHub) gsap.to(prevHub, { opacity: 0, duration: 0.2 });
    prevGroup?.classList.remove('is-active');
    nextGroup?.classList.add('is-active');
    if (nextPath) gsap.fromTo(nextPath, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut', delay: 0.15 });
    if (nextHub) gsap.fromTo(nextHub, { opacity: 0 }, { opacity: 1, duration: 0.25 });

    if (prevPanel && nextPanel) {
      gsap.killTweensOf([...panels.values()]);
      gsap.to(prevPanel, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          // Resync to the latest selection in case of quick repeated clicks.
          panels.forEach((panel, k) => {
            panel.hidden = k !== current;
            gsap.set(panel, { opacity: 1 });
          });
          const shown = panels.get(current);
          if (shown) gsap.fromTo(shown, { opacity: 0 }, { opacity: 1, duration: 0.25 });
        },
      });
    }
  }

  buttons.forEach((b) => b.addEventListener('click', () => select(b.dataset.deviceButton!)));
}
