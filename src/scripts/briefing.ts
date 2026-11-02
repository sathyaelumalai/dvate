/**
 * Facility Briefing deck.
 * - Advance: Right/Down arrow, PageDown, spacebar, Next button, or a swipe left.
 * - Back: Left/Up arrow, PageUp, Shift+spacebar, Previous button, or a swipe right.
 * - Home/End jump to the first and last screen. #3 in the URL opens screen 3.
 * - Screen 3 plays the A3 collapse on the first "Next", then advances on the second.
 * - ?facility=Name shows "Prepared for Name" (sanitized, 60 characters at most).
 * With reduced motion, screens change instantly (CSS) and A3 shows its end state.
 */
import { loadGsap, prefersReducedMotion } from '../lib/motion';
import { collapseTimeline } from './motion/a3-collapse';

const deck = document.querySelector<HTMLElement>('[data-deck]');

/** Keeps letters, numbers, spaces and simple punctuation; trims to 60 characters. */
export function sanitizeFacility(raw: string | null): string {
  if (!raw) return '';
  return raw
    .normalize('NFKC')
    .replace(/<[^>]*>?/g, '')
    .replace(/[^\p{L}\p{N} .,'&()/-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 60)
    .trim();
}

if (deck) {
  const screens = [...deck.querySelectorAll<HTMLElement>('[data-screen]')];
  const prevBtn = deck.querySelector<HTMLButtonElement>('[data-deck-prev]')!;
  const nextBtn = deck.querySelector<HTMLButtonElement>('[data-deck-next]')!;
  const indexEl = deck.querySelector<HTMLElement>('[data-deck-index]')!;
  const progress = deck.querySelector<HTMLElement>('[data-deck-progress]')!;
  const live = deck.querySelector<HTMLElement>('[data-deck-live]')!;
  const animate = !prefersReducedMotion();
  const total = screens.length;

  /* ---------- Prepared for ---------- */
  const facility = sanitizeFacility(new URLSearchParams(window.location.search).get('facility'));
  if (facility) {
    deck.querySelectorAll<HTMLElement>('[data-facility-name]').forEach((el) => (el.textContent = facility));
    deck.querySelectorAll<HTMLElement>('[data-prepared]').forEach((el) => (el.hidden = false));
  }

  /* ---------- A3, stepped ---------- */
  const collapseRoot = deck.querySelector<HTMLElement>('[data-collapse="stepped"]');
  const collapseScreen = collapseRoot ? screens.indexOf(collapseRoot.closest('[data-screen]') as HTMLElement) : -1;
  let collapse: gsap.core.Timeline | null = null;
  if (collapseRoot && animate) {
    loadGsap().then(({ gsap }) => {
      const line = collapseRoot.querySelector('[data-red-line]');
      if (line) gsap.set(line, { strokeDasharray: 1 });
      collapse = collapseTimeline(gsap, collapseRoot, { paused: true });
      collapse.timeScale(1.4);
      if (current === collapseScreen) collapse.progress(0);
      else if (current > collapseScreen) collapse.progress(1);
    });
  }

  /* ---------- Navigation ---------- */
  let current = 0;

  function show(index: number, announce = true) {
    const next = Math.max(0, Math.min(total - 1, index));
    const forward = next >= current;
    current = next;

    screens.forEach((screen, i) => {
      const active = i === current;
      screen.classList.toggle('is-current', active);
      screen.classList.toggle('is-before', i < current);
      screen.inert = !active;
      screen.setAttribute('aria-hidden', String(!active));
    });

    if (collapse && current === collapseScreen) collapse.progress(forward ? 0 : 1).pause();

    const onLight = !screens[current].classList.contains('theme-dark');
    deck!.classList.toggle('on-light', onLight);
    indexEl.textContent = String(current + 1);
    progress.style.transform = `scaleX(${(current + 1) / total})`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${current + 1}`);
    if (announce) live.textContent = screens[current].getAttribute('aria-label') ?? '';
  }

  function next() {
    // On the collapse screen, the first Next plays the collapse.
    if (collapse && current === collapseScreen && collapse.progress() < 1) {
      if (!collapse.isActive()) collapse.play();
      else collapse.progress(1);
      return;
    }
    show(current + 1);
  }
  const prev = () => show(current - 1);

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  document.addEventListener('keydown', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, select, [contenteditable]')) return;
    // Space and Enter on a focused button or link act on that control, not the deck.
    if ((e.key === ' ' || e.key === 'Enter') && target.closest('button, a')) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
        e.preventDefault();
        next();
        break;
      case ' ':
        e.preventDefault();
        if (e.shiftKey) prev();
        else next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        prev();
        break;
      case 'Home':
        e.preventDefault();
        show(0);
        break;
      case 'End':
        e.preventDefault();
        show(total - 1);
        break;
    }
  });

  /* ---------- Swipe ---------- */
  let startX = 0;
  let startY = 0;
  let tracking = false;
  deck.addEventListener(
    'touchstart',
    (e) => {
      if ((e.target as HTMLElement).closest('input, textarea, select')) return;
      tracking = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    },
    { passive: true },
  );
  deck.addEventListener(
    'touchend',
    (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        if (dx < 0) next();
        else prev();
      }
    },
    { passive: true },
  );

  /* ---------- Start ---------- */
  const fromHash = Number(window.location.hash.slice(1));
  deck.classList.add('is-deck');
  show(Number.isInteger(fromHash) && fromHash >= 1 ? fromHash - 1 : 0, false);
}
