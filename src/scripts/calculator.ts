/**
 * Transfer Calculator. monthly = residents x cost per transfer; yearly = monthly x 12.
 * Shows nothing until both inputs hold valid numbers. Values count up to their result
 * unless the visitor prefers reduced motion. A separate live region announces the
 * final sentence once, so screen readers do not hear every animation frame.
 */
import { prefersReducedMotion } from '../lib/motion';

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function countTo(el: HTMLElement, from: number, to: number, animate: boolean) {
  if (!animate || from === to) {
    el.textContent = money.format(to);
    return;
  }
  const start = performance.now();
  const duration = 700;
  const step = (now: number) => {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = money.format(from + (to - from) * eased);
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

document.querySelectorAll<HTMLElement>('[data-calculator]').forEach((root) => {
  const residents = root.querySelector<HTMLInputElement>('[data-calc-residents]')!;
  const cost = root.querySelector<HTMLInputElement>('[data-calc-cost]')!;
  const result = root.querySelector<HTMLElement>('[data-calc-result]')!;
  const monthlyEl = root.querySelector<HTMLElement>('[data-calc-monthly]')!;
  const yearlyEl = root.querySelector<HTMLElement>('[data-calc-yearly]')!;
  const live = root.querySelector<HTMLElement>('[data-calc-live]')!;
  let shown = { monthly: 0, yearly: 0 };
  let timer: number | undefined;

  const read = (input: HTMLInputElement) => {
    const value = Number(input.value);
    return input.value.trim() !== '' && Number.isFinite(value) && value > 0 ? value : null;
  };

  const update = () => {
    const r = read(residents);
    const c = read(cost);
    if (r === null || c === null) {
      result.hidden = true;
      live.textContent = '';
      shown = { monthly: 0, yearly: 0 };
      return;
    }
    const monthly = Math.round(r * c);
    const yearly = monthly * 12;
    const animate = !prefersReducedMotion();
    result.hidden = false;
    countTo(monthlyEl, shown.monthly, monthly, animate);
    countTo(yearlyEl, shown.yearly, yearly, animate);
    shown = { monthly, yearly };

    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      live.textContent = `That is about ${money.format(monthly)} a month and ${money.format(yearly)} a year spent sending residents out for care DVATE can bring to the bedside.`;
    }, 600);
  };

  residents.addEventListener('input', update);
  cost.addEventListener('input', update);
});
